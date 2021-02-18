import { TYPES } from "../../../core/TYPES";
import { ContextType } from "../../../core/context/context-type";
import { UserRepository } from "../../user/model/User.repository";
import { UserProfileRepository } from "../model/UserProfile.repository";
import bcrypt from "bcryptjs";
import { User } from "../../user/model/User.model";
import { UserProfile } from "../model/UserProfile.model";
import { ApolloError } from "apollo-server-express";
import { RegisterUserProfileInputType } from "../graphql/register.mutation";
import { UserRole } from "../../user/type-guards";
import { injectable, inject } from "inversify";
import { Sequelize } from "sequelize-typescript";

@injectable()
export class UserProfileService {
	public constructor(
		private userProfileRepository: UserProfileRepository,
		private userRepository: UserRepository,
		@inject(TYPES.Sequelize) private sequelize: Sequelize
	) {}

	public async register(
		data: RegisterUserProfileInputType,
		context: ContextType
	): Promise<void> {
		const lowerCaseEmail = data.email.toLowerCase();

		const emailIsTaken = await this.userRepository.emailIsTaken(lowerCaseEmail);
		if (emailIsTaken) {
			console.warn(`User with email '${data.email}' already exists.`);
			throw new ApolloError("This email is taken", "EMAIL_TAKEN");
		}

		this.sequelize.transaction(async () => {
			const user = new User();
			user.email = lowerCaseEmail;
			user.password = bcrypt.hashSync(data.password, bcrypt.genSaltSync(12));
			user.role = UserRole.BASE_USER;
			await this.userRepository.save(user);

			const userProfile = new UserProfile();
			userProfile.firstname = data.firstname;
			userProfile.lastname = data.lastname;
			userProfile.userId = user.id;

			await this.userProfileRepository.save(userProfile);
		});
	}
}
