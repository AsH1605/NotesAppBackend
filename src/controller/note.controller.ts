import { RequestHandler } from "express";
import { verifyJwtToken } from "../auth/user.auth";
import { createNewNote, getAllNotesByUserId, getNoteByNoteId } from "../db/note.db";
import { Note } from "../models/note.model";
import { CreateNoteRequest } from "../dto/note.dto";

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
    // console.log(req?.body)
    // console.log(req?.headers)
    // console.log(req?.query)
    // console.log(req?.params)
    const {title, content}: CreateNoteRequest = req?.body
    const user_id = Number(req.headers['user_id'])
    // console.log(user_id)
    if(!user_id){
        console.log("User unauthorized")
        res.status(401).json({message: "User_id does not exist"})
    }

    createNewNote(user_id, title, content).then(note => {
        console.log("Note created successfully")
        console.log(note)
        const noteResponse: Note = {
            id: note.id,
            user_id: note.user_id,
            title: note.title,
            content: note.content,
            created_at: note.created_at,
            last_updated_at: note.last_updated_at
        }
        res.status(200).json(noteResponse)
    }).catch((error) => {
        console.log("Note creation failed because ", error)
        res.status(400).json({ message: error.message })
    })
}

export const getAllNotes: RequestHandler = (req, res) => {
    try {
        const {id_token, note_id, title, content} = req?.body
        const user_id = Number(req.headers['user_id'])
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

export const getNote: RequestHandler = (req, res) =>  {
    try {
        const {id_token, note_id, title, content} = req?.body
        const user_id = Number(req.headers['user_id'])
        if(!user_id){
            console.log("User unauthorized")
            res.status(401).json({message: "User_id does not exist"})
        }
        const note = getNoteByNoteId(user_id, note_id)
        if(!note){
            console.log("No note with such Id")
            res.status(200).json({message: "No note with such Id"})
        }
        res.status(200).json({message: "Note fetched"})


    } catch (error) {
        res.status(400).json({message: "There was some issue in fetching note"})
    }
}