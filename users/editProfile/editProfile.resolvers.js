import client from "../../client";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export default {
  Mutation: {
    editProfile: async (
      _,
      { firstName, lastName, userName, email, password: newPassword }
    ) => {
      console.log(context);
      const { id } = await jwt.verify(token, process.env.SECRET_KEY); // return decoed token
      let uglyPassword = null;
      if (newPassword) {
        uglyPassword = await bcrypt.hash(newPassword, 10);
      }
      const ok = await client.user.update({
        where: { id },
        data: {
          firstName,
          lastName,
          userName,
          email,
          ...(uglyPassword && { password: uglyPassword }),
        },
      });
      if (ok) {
        return {
          ok: true,
        };
      } else {
        return {
          ok: false,
          error: "Could not update Profile.",
        };
      }
    },
  },
};
