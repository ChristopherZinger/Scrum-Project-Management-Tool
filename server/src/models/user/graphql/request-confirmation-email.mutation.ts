import { UserRepository } from "./../model/User.repository";
import { injectable } from "inversify";
import { ApolloError } from "apollo-server-express";
import { ContextType } from "../../../core/context/context-type";
import { Resolver, Ctx, Mutation, Authorized } from "type-graphql";
import { sendEmail } from "../../../core/auto-email/send-email";
import { createConfirmationUrl } from "../../../core/auto-email/create-token-url";
import { createConfirmationEmail } from "../../../core/auto-email/emails/create-confirmation-email";

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
			console.error("Could not find email or user for this session");
			throw new ApolloError(
				"Could not find user email in this session.",
				"EMAIL_IS_MISSING"
			);
		}
		const user = await this.userRepository.findByEmail(email);
		if (!user) {
			console.error("Could not find user with email: ", email);
			return false;
		}
		if (user.emailConfirmed !== null) {
			console.error(`User with email ${user.email} already already confirmed.`);
			throw new ApolloError(
				"User alreay confirmed the email.",
				"EMAIL_IS_CONFIRMED"
			);
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
