import { QueryInterface, DataTypes } from "sequelize";

const migration = {
	up: (queryInterface: QueryInterface) =>
		queryInterface.sequelize.transaction(async transaction => {
			await queryInterface.createTable(
				"Project",
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
					pid: {
						// public id
						type: DataTypes.STRING
					},
					companyId: {
						type: DataTypes.INTEGER,
						allowNull: false,
						references: {
							model: "Company",
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

	down: (queryInterface: QueryInterface) => {
		return queryInterface.dropTable("Project");
	}
};

export default migration;
