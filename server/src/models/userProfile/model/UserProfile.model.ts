import { ObjectType, Field, ID } from "type-graphql";
import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm";
import { UserType } from "../../user/graphql/user.type";
import { User } from "../../user/model/User.model";

@ObjectType()
@Entity()
export class UserProfile {
	@Field(() => ID)
	@PrimaryGeneratedColumn()
	public id!: number;

	@Field()
	@Column()
	public firstname!: string;

	@Field()
	@Column()
	public lastname!: string;

	@Field(() => UserType)
	@OneToOne(() => User, user => user.profile)
	public user!: User;
}
