import { Request, RequestHandler, Response } from "express"
import { createUser } from "../db/user.db"

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
