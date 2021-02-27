import { CompanyRepository } from "./../model/Company.repository";
import { CONST } from "./../../../core/CONST";
import { ContextType } from "./../../../core/context/context-type";
import { Resolver, Query, Ctx, Arg, Int } from "type-graphql";
import { injectable } from "inversify";
import { ApolloError } from "apollo-server-express";

@injectable()
@Resolver()
export class TeammateInvitationDataQuery {
	public constructor(private companyRepository: CompanyRepository) {}

	@Query(() => String)
	public async teammateInvitationData(
		@Arg("companyId", () => Int) companyId: number,
		@Ctx() context: ContextType
	): Promise<string> {
		// clear cookie
		context.response.clearCookie(
			CONST.cookies.sessionCookieName,
			CONST.cookies.sessionCookieOptions
		);

		const company = await this.companyRepository.findById(companyId);
		if (!company) {
			throw new ApolloError(
				"Could not find requested company",
				"COMPANY_NOT_FOUND"
			);
		}

		return company.name;
	}
}
