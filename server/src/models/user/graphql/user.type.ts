import { ObjectType, Field, ID } from "type-graphql";
import { UserProfileType } from "../../userProfile/graphql/userProfile.type";
import { UserRole } from "../model/User.model";

@ObjectType()
export class UserType {
	@Field(() => ID)
	id!: number;

	@Field()
	email!: string;

	@Field()
	password!: string;

	@Field(() => UserRole)
	role!: UserRole;

	@Field(() => UserProfileType, { nullable: true })
	user?: UserProfileType;
}
