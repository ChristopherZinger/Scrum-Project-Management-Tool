import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { createGQLContext } from "./create-gql-context";
import path from "path";
import { createDBConnection } from "./create-db-connection";
import { setupRedisAndExpressSession } from "./setup-redis-and-express-session";
import { customAuthChecker } from "./authorization/auth-checker";
import cors from "cors";

export async function createExpressApp() {
	const connectionDB = await createDBConnection();
	if (!connectionDB) {
		throw new Error("Could NOT connect with database.");
	}

	const schema = await buildSchema({
		resolvers: [
			path.join(__dirname, "../models/**/*.{query,mutation,resolver}.{ts,js}")
		],
		authChecker: customAuthChecker
	});

	const app = express();
	app.set("trust proxy", "loopback");
	app.use(
		cors({
			credentials: true,
			origin: process.env.FRONTEND_URL
		})
	);

	setupRedisAndExpressSession(app);

	const apolloServer = new ApolloServer({
		schema,
		context: ({ req, res }) => createGQLContext(req, res)
	});

	apolloServer.applyMiddleware({ app, cors: false });
	return app;
}
