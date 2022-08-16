import { IRouter, Router } from "express";
import { registerUser, loginUser } from "../controllers/auth.controller";

const router: IRouter = Router();

// REGISTER USER ROUTE
router.post("/register", registerUser);

// LOGIN USER
router.post("/login", loginUser);

export default router;
