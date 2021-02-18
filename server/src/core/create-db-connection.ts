import { UserProfile } from "../models/userProfile/model/UserProfile.model";
import { Sequelize, SequelizeOptions } from "sequelize-typescript";
import { User } from "../models/user/model/User.model";

export async function createDBConnection() {
	const options: SequelizeOptions = {
		database: process.env.DB_NAME,
		dialect: "postgres",
		host: process.env.DB_HOST,
		username: process.env.DB_USERNAME,
		password: process.env.DB_PASSWORD,
		benchmark: true
	};

	const connection = new Sequelize(options);

	connection.addModels([User, UserProfile]);

	return connection;
}
