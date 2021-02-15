import { createConnection, Connection } from "typeorm";
import path from "path";

export async function createDBConnection() {
	let conn: null | Connection = null;
	try {
		conn = await createConnection({
			type: "postgres",
			host: process.env.DB_HOST,
			port: parseInt(process.env.DB_PORT || "5432", 10),
			username: process.env.DB_USERNAME,
			password: process.env.DB_PASSWORD,
			database: process.env.DB_NAME,
			synchronize: false,
			logging: false,
			entities: [path.join(__dirname, "../models/**/*.model.{ts,js}")],
			migrations: [path.join(__dirname, "../db/migrations/**/*.{ts,js}")],
			subscribers: [path.join(__dirname, "../subscriber/**/*.{ts,js}")],
			cli: {
				entitiesDir: path.join(__dirname, "../models/**/*.model.{ts,js}"),
				migrationsDir: path.join(__dirname, "../db/migrations/**/*.{ts,js}"),
				subscribersDir: path.join(__dirname, "../subscriber/**/*.{ts,js}")
			}
		});
		console.log("Succes! Connection with db.");
	} catch (err) {
		throw new Error(err);
	}
	return conn;
}
