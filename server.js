require("dotenv").config();
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { typeDefs, resolvers } from "./schema";
import { getUser } from "./users/users.utils";
import logger from "morgan";
import http from "http";
import { graphqlUploadExpress } from "graphql-upload";

const PORT = process.env.PORT;
const apollo = new ApolloServer({
  resolvers,
  typeDefs,

  context: async (ctx) => {
    if (ctx.req) {
      return {
        loggedInUser: await getUser(ctx.req.headers.token),
      };
    } else {
      const {
        connection: { context },
      } = ctx;
      return {
        loggedInUser: context.loggedInUser,
      };
    }
  },
  subscriptions: {
    onConnect: async ({ token }) => {
      if (!token) {
        throw new Error("you can't listend.");
      }
      const loggedInUser = await getUser(token);
      return {
        loggedInUser,
      };
    },
  },
});

//make server
const app = express();
//use middleware
app.use(logger("tiny"));
//upload static filedir on server
app.use("/static", express.static("uploads"));
//create http server
const httpServer = http.createServer(app);
//handle ws(realtime database)
apollo.installSubscriptionHandlers(httpServer);
//with apollo server
apollo.applyMiddleware({ app });

httpServer.listen({ port: PORT }, () => {
  console.log("🌷server is running http://localhost:4000/💗");
});
