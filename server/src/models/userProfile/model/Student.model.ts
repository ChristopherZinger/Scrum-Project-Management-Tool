import { ObjectType, Field, Int, ID } from "type-graphql";
import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm";
import { UserType } from "../../user/graphql/user.type";
import { User } from "../../user/model/User.model";

@ObjectType()
@Entity()
export class UserProfile {
	@Field(() => ID)
	@PrimaryGeneratedColumn()
	id: number;

	@Field()
	@Column()
	firstname: string;

	@Field()
	@Column()
	lastname: string;

	@Field(() => UserType)
	@OneToOne(() => User, user => user.profile)
	user: User;
}
