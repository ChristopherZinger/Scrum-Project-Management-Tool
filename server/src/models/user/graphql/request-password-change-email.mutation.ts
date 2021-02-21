import customApolloErrors from "../../../core/formatErrors/custom-apollo-errors";
import { UserRepository } from "./../model/User.repository";
import { injectable } from "inversify";
import { Resolver, Mutation, Arg } from "type-graphql";
import { sendEmail } from "../../../core/auto-email/send-email";
import { createPasswordChangeUrl } from "../../../core/auto-email/create-token-url";
import { createConfirmationEmail } from "../../../core/auto-email/emails/create-confirmation-email";

@injectable()
@Resolver()
export class RequestPasswordChangeEmailMutation {
	constructor(private userRepository: UserRepository) {}
	@Mutation(() => Boolean)
	public async requestPasswordChangeEmail(
		@Arg("email") email: string
	): Promise<boolean> {
		const user = await this.userRepository.findByEmail(email);

		if (!user) {
			throw customApolloErrors.userMissingForEmail();
		}

		const passwordChangeUrl = await createPasswordChangeUrl(user.id);
		const confirmationEmail = createConfirmationEmail(
			user.email,
			passwordChangeUrl
		);
		sendEmail(confirmationEmail);
		return true;
	}
}
