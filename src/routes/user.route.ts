import bodyParser from "body-parser";
import { Router } from "express";
import { loginUser, registerUser } from "../controller/user.controller";

export const userRouter = Router()

userRouter.use(bodyParser.json())

userRouter.route("/register").post(registerUser)

userRouter.route("/login").post(loginUser)
