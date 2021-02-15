import {
	MigrationInterface,
	QueryRunner,
	Table,
	TableForeignKey,
	TableColumn,
	getConnection
} from "typeorm";

export class CreateUserAndUserProfileTables1613394857415
	implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await getConnection().transaction(async transactionalEntityManager => {
			// create User table
			await queryRunner.createTable(
				new Table({
					name: "user",
					columns: [
						{
							name: "id",
							type: "int",
							isPrimary: true
						},
						{
							name: "email",
							type: "varchar",
							isUnique: true,
							isNullable: false
						},
						{
							name: "password",
							type: "varchar",
							isUnique: true,
							isNullable: false
						},
						{
							name: "emailConfirmed",
							type: "date",
							isNullable: true
						},
						{
							name: "isActive",
							type: "boolean",
							isNullable: false
						},
						{
							name: "removedAt",
							type: "date",
							isNullable: true
						},
						{
							name: "role",
							type: `enum`,
							enum: [`ADMIN`, `BASE_USER`, `STAFF`],
							enumName: "UserRole",
							default: `'BASE_USER'`,
							isNullable: false
						}
					]
				}),
				true
			);

			await queryRunner.createTable(
				new Table({
					name: "user_profile",
					columns: [
						{
							name: "id",
							type: "int",
							isPrimary: true
						},
						{
							name: "firstname",
							type: "varchar",
							isNullable: false
						},
						{
							name: "lastname",
							type: "varchar",
							isNullable: false
						}
					]
				}),
				true
			);

			await queryRunner.addColumn(
				"user",
				new TableColumn({
					name: "profileId",
					type: "int"
				})
			);

			await queryRunner.createForeignKey(
				"user",
				new TableForeignKey({
					columnNames: ["profileId"],
					referencedColumnNames: ["id"],
					referencedTableName: "user",
					onDelete: "CASCADE"
				})
			);
		});
	}

	public async down(queryRunner: QueryRunner): Promise<void> {}
}
