import { Column, Model, DataType, HasOne, Table } from "sequelize-typescript";
import { registerEnumType } from "type-graphql";
import { UserProfile } from "../../userProfile/model/UserProfile.model";
import { UserRole } from "../type-guards";

// register to graphql
registerEnumType(UserRole, {
	name: "UserRole"
});

@Table({
	timestamps: true,
	freezeTableName: true
})
export class User extends Model<User> {
	@Column({ primaryKey: true, autoIncrement: true })
	public id!: number;

	@Column({ unique: true })
	public email!: string;

	@Column
	public password!: string;

	@Column(DataType.DATE)
	public emailConfirmed!: Date | null;

	@Column({ defaultValue: false })
	public isActive!: boolean;

	@Column
	public removedAt?: Date;

	@Column({
		type: DataType.ENUM(...Object.values(UserRole)), // TODO !!!
		defaultValue: UserRole.BASE_USER
	})
	public role!: UserRole;

	@HasOne(() => UserProfile)
	public readonly profile?: UserProfile;
}
