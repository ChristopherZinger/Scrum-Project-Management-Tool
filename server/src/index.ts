import "reflect-metadata";
import {createExpressApp} from "./core/create-express-app";
import {createDBConnection} from "./core/create-db-connection";
import http from "http";

(async function(){

    await createDBConnection();

    const PORT = process.env.PORT || 8080;
    const server = await createExpressApp();

    const httpServer = http.createServer(server);

    httpServer.listen(PORT, ()=>{
        console.log(`Server started on http://localhost/${PORT}`)
    })
})();

