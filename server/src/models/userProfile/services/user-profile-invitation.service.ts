import { ApolloError } from "apollo-server-errors";
import { CONST } from "./../../../core/CONST";
import { CompanyRepository } from "./../../company/model/Company.repository";
import { ContextType } from "./../../../core/context/context-type";
import { injectable } from "inversify";
import customApolloErrors from "../../../core/formatErrors/custom-apollo-errors";
import { redis } from "../../../core/setup-redis-and-express-session";
import { createTeammageInvitationEmail } from "../../../core/auto-email/email-templates/teammate-invitation-email";
import { sendEmail } from "../../../core/auto-email/email-service";

@injectable()
export class UserProfileInvitationService {
	public constructor(private companyRepository: CompanyRepository) {}

	public async addInvitation(
		context: ContextType,
		email: string
	): Promise<void> {
		// get company
		const company = await this.companyRepository.findForUser(context);
		if (!company) {
			throw customApolloErrors.sessionError();
		}

		const listPrefix = CONST.redisPrefix.pendingInvitationList(company.id);
		const invitationList = await redis.get(listPrefix);

		// create invitation email and token
		const { emailTemplate, token } = await createTeammageInvitationEmail(
			email,
			company.name,
			company.id
		);
		await sendEmail(emailTemplate);

		// add invitation to list

		if (!invitationList) {
			await redis.set(
				listPrefix,
				JSON.stringify({ invitations: [{ email, token }] })
			);
		} else {
			const list = JSON.parse(invitationList);

			if (Array.isArray(list.invitations)) {
				list.invitations.push({ email, token });
				await redis.set(listPrefix, JSON.stringify(list));
			} else {
				throw new Error("There was a problem with teamates invitation list");
			}
		}
	}

	public async removeInvitation(companyId: number, emailOrToken: string) {
		const listPrefix = CONST.redisPrefix.pendingInvitationList(companyId);
		const invitationList = await redis.get(listPrefix);

		if (invitationList) {
			const listOfInvitations = JSON.parse(invitationList);
			const updatedList = listOfInvitations.invitations.filter(
				(el: any) => el.email !== emailOrToken && el.token !== emailOrToken
			);
			redis.set(listPrefix, JSON.stringify(updatedList));
		} else {
			throw new ApolloError(
				"Could not find invitation list for this company",
				"INVITATION_LIST_MISSING"
			);
		}
	}

	public async getInvitation(
		emailOrToken: string,
		companyId: number
	): Promise<{ email: string; token: string }> {
		const listPrefix = CONST.redisPrefix.pendingInvitationList(companyId);
		const invitationListString = await redis.get(listPrefix);

		if (invitationListString) {
			const invitationList = JSON.parse(invitationListString);
			if (Array.isArray(invitationList.invitations)) {
				const invitation = invitationList.invitations.find(
					(el: any) => el.email === emailOrToken || el.token === emailOrToken
				);
				if (invitation.email && invitation.token) {
					return {
						email: invitation.email,
						token: invitation.token
					};
				}
			}
		}
		throw new ApolloError(
			`Could not find invitation list for ${listPrefix} `,
			"INVITATION_LIST_MISSING"
		);
	}

	public async getAllInvitations(context: ContextType): Promise<string[]> {
		const company = await this.companyRepository.findForUser(context);
		if (!company) {
			throw customApolloErrors.sessionError();
		}

		const listPrefix = CONST.redisPrefix.pendingInvitationList(company.id);
		const invitationListString = await redis.get(listPrefix);

		if (!invitationListString) {
			throw new ApolloError(
				"There was a problem with teamates invitation list",
				"INVITATION_LIST_MISSING"
			);
		}
		const invitationList = JSON.parse(invitationListString);

		if (Array.isArray(invitationList.invitations)) {
			return invitationList.invitations
				.filter((el: any) => typeof el.email === "string")
				.map((el: any) => el.email as string);
		}

		throw new ApolloError(
			"There was a problem with teamates invitation list",
			"WRONG_DATA_TYPE"
		);
	}
}
