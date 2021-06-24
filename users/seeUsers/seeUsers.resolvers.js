import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Query: {
    seeUsers: protectedResolver((_, __, { loggedInUser }) =>
      client.user.findMany()
    ),
  },
};
