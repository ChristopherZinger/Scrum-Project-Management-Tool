import { createConnection } from "typeorm";

createConnection

export async function createDBConnection() {
    try{
        await createConnection({
            "type": "postgres",
            "host": "localhost",
            "port": 5432,
            "username": "postgres",
            "password": "secret",
            "database": "noteexchangedb",
            "synchronize": true,
            "logging": true,
            "entities": [
                "src/model/**/*.model.ts"
            ],
            "migrations": [
                "src/db/migrations/**/*.ts"
            ],
            "subscribers": [
                "src/subscriber/**/*.ts"
            ],
            "cli": {
                "entitiesDir": "src/entity",
                "migrationsDir": "src/migration",
                "subscribersDir": "src/subscriber"
            } 
        });
        console.log("Succes! Connection with db.")
    } catch (err) {
        throw new Error (err)
    }
}