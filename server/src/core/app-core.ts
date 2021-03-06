import { Sequelize } from "sequelize-typescript";
import { createDBConnection } from "./create-db-connection";
import { container } from "./create-inversify-container";
import { Container } from "inversify";
import { TYPES } from "./TYPES";

export class AppCore {
	public constructor(
		public container: Container,
		public sequelize: Sequelize
	) {}
}

export const bootAppCore = async function () {
	const connectionDB = await createDBConnection();

	// bind sequelize
	container.bind<Sequelize>(TYPES.Sequelize).toConstantValue(connectionDB);

	return new AppCore(container, connectionDB);
};
