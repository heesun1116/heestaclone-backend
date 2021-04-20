import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import client from "../../client";
export default {
  Mutation: {
    login: async (_, { userName, password }) => {
      //1. find user with args. username
      const user = await client.user.findFirst({
        where: { userName },
      });
      console.log(user);
      if (!user) {
        return {
          ok: false,
          error: "USer not found",
        };
      }
      //2. check password with args.password
      const passwordOk = await bcrypt.compare(password, user.password);

      if (!passwordOk) {
        return {
          ok: false,
          error: "Incorrect password",
        };
      }
      //3. issue a token adn send it to the user
      const token = await jwt.sign({ id: user.id }, process.env.SECRET_KEY);
      return {
        ok: true,
        token,
      };
    },
  },
};
