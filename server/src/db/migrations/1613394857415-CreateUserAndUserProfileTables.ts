import { QueryInterface, DataTypes } from "sequelize";

const migration = {
	up: (queryInterface: QueryInterface) =>
		queryInterface.sequelize.transaction(async transaction => {
			await queryInterface.createTable(
				"User",
				{
					id: {
						type: DataTypes.INTEGER,
						primaryKey: true,
						autoIncrement: true
					},
					email: {
						type: DataTypes.STRING,
						allowNull: false,
						unique: true
					},
					password: {
						type: DataTypes.STRING,
						allowNull: false
					},
					emailConfirmed: {
						type: DataTypes.DATE,
						allowNull: true
					},
					isActive: {
						type: DataTypes.BOOLEAN
					},
					removedAt: {
						type: DataTypes.DATE,
						allowNull: true
					},
					createdAt: {
						type: DataTypes.DATE,
						allowNull: false
					},
					role: {
						type: DataTypes.ENUM("BASE_USER", "ADMIN", "STAFF"),
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
