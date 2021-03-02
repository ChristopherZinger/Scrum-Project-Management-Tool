import { Story } from "./../../story/model/Story.model";
import { Sprint } from "./../../sprint/model/Sprint.model";
import {
	Column,
	Model,
	ForeignKey,
	BelongsTo,
	Table,
	DataType,
	HasMany,
	AllowNull
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

	@HasMany(() => Sprint)
	public readonly sprints?: Sprint[];

	@BelongsTo(() => Sprint)
	public readonly activeSprint!: Sprint;

	@ForeignKey(() => Sprint)
	@AllowNull(true)
	@Column(DataType.INTEGER)
	public activeSprintId!: number | null;

	@HasMany(() => Story)
	public readonly stories?: Story[];
}
