import client from "../../client";

export default {
  Query: {
    seePhotoComments: (_, { id }) =>
      client.commnet.findMany({
        where: {
          photoId: id,
        },
        orderBy: {
          createdAt: "asc",
        },
      }),
  },
};
