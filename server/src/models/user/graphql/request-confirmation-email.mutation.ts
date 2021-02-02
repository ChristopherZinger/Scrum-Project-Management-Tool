import { ContextType } from "../../../core/create-gql-context";
import { Resolver, Ctx, Mutation } from "type-graphql";
import { sendEmail } from "../../../core/auto-email/send-email";
import { createConfirmationUrl } from "../../../core/auto-email/create-confirmation-url";
import { getRepository } from "typeorm";
import { User } from "../model/User.model";

@Resolver()
export class RequestConfirmationMutation {
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
		sendEmail(user.email, confirmationUrl);

		return true;
	}
}
