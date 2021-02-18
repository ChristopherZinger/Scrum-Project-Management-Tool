import { ObjectType, Field, ID } from "type-graphql";
import {
	Column,
	Model,
	BelongsTo,
	ForeignKey,
	Table
} from "sequelize-typescript";
import { UserType } from "../../user/graphql/user.type";
import { User } from "../../user/model/User.model";

@ObjectType()
@Table({
	timestamps: true,
	freezeTableName: true
})
export class UserProfile extends Model<UserProfile> {
	@Field(() => ID)
	@Column({ primaryKey: true, autoIncrement: true })
	public id!: number;

	@Field()
	@Column
	public firstname!: string;

	@Field()
	@Column
	public lastname!: string;

	@Field(() => UserType)
	@BelongsTo(() => User)
	public readonly user?: User;

	@ForeignKey(() => User)
	@Column
	public userId?: number;
}
