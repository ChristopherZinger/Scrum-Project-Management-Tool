import { CompanyRegisterService } from "../services/company-register.service";
import { UserProfileRepository } from "../../userProfile/model/UserProfile.repository";
import { UserProfile } from "../../userProfile/model/UserProfile.model";
import { ApolloError } from "apollo-server-express";
import { ContextType } from "./../../../core/context/context-type";
import {
	Resolver,
	Mutation,
	Arg,
	Ctx,
	InputType,
	Field,
	Authorized
} from "type-graphql";
import { injectable } from "inversify";
import { UserRepository } from "../../user/model/User.repository";

@InputType()
export class RegisterCompanyInputType {
	@Field()
	email!: string;

	@Field()
	name!: string;

	@Field({ nullable: true })
	city?: string;

	@Field({ nullable: true })
	street?: string;

	@Field({ nullable: true })
	buildingNumber?: string;

	@Field({ nullable: true })
	zipCode?: string;
}

@injectable()
@Resolver()
export class RegisterCompanyMutation {
	public constructor(
		private companyRegisterService: CompanyRegisterService,
		private userProfileRepository: UserProfileRepository,
		private userRepository: UserRepository
	) {}

	@Authorized()
	@Mutation(() => Boolean)
	public async RegisterCompany(
		@Ctx() context: ContextType,
		@Arg("data") data: RegisterCompanyInputType
	): Promise<boolean> {
		// take the user from session
		if (!context.session.user) {
			console.log(
				"Session is missing user. You can't create Company while not logged in."
			);
			throw new ApolloError(
				"You need to be logged in to create new campany",
				"SESSION_IS_MISSING_USER"
			);
		}

		// check is exist in db
		const user = await this.userRepository.findById(context.session.user.id, {
			include: [{ model: UserProfile }]
		});

		if (!user) {
			throw new ApolloError(
				`Cant find user with id ${context.session.user.id} in database`,
				"USER_MISSING"
			);
		}

		if (!user.profile) {
			throw new ApolloError(
				`Cant find profile for user with id ${context.session.user.id} in database`,
				"USER_PROFILE_MISSING"
			);
		}

		// check if is assigned to other company
		if (user.profile.company) {
			throw new ApolloError(
				`User with id ${context.session.user.id} is already asigned to company.`,
				"USER_HAS_COMPANY"
			);
		}

		// create company and save
		const company = await this.companyRegisterService.register(data);

		// update users company
		user.profile.companyId = company.id;
		await this.userProfileRepository.save(user.profile);

		return true;
	}
}
