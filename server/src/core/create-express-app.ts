import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { createGQLContext } from "./create-gql-context";
import path from "path";
import { bootAppCore } from "./app-core";
import { setupRedisAndExpressSession } from "./setup-redis-and-express-session";
import { customAuthChecker } from "./authorization/auth-checker";
import { formatErrors } from "./formatErrors/format-errors";

export async function createExpressApp() {
	const appCore = await bootAppCore();

	const schema = await buildSchema({
		resolvers: [
			path.join(__dirname, "../models/**/*.{query,mutation,resolver}.{ts,js}")
		],
		authChecker: customAuthChecker,
		container: appCore.container
	});

	const app = express();

	app.set("trust proxy", process.env.NODE_ENV === "production");

	setupRedisAndExpressSession(app);

	const apolloServer = new ApolloServer({
		schema,
		context: ({ req, res }) => createGQLContext(req, res),
		formatError: formatErrors
	});

	const origin =
		process.env.NODE_ENV === "production"
			? "https://scrum-arch-service.com"
			: "localhost";

	apolloServer.applyMiddleware({
		app,
		path: "/graphql",
		cors: {
			credentials: true,
			origin
		}
	});

	if (process.env.NODE_ENV === "production") {
		// serve React app
		app.use(express.static(path.join(__dirname, "../../../build")));
		app.get("*", (_, res) => {
			res.sendFile(path.resolve(__dirname, "../../../build", "index.html"));
		});
	}

	return app;
}
