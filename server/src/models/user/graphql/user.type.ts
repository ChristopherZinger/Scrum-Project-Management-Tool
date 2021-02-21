import { ObjectType, Field, ID } from "type-graphql";
import { UserProfileType } from "../../userProfile/graphql/userProfile.type";
import { UserRole } from "../type-guards";

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
	userProfile?: UserProfileType;

	@Field(() => Date, { nullable: true })
	emailConfirmed!: Date | null;

	@Field()
	isActive!: boolean;

	@Field({ nullable: true })
	removedAt?: Date;
}
