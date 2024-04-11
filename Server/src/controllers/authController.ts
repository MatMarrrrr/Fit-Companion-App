import { Request, Response } from "express";
import { formatErrorMessage } from "../helpers/errorFormatter";
import AuthService from "../services/authService";
import {
  validateRegisterData,
  validateLoginData,
} from "../validation/authValidation";
import { RegisterRequest, LoginRequest } from "../types/requests";

export async function registerUser(
  req: Request<{}, {}, RegisterRequest>,
  res: Response
): Promise<void> {

  const { error } = validateRegisterData(req.body);
  if (error) {
    res.status(400).send({error: formatErrorMessage(error.details[0].message)});
    return;
  }

  try {
    const token = await AuthService.register(req.body);
    res.status(201).json({ token });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send({error: error.message});
    } else {
      res.status(500).send({error: "An unexpected error occurred"});
    }
  }
}

export async function loginUser(
  req: Request<{}, {}, LoginRequest>,
  res: Response
): Promise<void> {

  const { error } = validateLoginData(req.body);
  if (error) {
    res.status(400).send({error: formatErrorMessage(error.details[0].message)});
    return;
  }

  try {
    const { user, token } = await AuthService.login(req.body);
    res.json({ user, token });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send({error: error.message});
    } else {
      res.status(500).send({error: "An unexpected error occurred"});
    }
  }
}
