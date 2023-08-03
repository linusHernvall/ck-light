import { UserInputError } from "apollo-server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { SECRET_KEY } from "../../config";
import UserModel, { UserInterface } from "../../models/UserModel";

interface RegisterInput {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const usersResolvers = {
  Query: {
    async getUsers() {
      try {
        const users = await UserModel.find();
        return users.map((user) => ({ ...user.toObject(), id: user._id }));
      } catch (err: any) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    async register(
      _: any,
      { registerInput }: { registerInput: RegisterInput } // context: any,
    ) // info: any
    {
      // TODO: Validate user data
      //       Make sure user doesn't already exist
      let { username, email, password, confirmPassword } = registerInput;

      const user = await UserModel.findOne({ username });
      if (user) {
        throw new UserInputError("Username is taken", {
          errors: {
            username: "This username is taken",
          },
        });
      }

      password = await bcrypt.hash(password, 12);

      const newUser: UserInterface = new UserModel({
        email,
        username,
        password,
        createdAt: new Date().toISOString(),
      });

      const res = await newUser.save();

      const token = jwt.sign(
        {
          id: res.id,
          email: res.email,
          username: res.username,
        },
        SECRET_KEY,
        { expiresIn: "1h" }
      );

      return {
        ...res.toObject(),
        id: res._id,
        token,
      };
    },
  },
};
