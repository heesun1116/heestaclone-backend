import bcrypt from "bcrypt";
import client from "../../client";
export default {
  Mutation: {
    createAccount: async (
      _,
      { firstName, lastName, userName, email, password }
    ) => {
      try {
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
        if (existingUser) {
          throw new Error("This username/eamil is already taken.");
        }
        //2. hash password
        const uglyPassword = await bcrypt.hash(password, 10);
        //3. save and return the user
        await client.user.create({
          data: {
            userName,
            email,
            firstName,
            lastName,
            password: uglyPassword,
          },
        });
        return {
          ok: true,
        };
      } catch (e) {
        //if error occured in try, the catch will be excutive .
        return {
          ok: false,
          error: "cant create account",
        };
      }
    },
  },
};
