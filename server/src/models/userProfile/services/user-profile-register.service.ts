import { ContextType } from "../../../core/context/context-type";
import { createConfirmationEmail } from "../../../core/auto-email/emails/create-confirmation-email";
import { createConfirmationUrl } from "../../../core/auto-email/create-token-url";
import { UserRepository } from "../../user/model/User.repository";
import { UserProfileRepository } from "../model/UserProfile.repository";
import bcrypt from "bcryptjs";
import { User } from "../../user/model/User.model";
import { UserProfile } from "../model/UserProfile.model";
import { ApolloError } from "apollo-server-express";
import { UserProfileResponse } from "../graphql/userProfileResponse.type";
import { RegisterUserProfileInputType } from "../graphql/register.mutation";
import { UserRole } from "../../user/type-guards";
import { sendEmail } from "../../../core/auto-email/send-email";
import { createUserContext } from "../../../core/context/create-user-context";
import { injectable } from "inversify";

@injectable()
export class UserProfileService {
	public constructor(
		private userProfileRepository: UserProfileRepository,
		private userRepository: UserRepository
	) {}

	public async register(
		data: RegisterUserProfileInputType,
		context: ContextType
	): Promise<UserProfileResponse> {
		const lowerCaseEmail = data.email.toLowerCase();

		const emailIsTaken = await this.userRepository.emailIsTaken(lowerCaseEmail);
		if (emailIsTaken) {
			console.warn(`User with email '${data.email}' already exists.`);
			throw new ApolloError("This email is taken", "EMAIL_TAKEN");
		}

		// TODO: saving user and user profile should be in one sequelize transaction

		const user = new User();
		user.email = lowerCaseEmail;
		user.password = bcrypt.hashSync(data.password, bcrypt.genSaltSync(12));
		user.role = UserRole.BASE_USER;
		const newUser = await this.userRepository.save(user);

		const userProfile = new UserProfile();
		userProfile.firstname = data.firstname;
		userProfile.lastname = data.lastname;
		userProfile.userId = newUser.id;

		const newUserProfile = await this.userProfileRepository.save(userProfile);

		// send emails
		const confirmationUrl = await createConfirmationUrl(newUser.id);
		const confirmationEmail = createConfirmationEmail(
			newUser.email,
			confirmationUrl
		);

		sendEmail(confirmationEmail);

		createUserContext(context, {
			id: newUser.id,
			email: newUser.email,
			role: newUser.role,
			emailConfirmed: newUser.emailConfirmed,
			isActive: newUser.isActive,
			removedAt: newUser.removedAt
		});

		return {
			email: newUser.email,
			isActive: newUser.isActive,
			emailConfirmed: newUser.emailConfirmed,
			firstname: newUserProfile.firstname,
			lastname: newUserProfile.lastname,
			profileId: newUserProfile.id
		};
	}
}
