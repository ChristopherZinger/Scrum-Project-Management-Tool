import { TYPES } from "../../../core/TYPES";
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
import { Company } from "../../company/model/Company.model";

@injectable()
export class UserProfileService {
	public constructor(
		private userProfileRepository: UserProfileRepository,
		private userRepository: UserRepository,
		@inject(TYPES.Sequelize) private sequelize: Sequelize
	) {}

	public async register(
		data: RegisterUserProfileInputType,
		userRole?: UserRole,
		companyId?: number
	): Promise<User | null> {
		const emailIsTaken = await this.userRepository.emailIsTaken(data.email);

		if (emailIsTaken) {
			console.warn(`User with email '${data.email}' already exists.`);
			throw new ApolloError("This email is taken", "EMAIL_TAKEN");
		}

		await this.sequelize.transaction(async () => {
			const user = new User();
			user.email = data.email;
			user.password = bcrypt.hashSync(data.password, bcrypt.genSaltSync(12));
			user.role = userRole || UserRole.BASE_USER;
			await this.userRepository.save(user);

			const userProfile = new UserProfile();
			userProfile.firstname = data.firstname;
			userProfile.lastname = data.lastname;
			userProfile.userId = user.id;

			if (companyId) {
				userProfile.companyId = companyId;
			}

			await this.userProfileRepository.save(userProfile);
		});

		return await this.userRepository.findByEmail(data.email, {
			include: [{ model: UserProfile, include: [{ model: Company }] }]
		});
	}
}
