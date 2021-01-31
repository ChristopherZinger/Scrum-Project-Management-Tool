import { createConnection, Connection } from "typeorm";

export async function createDBConnection() {
    let conn: null | Connection = null;
    try{
        conn = await createConnection();
        console.log("Succes! Connection with db.")
    } catch (err) {
        throw new Error (err)
    }
    return conn;
}