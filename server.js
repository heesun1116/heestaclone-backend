require("dotenv").config();
import { ApolloServer } from "apollo-server";
import schema from "./schema";
import { getUser, portectResolver } from "./users/users.utils";

const PORT = process.env.PORT;
const server = new ApolloServer({
  schema,
  context: async ({ req }) => {
    return {
      loggedInUser: await getUser(req.headers.token),
      portectResolver,
    };
  },
});

server
  .listen(PORT)
  .then(() => console.log("server is running http://localhost:4000/"));
