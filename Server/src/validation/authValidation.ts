import Joi from "joi";
import { RegisterRequest, LoginRequest } from "../types/requests";

export const registerSchema = Joi.object({
  login: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  username: Joi.string().required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  sex: Joi.string().required(),
  birthDate: Joi.date().required(),
});

export const loginSchema = Joi.object({
  login: Joi.string().required(),
  password: Joi.string().required(),
});

export function validateRegisterData(data: RegisterRequest) {
  return registerSchema.validate(data);
}

export function validateLoginData(data: LoginRequest) {
  return loginSchema.validate(data);
}
