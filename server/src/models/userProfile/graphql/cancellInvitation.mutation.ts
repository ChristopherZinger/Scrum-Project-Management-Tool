import { UserProfileInvitationService } from "./../services/user-profile-invitation.service";
import { CompanyRepository } from "./../../company/model/Company.repository";
import { ContextType } from "./../../../core/context/context-type";
import { injectable } from "inversify";
import { Resolver, Mutation, Ctx, Arg, Authorized } from "type-graphql";
import customApolloErrors from "../../../core/formatErrors/custom-apollo-errors";

@injectable()
@Resolver()
export class CancellInvitationMutation {
	public constructor(
		private companyRepository: CompanyRepository,
		private userProfileInvitationsService: UserProfileInvitationService
	) {}

	@Authorized()
	@Mutation(() => Boolean)
	public async cancellInvitation(
		@Arg("email") email: string,
		@Ctx() context: ContextType
	): Promise<boolean> {
		const company = await this.companyRepository.findForUser(context);

		if (!company) {
			throw customApolloErrors.sessionError();
		}

		try {
			await this.userProfileInvitationsService.removeInvitation(
				company.id,
				email
			);
		} catch (err) {
			console.error(err);
		}

		return true;
	}
}
