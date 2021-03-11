import { QueryInterface, DataTypes } from "sequelize";

const migration = {
	up: (queryInterface: QueryInterface) =>
		queryInterface.sequelize.transaction(async transaction => {
			await queryInterface.createTable(
				"Sprint",
				{
					id: {
						type: DataTypes.INTEGER,
						primaryKey: true,
						autoIncrement: true
					},
					startsAt: {
						type: DataTypes.DATE,
						allowNull: false,
						defaultValue: DataTypes.NOW
					},
					endsAt: {
						type: DataTypes.DATE,
						allowNull: false
					},
					isFinished: {
						type: DataTypes.BOOLEAN,
						allowNull: false,
						defaultValue: false
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

			await queryInterface.addColumn(
				"Project",
				"activeSprintId",
				{
					type: DataTypes.INTEGER,
					allowNull: true,
					references: {
						model: "Sprint",
						key: "id"
					}
				},
				{ transaction }
			);
		}),

	down: (queryInterface: QueryInterface) =>
		queryInterface.sequelize.transaction(async transaction => {
			await queryInterface.removeColumn("Project", "activeSprintId", {
				transaction
			});
			await queryInterface.dropTable("Sprint", { transaction });
		})
};

export default migration;
