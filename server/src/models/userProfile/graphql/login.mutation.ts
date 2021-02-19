import { injectable } from "inversify";
import { UserProfileDM } from "./../datamappers/UserProfileResponse.dm";
import { UserRepository } from "./../../user/model/User.repository";
import { Resolver, Mutation, Ctx, Arg, Field, InputType } from "type-graphql";
import { UserProfileResponse } from "./userProfileResponse.type";
import { IsEmail } from "class-validator";
import { ContextType } from "../../../core/context/context-type";
import bcrypt from "bcryptjs";
import { createUserContext } from "../../../core/context/create-user-context";
import { ApolloError } from "apollo-server-express";
import { UserProfile } from "../model/UserProfile.model";

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
			throw new ApolloError("incorrect email", "WRONG_CREDENTIALS");
		}

		if (!user.profile) {
			console.error(
				`Could not load a userProfile for user witch email : ${data.email}`
			);
			throw new ApolloError(
				"Part of the data is missing",
				"USER_PROFILE_IS_MISSING"
			);
		}

		const valid = bcrypt.compareSync(data.password, user.password);
		if (!valid) {
			console.warn("Wrong credentials: password.");
			throw new ApolloError("incorrect email", "WRONG_CREDENTIALS");
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
