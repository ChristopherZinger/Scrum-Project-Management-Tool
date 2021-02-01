import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	OneToOne,
	JoinColumn
} from "typeorm";
import { registerEnumType } from "type-graphql";
import { UserProfile } from "../../userProfile/model/UserProfile.model";

export enum UserRole {
	ADMIN = "ADMIN",
	BASE_USER = "BASE_USER"
}

// register to graphql
registerEnumType(UserRole, {
	name: "UserRole"
});

@Entity()
export class User {
	@PrimaryGeneratedColumn()
	public id!: number;

	@Column({ unique: true })
	public email!: string;

	@Column()
	public password!: string;

	@Column({
		type: "enum",
		enum: UserRole,
		default: UserRole.BASE_USER
	})
	public role!: UserRole;

	@OneToOne(() => UserProfile, profile => profile.user)
	@JoinColumn()
	public profile!: UserProfile;
}
