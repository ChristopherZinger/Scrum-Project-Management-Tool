import dotenv from "dotenv";
import "reflect-metadata";
import { createExpressApp } from "./core/create-express-app";
import http from "http";

(async function () {
	dotenv.config();

	const PORT = process.env.PORT || 8080;
	const server = await createExpressApp();

	const httpServer = http.createServer(server);

	httpServer.listen(PORT, () => {
		console.log(`Server started on http://localhost/${PORT}`);
	});
})();
