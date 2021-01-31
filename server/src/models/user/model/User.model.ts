import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	OneToOne,
	JoinColumn
} from "typeorm";
import { UserProfile } from "../../userProfile/model/Student.model";

@Entity()
export class User {
	@PrimaryGeneratedColumn()
	public id: number;

	@Column({ unique: true })
	public email: string;

	@Column()
	public password: string;

	@OneToOne(() => UserProfile, profile => profile.user)
	@JoinColumn()
	public profile: UserProfile;
}
