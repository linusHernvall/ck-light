import { gql } from "apollo-server";

const typeDefs = gql`
  type User {
    id: ID!
    email: String!
    username: String!
    createdAt: String!
    token: String!
  }

  input RegisterInput {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
  }
  type Query {
    getUsers: [User]
  }
  type Mutation {
    register(registerInput: RegisterInput): User
  }
`;

export default typeDefs;
