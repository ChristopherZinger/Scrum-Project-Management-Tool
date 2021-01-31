import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	OneToOne,
	JoinColumn
} from "typeorm";
import { Student } from "../../student/model/Student.model";
import { ObjectType, Field, Int, ID } from "type-graphql";

@Entity()
export class User {
	@PrimaryGeneratedColumn()
	public id: number;

	@Column({ unique: true })
	public email: string;

	@Column()
	public password: string;

	@OneToOne(() => Student, student => student.user)
	@JoinColumn()
	public student: Student;
}
