import { Company } from "./../../company/model/Company.model";
import {
	Column,
	Model,
	BelongsTo,
	ForeignKey,
	Table
} from "sequelize-typescript";
import { User } from "../../user/model/User.model";

@Table({
	timestamps: true,
	freezeTableName: true
})
export class UserProfile extends Model<UserProfile> {
	@Column({ primaryKey: true, autoIncrement: true })
	public id!: number;

	@Column
	public firstname!: string;

	@Column
	public lastname!: string;

	@BelongsTo(() => User)
	public readonly user?: User;

	@ForeignKey(() => User)
	@Column
	public userId?: number;

	@ForeignKey(() => Company)
	@Column
	public companyId?: number;

	@BelongsTo(() => Company)
	public readonly company?: Company;
}
