import { UserProfileDM } from "./../../userProfile/datamappers/UserProfileResponse.dm";
import { UserProfileRepository } from "./../../userProfile/model/UserProfile.repository";
import { CompanyRepository } from "./../model/Company.repository";
import { ContextType } from "./../../../core/context/context-type";
import { injectable } from "inversify";
import {
	Resolver,
	Query,
	Ctx,
	Authorized,
	ObjectType,
	Field
} from "type-graphql";
import customApolloErrors from "../../../core/formatErrors/custom-apollo-errors";
import { CONST } from "../../../core/CONST";
import { ApolloError } from "apollo-server-express";
import { redis } from "../../../core/setup-redis-and-express-session";
import { ITeammateResponse, ITeammatesResponse } from "../type-guards";

@ObjectType()
class TeammatesResponse implements ITeammatesResponse {
	@Field(() => [String])
	public invitedUsers!: string[];

	@Field(() => [TeammateResponse])
	public registeredUsers!: ITeammateResponse[];
}

@ObjectType()
class TeammateResponse implements ITeammateResponse {
	@Field(() => String)
	public firstname!: string;

	@Field(() => String)
	public lastname!: string;

	@Field(() => String)
	public email!: string;
}

@injectable()
@Resolver()
export class TeammatesQuery {
	public constructor(
		private companyRepository: CompanyRepository,
		private userProfileRepository: UserProfileRepository,
		private userProfileDM: UserProfileDM
	) {}

	@Authorized()
	@Query(() => TeammatesResponse)
	public async teammates(
		@Ctx() context: ContextType
	): Promise<ITeammatesResponse> {
		const sessionUser = context.session.user;
		if (!sessionUser) {
			throw customApolloErrors.sessionError();
		}

		const company = await this.companyRepository.findForUser(context);
		if (!company) {
			throw new ApolloError("Company not found.", "COMPANY_NOT_FOUND");
		}

		const pendingInvitationPrefix = CONST.redisPrefix.pendingInvitationList(
			company.id
		);

		const pendingInvitationEmails = await redis.lrange(
			pendingInvitationPrefix,
			0,
			-1
		);

		const allUsersOfCompany = await this.userProfileRepository.findTeammates(
			context
		);

		const registeredUsers = allUsersOfCompany
			.filter(profile => !!profile.user)
			.map(profile =>
				this.userProfileDM.createTeammateResponse(profile.user!, profile)
			);

		return {
			invitedUsers: pendingInvitationEmails,
			registeredUsers: registeredUsers
		};
	}
}
