import { QueryInterface, DataTypes } from "sequelize";

const migration = {
	up: (queryInterface: QueryInterface) =>
		queryInterface.sequelize.transaction(async transaction => {
			await queryInterface.createTable(
				"Company",
				{
					id: {
						type: DataTypes.INTEGER,
						primaryKey: true,
						autoIncrement: true
					},
					name: {
						type: DataTypes.STRING,
						allowNull: false
					},
					email: {
						type: DataTypes.STRING,
						allowNull: false
					},
					city: {
						type: DataTypes.STRING,
						allowNull: true
					},
					street: {
						type: DataTypes.STRING,
						allowNull: true
					},
					buildingNumber: {
						type: DataTypes.STRING,
						allowNull: true
					},
					zipCode: {
						type: DataTypes.STRING,
						allowNull: true
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

			await queryInterface.addColumn("UserProfile", "companyId", {
				type: DataTypes.INTEGER,
				allowNull: true,
				references: {
					model: "Company",
					key: "id"
				}
			});
		}),

	down: (queryInterface: QueryInterface) => {
		return queryInterface.dropTable("Company");
	}
};

export default migration;
