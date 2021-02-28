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
		const invitationListString = await redis.get(listPrefix);
		const invitationList = JSON.parse(invitationListString || "");

		// create invitation email and token
		const { emailTemplate, token } = await createTeammageInvitationEmail(
			email,
			company.name,
			company.id
		);
		await sendEmail(emailTemplate);

		// add invitation to list
		try {
			if (!invitationList.invitations) {
				await redis.set(
					listPrefix,
					JSON.stringify({ invitations: [{ email, token }] })
				);
			} else {
				if (Array.isArray(invitationList.invitations)) {
					invitationList.invitations.push({ email, token });
					await redis.set(listPrefix, JSON.stringify(invitationList));
				} else {
					throw new Error("There was a problem with teamates invitation list");
				}
			}
		} catch (err) {
			console.error(
				"Error occured while adding invitation to pending list. ",
				err
			);
		}
	}

	public async removeInvitation(companyId: number, emailOrToken: string) {
		const listPrefix = CONST.redisPrefix.pendingInvitationList(companyId);
		const invitationList = await redis.get(listPrefix);
		const listOfInvitations = JSON.parse(invitationList || "");

		if (listOfInvitations.invitations) {
			const updatedList = listOfInvitations.invitations.filter(
				(el: any) => el.email !== emailOrToken && el.token !== emailOrToken
			);
			await redis.set(listPrefix, JSON.stringify(updatedList));
		} else {
			throw new Error("Could not find invitation list for this company");
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
			console.error("Cant find company for this session.");
			return [];
		}

		const listPrefix = CONST.redisPrefix.pendingInvitationList(company.id);
		const invitationListString = await redis.get(listPrefix);

		if (!invitationListString) {
			console.warn(`Can't find invitation list for prefix: ${listPrefix}`);
			return [];
		}
		const invitationList = JSON.parse(invitationListString);

		if (Array.isArray(invitationList.invitations)) {
			return invitationList.invitations
				.filter((el: any) => typeof el.email === "string")
				.map((el: any) => el.email as string);
		} else {
			console.warn(`No invitations found for ${listPrefix}`);
			return [];
		}
	}
}
