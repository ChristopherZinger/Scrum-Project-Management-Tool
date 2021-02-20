import { UserProfileType } from "../../userProfile/graphql/userProfile.type";
import { ObjectType, Field, ID } from "type-graphql";

@ObjectType()
export class CompanyType {
	@Field(() => ID)
	id!: number;

	@Field()
	name!: string;

	@Field()
	email!: string;

	@Field({ nullable: true })
	city?: string;

	@Field({ nullable: true })
	street?: string;

	@Field({ nullable: true })
	buildingNumber?: string;

	@Field({ nullable: true })
	zipCode?: string;

	@Field(() => [UserProfileType])
	userProfiles!: UserProfileType[];
}
