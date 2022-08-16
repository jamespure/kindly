import { Request, Response } from "express";
import registerValidation from "../validations/registerValidation";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/User";
import { config } from "../config/config";
import loginValidation from "../validations/loginValidation";

// REGISTER USER
export const registerUser = async (req: Request, res: Response) => {
  // VALIDATE NEW USER BEFORE SAVING USER
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).json(error.details[0].message);

  // HASHING PASSWORD BEFORE SAVING PASSWORD
  const hashedPassword = await bcryptjs.hash(req.body.password, 10);

  // CREATING NEW USER
  const user = new User({
    username: req.body.username,
    password: hashedPassword,
    email: req.body.email,
  });

  try {
    await user.save();
    return res.json({
      user: { username: user.username, email: user.email, _id: user._id },
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

// LOGIN USER
export const loginUser = async (req: Request, res: Response) => {
  // VALIDATE NEW USER BEFORE LOGIN
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).json(error.details[0].message);

  // CHECK IF USER EXIST
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(404).json({ message: "User not found" });

  // CHECK IF VALID PASSWORD
  const validPass = await bcryptjs.compare(req.body.password, user.password);
  if (!validPass)
    return res.status(403).json({ message: "Incorrect password or email" });

  // SIGN JSON WEB TOKEN
  const token = jwt.sign(
    { _id: user!._id },
    config.auth.token_secret as string,
    {
      expiresIn: "30m",
      algorithm: "HS256",
    }
  );

  // SET HEADERS
  return res.header("auth-token", token).json({ token: token });
};
