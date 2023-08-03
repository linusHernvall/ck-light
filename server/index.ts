import { ApolloServer } from "apollo-server";
import mongoose from "mongoose";

import { MONGODB } from "./config";
import { resolvers } from "./graphql/resolvers";
import typeDefs from "./graphql/typeDefs";

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

mongoose
  .connect(MONGODB)
  .then(() => {
    console.log("MongoDB Connected");
    return server.listen({ port: 5000 });
  })
  .then((res) => {
    console.log(`Server running at ${res.url}`);
  });
