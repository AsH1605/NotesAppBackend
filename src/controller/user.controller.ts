import { Request, RequestHandler, Response } from "express"
import { User } from "../models/user.model"

const users: User[] = []

const checkedUserExists = (username: string, email: string) => {
    for(let i = 0; i < users.length; i++){
        if(users[i].username === username || users[i].email === email){
            return true
        }
    }
    return false
}

const createNewUser = (username: string, email: string, password: string) => {
    const id = users.length + 1;
    const user: User = {id, username, email, password}
    users.push(user)
    return user
}

export const registerUser:RequestHandler = (req, res, next): void=>{
    const {username, email, password} = req?.body

    if(!(username && email && password)){
        console.log("All fields are required")
        res.status(400).json({message: "All fields are required"})
    }
    if(checkedUserExists(username, email)){
        console.log("User already exists")
        res.status(400).json({message: "User already exists"})
    }
    try {
        createNewUser(username, email, password)
        console.log("User created successfully")
        res.status(200).json({message: "User created successfully"})
    } catch (error) {
        console.log("User creation failed because ", error)
        res.status(400).json({message: "User creation failed"})
    }
}
