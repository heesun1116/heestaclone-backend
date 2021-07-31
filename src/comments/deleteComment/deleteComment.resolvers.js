import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    deleteComment: protectedResolver(async (_, { id }, { loggedInUser }) => {
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
          error: "Comment not found.",
        };
      } else if (comment.userId !== loggedInUser.id) {
        return {
          ok: false,
          error: "Not authorized.",
        };
      } else {
        await client.commnet.delete({
          where: {
            id,
          },
        });
        return {
          ok: true,
        };
      }
    }),
  },
};
