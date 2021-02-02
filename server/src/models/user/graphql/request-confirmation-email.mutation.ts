import { ContextType } from "../../../core/context/context-type";
import { Resolver, Ctx, Mutation, Authorized } from "type-graphql";
import { sendEmail } from "../../../core/auto-email/send-email";
import { createConfirmationUrl } from "../../../core/auto-email/create-confirmation-url";
import { createConfirmationEmail } from "../../../core/auto-email/emails/create-confirmation-email";
import { getRepository } from "typeorm";
import { User } from "../model/User.model";

@Resolver()
export class RequestConfirmationMutation {
	@Authorized()
	@Mutation(() => Boolean)
	public async requestConfirmationEmail(
		@Ctx() context: ContextType
	): Promise<boolean> {
		const email = context.session.user?.email;
		if (!email) {
			console.warn("Could not find email or user for this session");
			return false;
		}

		const userRepository = await getRepository(User);
		const user = await userRepository.findOne({ where: { email } });
		if (!user) {
			console.warn("Could not find user with email: ", email);
			return false;
		}

		const confirmationUrl = await createConfirmationUrl(user.id);
		const confirmationEmail = createConfirmationEmail(
			user.email,
			confirmationUrl
		);
		sendEmail(confirmationEmail);

		return true;
	}
}
