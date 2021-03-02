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
						allowNull: true
					},
					status: {
						type: DataTypes.ENUM({
							values: ["TODO", "DEVELOPEMENT", "REVIEW", "TEST", "DONE"]
						}),
						allowNull: true
					},
					projectId: {
						type: DataTypes.INTEGER,
						allowNull: false,
						references: {
							model: "Project",
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
