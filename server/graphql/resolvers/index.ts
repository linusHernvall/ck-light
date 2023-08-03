import { usersResolvers } from "./users";

export const resolvers = {
  Query: {
    ...usersResolvers.Query,
  },
  Mutation: {
    ...usersResolvers.Mutation,
  },
};
