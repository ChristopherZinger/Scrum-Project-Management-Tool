import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { Resolver, Query, buildSchema } from "type-graphql";

@Resolver()
class TestResolver {
    @Query(() => String)
    public async hello(){
        return "hello word"
    };
}

export async function createExpressApp() {

    const schema = await buildSchema({
        resolvers: [TestResolver],
    })

    const apolloServer = new ApolloServer({
        schema,
    })
    
    const app = express()  

    apolloServer.applyMiddleware({ app }); 
    return app;
}