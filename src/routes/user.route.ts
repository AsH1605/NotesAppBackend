import bodyParser from "body-parser";
import { Router } from "express";555555555555555555
import { loginUser, registerUser } from "../controller/user.controller";

export const userRouter = Router()

userRouter.use(bodyParser.json())

userRouter.route("/register").post(registerUser)

userRouter.route("/login").post(loginUser)
