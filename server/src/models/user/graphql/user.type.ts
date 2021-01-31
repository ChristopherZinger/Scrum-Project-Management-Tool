import { ObjectType, Field, ID } from "type-graphql";
import { UserProfile } from "../../userProfile/model/Student.model";

@ObjectType()
export class UserType {
	@Field(() => ID)
	id!: number;

	@Field()
	email!: string;

	@Field()
	password!: string;

	@Field(() => UserProfile, { nullable: true })
	user?: UserProfile;
}
