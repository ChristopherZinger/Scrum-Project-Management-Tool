import { CompanyRepository } from "./../model/Company.repository";
import { ContextType } from "./../../../core/context/context-type";
import { injectable } from "inversify";
import { Resolver, Query, Ctx, Authorized } from "type-graphql";
import customApolloErrors from "../../../core/formatErrors/custom-apollo-errors";
import { CONST } from "../../../core/CONST";
import { ApolloError } from "apollo-server-express";
import { redis } from "../../../core/setup-redis-and-express-session";

@injectable()
@Resolver()
export class TeammatesQuery {
	public constructor(private companyRepository: CompanyRepository) {}

	@Authorized()
	@Query(() => [String])
	public async teammates(@Ctx() context: ContextType): Promise<string[]> {
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

		return pendingInvitationEmails;
	}
}
