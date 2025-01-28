import { RequestHandler } from "express";
import { verifyJwtToken } from "../auth/user.auth";
import { createNewNote, getAllNotesByUserId } from "../db/note.db";
import { Note } from "../models/note.model";

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

        const noteResponse: Note = {
            id: note.id,
            user_id: note.user_id,
            title: note.title,
            content: note.content,
            created_at: note.created_at,
            last_updated_at: note.last_updated_at
        }
        res.status(200).json({noteResponse})
    }).catch((error) => {
        console.log("Note creation failed because ", error)
        res.status(400).json({ message: error.message })
    })
}

export const getAllNotes: RequestHandler = (req, res) => {
    try {
        const {id_token} = req?.body
        const user_id = Number(verifyJwtToken(id_token))
        if(!user_id){
            console.log("User unauthorized")
            res.status(401).json({message: "User_id does not exist"})
        }
        const notes = getAllNotesByUserId(user_id)
        if(!notes){
            console.log("No notes saved")
            res.status(200).json({message: "No notes saved yet"})
        }
        res.status(200).json({message: "All notes are fetched"})
    } catch (error) {
        res.status(400).json({message: "There was some issue in fetching note"})
    }
}