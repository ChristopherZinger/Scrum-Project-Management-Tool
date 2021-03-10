import { CompanyRegisterService } from "../services/company-register.service";
import { UserProfileRepository } from "../../userProfile/model/UserProfile.repository";
import { UserProfile } from "../../userProfile/model/UserProfile.model";
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
import customApolloError from "../../../core/formatErrors/custom-apollo-errors";
import { updateUserContext } from "../../../core/context/update-user-context";

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
			throw customApolloError.sessionError();
		}

		// check is exist in db
		const user = await this.userRepository.findById(context.session.user.id, {
			include: [{ model: UserProfile }]
		});

		if (!user) {
			throw customApolloError.userMissingForId();
		}

		if (!user.profile) {
			throw customApolloError.couldNotLoadUserData();
		}

		// check if is assigned to other company
		if (user.profile.company) {
			throw customApolloError.operationFobridden(
				"",
				`User is already asigned to company.`
			);
		}

		// create company and save
		const company = await this.companyRegisterService.register(data);

		// update users company
		user.profile.companyId = company.id;
		await this.userProfileRepository.save(user.profile);

		// add company to user context
		updateUserContext(context, { companyId: company.id });

		return true;
	}
}
