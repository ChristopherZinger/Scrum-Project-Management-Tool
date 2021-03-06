import { UserRepository } from "./../model/User.repository";
import { injectable } from "inversify";
import { ContextType } from "../../../core/context/context-type";
import { Resolver, Ctx, Mutation, Authorized } from "type-graphql";
import { sendEmail } from "../../../core/auto-email/email-service";
import { createConfirmationEmail } from "../../../core/auto-email/email-templates/confirmation-email";
import customApolloErrors from "../../../core/formatErrors/custom-apollo-errors";

@injectable()
@Resolver()
export class RequestConfirmationEmailMutation {
	public constructor(private userRepository: UserRepository) {}
	@Authorized()
	@Mutation(() => Boolean)
	public async requestConfirmationEmail(
		@Ctx() context: ContextType
	): Promise<boolean> {
		const email = context.session.user?.email;
		if (!email) {
			throw customApolloErrors.sessionError(
				"This session does not have a user."
			);
		}

		const user = await this.userRepository.findByEmail(email);
		if (!user) {
			throw customApolloErrors.userMissingForEmail();
		}

		if (user.emailConfirmed !== null) {
			throw customApolloErrors.operationFobridden(
				"",
				"User alreay confirmed the email."
			);
		}

		const confirmationEmail = await createConfirmationEmail(
			user.email,
			user.id
		);
		sendEmail(confirmationEmail);

		return true;
	}
}
