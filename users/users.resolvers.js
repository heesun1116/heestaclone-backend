import { flattenArray } from "@graphql-tools/utils";
import client from "../client";

export default {
  User: {
    totalFollowing: ({ id }) =>
      //   console.log(root.userName); // acces the parent
      client.user.count({
        where: {
          followers: {
            some: {
              id,
            },
          },
        },
      }),
    totalFollowers: ({ id }) =>
      client.user.count({
        where: {
          following: {
            some: {
              id,
            },
          },
        },
      }),
    isMe: ({ id }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      }
      return id === loggedInUser.id;
    },
    isFollowing: async ({ id }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      }
      const exists = await client.user
        .findUnique({ where: { userName: loggedInUser.userName } })
        .following({ where: { id } });
      return exists.length !== 0;
    },
  },
};
