import { IUserProfileResponse } from "../type-guards";
import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class UserProfileResponse implements IUserProfileResponse {
	@Field()
	profileId!: number;

	@Field()
	firstname!: string;

	@Field()
	lastname!: string;

	@Field()
	email!: string;

	@Field()
	isActive!: boolean;

	@Field(() => Date, { nullable: true })
	emailConfirmed!: Date;
}
