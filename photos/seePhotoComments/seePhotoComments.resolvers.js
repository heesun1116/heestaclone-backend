import client from "../../client";

export default {
  Query: {
    seePhotoComments: (_, { id, lastId }) =>
      client.commnet.findMany({
        where: {
          photoId: id,
        },
        skip: 1,
        take: 4,
        skip: lastId ? 1 : 0,
        ...(lastId && { cursor: { id: lastId } }),
        orderBy: {
          createdAt: "asc",
        },
      }),
  },
};
