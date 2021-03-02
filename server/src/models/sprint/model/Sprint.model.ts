import { Project } from "./../../project/model/Project.model";
import {
	Column,
	Model,
	BelongsTo,
	ForeignKey,
	Table,
	HasMany
} from "sequelize-typescript";
import { Story } from "../../story/model/Story.model";

@Table({
	timestamps: true,
	freezeTableName: true
})
export class Sprint extends Model<Sprint> {
	@Column({ primaryKey: true, autoIncrement: true })
	public id!: number;

	@Column
	public startsAt!: Date;

	@Column
	public endsAt!: Date;

	@Column
	public isFinished!: boolean;

	@BelongsTo(() => Project)
	public readonly project?: Project;

	@ForeignKey(() => Project)
	@Column
	public projectId!: number;

	@HasMany(() => Story)
	public stories?: Story[];
}
