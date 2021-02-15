import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	OneToOne,
	JoinColumn
} from "typeorm";
import { registerEnumType } from "type-graphql";
import { UserProfile } from "../../userProfile/model/UserProfile.model";

// if you add new roles here remember to create migration that reflects it in db.
export enum UserRole {
	ADMIN = "ADMIN",
	BASE_USER = "BASE_USER",
	STAFF = "STAFF"
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

	@Column({ type: "date", nullable: true })
	public emailConfirmed?: Date;

	@Column({ type: "boolean", default: false })
	public isActive!: boolean;

	@Column({ type: "date", nullable: true })
	public removedAt?: Date;

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
