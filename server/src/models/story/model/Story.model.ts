import { UserProfile } from "./../../userProfile/model/UserProfile.model";
import { Sprint } from "./../../sprint/model/Sprint.model";
import {
	Column,
	Default,
	Model,
	ForeignKey,
	BelongsTo,
	Table,
	DataType,
	AllowNull
} from "sequelize-typescript";
import { Project } from "../../../models/project/model/Project.model";

export enum StoryStatus { // update the migration if you edit this enum
	BACKLOG = "BACKLOG",
	TODO = "TODO",
	DEVELOPEMENT = "DEVELOPEMENT",
	REVIEW = "REVIEW",
	TEST = "TEST",
	DONE = "DONE"
}

@Table({
	timestamps: true,
	freezeTableName: true
})
export class Story extends Model<Story> {
	@Column({ primaryKey: true, autoIncrement: true })
	public id!: number;

	@Column
	public title!: string;

	@Default("")
	@Column(DataType.STRING)
	public description!: string;

	@Default(StoryStatus.BACKLOG)
	@Column(
		DataType.ENUM({
			values: Object.values(StoryStatus)
		})
	)
	public status!: StoryStatus;

	@ForeignKey(() => UserProfile)
	@Column(DataType.INTEGER)
	public userProfileId!: number | null;

	@BelongsTo(() => UserProfile)
	public readonly userProfile?: UserProfile;

	@ForeignKey(() => Sprint)
	@AllowNull(true)
	@Column(DataType.INTEGER)
	public sprintId!: number | null;

	@BelongsTo(() => Sprint)
	public readonly sprint!: Sprint;

	@ForeignKey(() => Project)
	@Column(DataType.INTEGER)
	public projectId!: number;

	@BelongsTo(() => Project)
	public readonly project!: Project;
}
