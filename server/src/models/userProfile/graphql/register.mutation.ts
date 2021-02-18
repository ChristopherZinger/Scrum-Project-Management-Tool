import { ContextType } from "./../../../core/context/context-type";
import { UserProfileResponse } from "./userProfileResponse.type";
import { Resolver, Mutation, Ctx, Arg, Field, InputType } from "type-graphql";
import { IsEmail, Length } from "class-validator";
import { UserProfileService } from "../services/user-profile-register.service";
import { injectable } from "inversify";

@InputType()
export class RegisterUserProfileInputType {
	@Field(() => String)
	@Length(8, 255, {
		message: "Incorrect password length. Has to be between 8 and 255 charactes."
	})
	password!: string;

	@Field(() => String)
	@IsEmail()
	email!: string;

	@Field(() => String)
	firstname!: string;

	@Field(() => String)
	lastname!: string;
}

@injectable()
@Resolver()
export class RegisterMutation {
	public constructor(private userProfileRegisterService: UserProfileService) {}

	@Mutation(() => UserProfileResponse, { nullable: true })
	async register(
		@Arg("data") data: RegisterUserProfileInputType,
		@Ctx() context: ContextType
	): Promise<UserProfileResponse | null> {
		try {
			const userProfileResponse = await this.userProfileRegisterService.register(
				data,
				context
			);
			return userProfileResponse;
		} catch (err) {
			console.error(err);
		}
		return null;
	}
}
