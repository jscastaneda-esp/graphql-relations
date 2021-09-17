import { GraphQLServer } from "graphql-yoga";
import { typeDefs } from "./graphql/typeDefs";
import { resolvers } from "./graphql/resolvers";

const server = new GraphQLServer({
  typeDefs,
  resolvers,
});

server.start(
  {
    port: process.env.PORT || 3001,
    playground:
      process.env.NODE_ENV && process.env.NODE_ENV === "development"
        ? "/"
        : false,
  },
  ({ port }) => console.log(`Server is running port ${port}`)
);
