import { Column, Model, Table, HasMany, AllowNull } from "sequelize-typescript";
import { UserProfile } from "../../userProfile/model/UserProfile.model";

@Table({
	timestamps: true,
	freezeTableName: true
})
export class Company extends Model<Company> {
	@Column({ primaryKey: true, autoIncrement: true })
	public id!: number;

	@Column({ unique: true })
	public email!: string;

	@Column
	public name!: string;

	@Column
	@AllowNull(true)
	public city!: string | null;

	@Column
	@AllowNull(true)
	public street!: string | null;

	@Column
	@AllowNull(true)
	public buildingNumber!: string | null;

	@Column
	@AllowNull(true)
	public zipCod!: string | null;

	@HasMany(() => UserProfile)
	public readonly userProfiles?: UserProfile[];
}
