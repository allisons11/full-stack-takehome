import dotenv from "dotenv";
dotenv.config();

import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { run, client } from "./db/connection.js";
import typeDefs from "./typeDefs.js";
import resolvers from "./resolvers.js";

const port = process.env.port ? Number(process.env.PORT) : 4000;

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// start apollo server
const { url } = await startStandaloneServer(server, {
  listen: { port },
});

console.log(`Server running on ${url}`);

// start mongodb connection
run().catch(console.dir);

// close server & mongodb client on termination
process.on("SIGINT", async () => {
  console.log("\nReceived SIGINT. Stopping Apollo Server...");
  await server.stop();
  console.log("Apollo Server stopped.");
  await client.close();
  console.log("MongoDB client closed.");
  process.exit(0);
});
