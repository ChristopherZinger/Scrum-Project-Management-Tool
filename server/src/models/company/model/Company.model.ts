import { Column, Model, Table, HasMany } from "sequelize-typescript";
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
	public city?: string;

	@Column
	public street?: string;

	@Column
	public buildingNumber?: string;

	@Column
	public zipCod?: string;

	@HasMany(() => UserProfile)
	public readonly userProfiles?: UserProfile[];
}
