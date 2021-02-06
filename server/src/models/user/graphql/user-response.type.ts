import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class UserResponse {
	@Field()
	email!: string;

	@Field()
	isActive!: boolean;

	@Field({ nullable: true })
	emailConfirmed?: Date;
}
