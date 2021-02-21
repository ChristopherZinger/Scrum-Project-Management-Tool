import { injectable } from "inversify";
import { UserProfileDM } from "./../datamappers/UserProfileResponse.dm";
import { UserRepository } from "./../../user/model/User.repository";
import { Resolver, Mutation, Ctx, Arg, Field, InputType } from "type-graphql";
import { UserProfileResponse } from "./userProfileResponse.type";
import { IsEmail } from "class-validator";
import { ContextType } from "../../../core/context/context-type";
import bcrypt from "bcryptjs";
import { createUserContext } from "../../../core/context/create-user-context";
import { UserProfile } from "../model/UserProfile.model";
import customApolloErrors from "../../../core/formatErrors/custom-apollo-errors";

@InputType()
class LoginInputType {
	@Field(() => String)
	password!: string;

	@Field(() => String)
	@IsEmail()
	email!: string;
}

@injectable()
@Resolver()
export class LoginMutation {
	constructor(
		private userRepository: UserRepository,
		private userProfileDM: UserProfileDM
	) {}

	@Mutation(() => UserProfileResponse, { nullable: true })
	async login(
		@Arg("data") data: LoginInputType,
		@Ctx() context: ContextType
	): Promise<UserProfileResponse | null> {
		data.email = data.email.toLowerCase();

		const user = await this.userRepository.findByEmail(data.email, {
			include: [{ model: UserProfile }]
		});

		if (!user) {
			console.error(`Wrong credentials: email. for '${data.email}'`);
			throw customApolloErrors.wrongCredentials();
		}

		if (!user.profile) {
			throw customApolloErrors.couldNotLoadUserData();
		}

		const valid = bcrypt.compareSync(data.password, user.password);
		if (!valid) {
			console.warn("Wrong credentials: password.");
			throw customApolloErrors.wrongCredentials();
		}

		createUserContext(context, {
			id: user.id,
			email: user.email,
			role: user.role,
			emailConfirmed: user.emailConfirmed,
			isActive: user.isActive,
			removedAt: user.removedAt
		});

		// 	console.log(`User: ${user.email} has logged in.`);
		console.log(context.session.cookie);
		return this.userProfileDM.createUserProfileResponse(user, user.profile);
	}
}
