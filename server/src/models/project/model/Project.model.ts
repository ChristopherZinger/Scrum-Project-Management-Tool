import {
	Column,
	Model,
	ForeignKey,
	BelongsTo,
	Table,
	DataType
} from "sequelize-typescript";
import { Company } from "../../company/model/Company.model";

@Table({
	timestamps: true,
	freezeTableName: true
})
export class Project extends Model<Project> {
	@Column({ primaryKey: true, autoIncrement: true })
	public id!: number;

	@Column
	public title!: string;

	@Column(DataType.STRING)
	public pid?: string;

	@BelongsTo(() => Company)
	public readonly company!: Company;

	@ForeignKey(() => Company)
	@Column
	public companyId!: number;
}
