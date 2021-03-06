import { Story } from "./../models/story/model/Story.model";
import { UserProfile } from "../models/userProfile/model/UserProfile.model";
import { Sequelize, SequelizeOptions } from "sequelize-typescript";
import { User } from "../models/user/model/User.model";
import { Company } from "../models/company/model/Company.model";
import { Project } from "./../models/project/model/Project.model";
import { Sprint } from "../models/sprint/model/Sprint.model";

export async function createDBConnection() {
	const options: SequelizeOptions = {
		database: process.env.DB_NAME,
		dialect: "postgres",
		logging: false,
		host: process.env.DB_HOST,
		username: process.env.DB_USERNAME,
		password: process.env.DB_PASSWORD,
		benchmark: true
	};

	const connection = new Sequelize(options);

	connection.addModels([User, UserProfile, Company, Project, Sprint, Story]);

	if (!connection) {
		throw new Error("Could NOT connect with database.");
	}

	return connection;
}
