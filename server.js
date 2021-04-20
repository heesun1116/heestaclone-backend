require("dotenv").config();
import { ApolloServer } from "apollo-server";
import schema from "./schema";

const PORT = process.env.PORT;
const server = new ApolloServer({
  schema,
  context: {
    "jwt-token":
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwiaWF0IjoxNjE4OTE0ODAwfQ.QqiSgwvAlbSILWVa73xeizalz54v4yToRXuEqux4etc",
  },
});

server
  .listen(PORT)
  .then(() => console.log("server is running http://localhost:4000/"));
