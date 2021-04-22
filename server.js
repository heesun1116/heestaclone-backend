require("dotenv").config();
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { typeDefs, resolvers } from "./schema";
import { getUser } from "./users/users.utils";
import logger from "morgan";

const PORT = process.env.PORT;
const apollo = new ApolloServer({
  resolvers,
  typeDefs,
  context: async ({ req }) => {
    return {
      loggedInUser: await getUser(req.headers.token),
    };
  },
});
//make server
const app = express();
//use middleware
app.use(logger("tiny"));
//upload static filedir on server
app.use("/static", express.static("uploads"));
//with apollo server
apollo.applyMiddleware({ app });
app.listen({ port: PORT }, () => {
  console.log("🌷server is running http://localhost:4000/💗");
});
