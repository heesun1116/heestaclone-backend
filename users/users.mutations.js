import bcrypt from "bcrypt";
import client from "../client";

export default {
  Mutation: {
    createAccount: async (
      _,
      { firstName, lastName, userName, email, password }
    ) => {
      //1.check if username or email are already on DB.
      const existingUser = await client.user.findFirst({
        where: {
          OR: [
            {
              userName: userName,
            },
            {
              email,
            },
          ],
        },
      });
      console.log(existingUser);
      //2. hash password
      const uglyPassword = await bcrypt.hash(password, 10);
      //3. save and return the user
      return client.user.create({
        data: {
          userName,
          email,
          firstName,
          lastName,
          password,
        },
      });
    },
  },
};
