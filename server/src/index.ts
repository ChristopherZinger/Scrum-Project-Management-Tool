import "reflect-metadata";
import {createExpressApp} from "./core/create-express-app";
import http from "http";
import {createConnection} from "typeorm";

(async function(){
    try{
        await createConnection();
        console.log("Succes! Connection with db.")
    } catch (err) {
        throw new Error (err)
    }

    const PORT = process.env.PORT || 8080;
    const server = await createExpressApp();

    const httpServer = http.createServer(server);

    httpServer.listen(PORT, ()=>{
        console.log(`Server started on http://localhost/${PORT}`)
    })
})();

