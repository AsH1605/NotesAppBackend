import { RequestHandler } from "express";
import { verifyJwtToken } from "../auth/user.auth";
import { createNewNote } from "../db/note.db";

export const createNote: RequestHandler= (req, res): void => {
    // 1. extract token from request header
    // 2. get user_id from token 
    // 3. if user_id is undefined return 401 unauthorized
    // 4. create CreateNoteRequest interface
    // 5. else read note from request body
    // 6. save note to datbase with user_id
    // 7. create CreateNoteResponse interface
    // 8. return saved note as response
    // verifyJwtToken()
    const {id_token, title, content} = req?.body
    const user_id = Number(verifyJwtToken(id_token))
    // console.log(user_id)
    if(!user_id){
        console.log("User unauthorized")
        res.status(401).json({message: "User_id does not exist"})
    }
    createNewNote(user_id, title, content).then(note => {
        console.log("Note created successfully")
        res.status(200).json({note})
    }).catch((error) => {
        console.log("Note creation failed because ", error)
        res.status(400).json({ message: error.message })
    })
}

