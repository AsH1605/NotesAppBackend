import { Request, RequestHandler, Response } from "express"
import { createUser, getAuthenticatedUser, getUserByUsername, IncorrectPasswordError, UserDoesNoteExistError } from "../db/user.db"
import jwt from "jsonwebtoken";
import { LoginUserResponse } from "../dto/login.dto";
import { AuthPayload } from "../models/authPayload.model";

export const registerUser: RequestHandler = (req, res, next): void => {
    const { username, email, password } = req?.body

    createUser(username, email, password).then(user => {
        console.log("User created successfully")
        res.status(200).json({ message: "User created successfully" })
    }).catch((error) => {
        console.log("User creation failed because ", error)
        res.status(400).json({ message: error.message })
    })
}

export const loginUser: RequestHandler = (req, res):void => {
    const { username, password } = req?.body
    getAuthenticatedUser(username, password).then(user => {
        const payload: AuthPayload = {
            user_id: user.id
        }
        // const secret = process.env.JWT_SECRET!
        const token = jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: '24h'})
        const loginResponse: LoginUserResponse = {
            id_token: token,
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                password: "",
                created_at: user.created_at,
                last_updated_at: user.last_updated_at
            }
        }
        return res
            .status(200)
            .json(loginResponse)
    }).catch(error => {
        if( error instanceof IncorrectPasswordError){
            console.log("Incorrect password")
            return res
            .status(401)
            .json({message: "Incorrect password"})
        }
        else if(error instanceof UserDoesNoteExistError){
            return res
            .status(401)
            .json({message: "User does not exist", code: error.code})
        }
        else{
            res.status(400).json({ message: error.message })
        }
    })
}

