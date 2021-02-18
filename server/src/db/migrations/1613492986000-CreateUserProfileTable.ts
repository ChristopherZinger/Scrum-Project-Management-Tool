import { QueryInterface, DataTypes } from "sequelize";

const migration = {
	up: (queryInterface: QueryInterface) =>
		queryInterface.sequelize.transaction(async transaction => {
			await queryInterface.createTable(
				"UserProfile",
				{
					id: {
						type: DataTypes.INTEGER,
						primaryKey: true,
						autoIncrement: true
					},
					firstname: {
						type: DataTypes.STRING,
						allowNull: false
					},
					lastname: {
						type: DataTypes.STRING,
						allowNull: false
					},
					userId: {
						type: DataTypes.INTEGER,
						allowNull: false,
						references: {
							model: "User",
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
		return queryInterface.dropTable("User");
	}
};

export default migration;
