import { Resolver, Mutation, Arg } from "type-graphql";
import { sendEmail } from "../../../core/auto-email/send-email";
import { createPasswordChangeUrl } from "../../../core/auto-email/create-token-url";
import { createConfirmationEmail } from "../../../core/auto-email/emails/create-confirmation-email";
import { User } from "../model/User.model";

@Resolver()
export class RequestPasswordChangeEmailMutation {
	@Mutation(() => Boolean)
	public async requestPasswordChangeEmail(
		@Arg("email") email: string
	): Promise<boolean> {
		const user = await User.findOne({ where: { email } });
		if (!user) {
			console.warn("Could not find user with email: ", email);
			return false;
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
