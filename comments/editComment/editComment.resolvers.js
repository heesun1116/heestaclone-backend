import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    editComment: protectedResolver(
      async (_, { id, payload }, { loggedInUser }) => {
        const comment = await client.commnet.findUnique({
          where: {
            id,
          },
          select: {
            userId: true,
          },
        });
        if (!comment) {
          return {
            ok: false,
            error: "Comment not Found",
          };
        } else if (comment.userId !== loggedInUser.id) {
          return {
            ok: false,
            error: "NOT authorized",
          };
        } else {
          await client.commnet.update({
            where: {
              id,
            },
            data: {
              payload,
            },
          });
          return {
            ok: true,
          };
        }
      }
    ),
  },
};
