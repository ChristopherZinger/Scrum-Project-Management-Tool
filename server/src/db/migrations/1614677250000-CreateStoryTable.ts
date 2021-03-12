import { StoryStatus } from "../../models/story/model/Story.model";
import { QueryInterface, DataTypes } from "sequelize";

const migration = {
	up: (queryInterface: QueryInterface) =>
		queryInterface.sequelize.transaction(async transaction => {
			await queryInterface.createTable(
				"Story",
				{
					id: {
						type: DataTypes.INTEGER,
						primaryKey: true,
						autoIncrement: true
					},
					title: {
						type: DataTypes.STRING,
						allowNull: false
					},
					description: {
						type: DataTypes.STRING,
						allowNull: false
					},
					status: {
						type: DataTypes.ENUM({
							values: Object.values(StoryStatus)
						}),
						allowNull: false
					},
					projectId: {
						type: DataTypes.INTEGER,
						allowNull: false,
						onDelete: "CASCADE",
						references: {
							model: "Project",
							key: "id"
						}
					},
					userProfileId: {
						type: DataTypes.INTEGER,
						allowNull: true,
						references: {
							model: "UserProfile",
							key: "id"
						}
					},
					sprintId: {
						type: DataTypes.INTEGER,
						allowNull: true,
						references: {
							model: "Sprint",
							key: "id"
						}
					},
					createdAt: {
						type: DataTypes.DATE,
						allowNull: false
					},
					updatedAt: {
						type: DataTypes.DATE,
						allowNull: false
					}
				},
				{ transaction }
			);
		}),

	down: (queryInterface: QueryInterface) => queryInterface.dropTable("Story")
};

export default migration;
