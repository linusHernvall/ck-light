import { ApolloServer } from "apollo-server";
import gql from "graphql-tag";
import mongoose from "mongoose";

import User from "./models/User";
const { MONGODB } = require("./config.js");

const typeDefs = gql`
  type User {
    id: ID!
    email: String!
    username: String!
    createdAt: String!
  }
  type Query {
    getUsers: [User]
  }
`;

const resolvers = {
  Query: {
    async getUsers() {
      try {
        const users = await User.find();
        return users;
      } catch (err: any) {
        throw new Error(err);
      }
    },
  },
};

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
