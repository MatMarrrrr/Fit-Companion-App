import UserModel from "../models/userModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { RegisterRequest, LoginRequest } from "../types/requests";

class AuthService {
  async register(
    registerData: RegisterRequest
  ): Promise<{ user: any; token: string }> {
    const existingUser = await UserModel.findOne({
      $or: [{ login: registerData.login }, { email: registerData.email }],
    });

    if (existingUser) {
      if (existingUser.login === registerData.login) {
        throw new Error("Login is already taken");
      } else {
        throw new Error("Email is already registered");
      }
    }

    const hashedPassword = await bcrypt.hash(registerData.password, 10);
    const user = new UserModel({
      login: registerData.login,
      email: registerData.email,
      password: hashedPassword,
      username: registerData.username,
      firstName: registerData.firstName,
      lastName: registerData.lastName,
      sex: registerData.sex,
      birthDate: registerData.birthDate,
    });

    await user.save();

    const userObject = user.toObject();
    delete userObject.password;

    const token = jwt.sign({ userId: user._id }, "secretKey");

    return { user: userObject, token: token };
  }

  async login(loginData: LoginRequest): Promise<{ user: any; token: string }> {
    const user = await UserModel.findOne({
      $or: [{ login: loginData.login }, { email: loginData.login }],
    });

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const userPassword = user.password || "";
    if (!(await bcrypt.compare(loginData.password, userPassword))) {
      throw new Error("Invalid credentials");
    }

    const token = jwt.sign({ userId: user._id }, "secretKey");
    const userObj = user.toObject();
    delete userObj.password;

    return { user: userObj, token: token };
  }
}

export default new AuthService();
