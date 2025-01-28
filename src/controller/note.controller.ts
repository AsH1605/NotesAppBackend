import { RequestHandler } from "express";
import { verifyJwtToken } from "../auth/user.auth";
import { createNewNote, deleteNoteById, getAllNotesByUserId, getNoteByNoteId, updateNoteByNoteId } from "../db/note.db";
import { Note } from "../models/note.model";
import { CreateNoteRequest, UpdateNoteRequest } from "../dto/note.dto";

export const createNote: RequestHandler = (req, res): void => {
    // 1. extract token from request header
    // 2. get user_id from token 
    // 3. if user_id is undefined return 401 unauthorized
    // 4. create CreateNoteRequest interface
    // 5. else read note from request body
    // 6. save note to datbase with user_id
    // 7. create CreateNoteResponse interface
    // 8. return saved note as response
    const { title, content }: CreateNoteRequest = req?.body
    const user_id = Number(req.headers['user_id'])
    if (!user_id) {
        console.log("User unauthorized")
        res.status(401).json({ message: "User_id does not exist" })
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
    const user_id = Number(req.headers['user_id'])
    if (!user_id) {
        console.log("User unauthorized")
        res.status(401).json({ message: "User_id does not exist" })
    }
    getAllNotesByUserId(user_id).then(notes => {
        if (!notes) {
            console.log("No notes saved")
            res.status(200).json({ message: "No notes saved yet" })
        }
        res.status(200).json(notes)
    }).catch(error => {
        res.status(400).json({ message: "There was some issue in fetching note" })
    })
}

export const getNote: RequestHandler = (req, res) => {
    const note_id = Number(req?.params['note_id'])
    const user_id = Number(req.headers['user_id'])
    if (!user_id) {
        console.log("User unauthorized")
        res.status(401).json({ message: "User_id does not exist" })
    }
    getNoteByNoteId(user_id, note_id).then(note =>{
        if (!note) {
            console.log("No note with such Id")
            res.status(200).json({ message: "No note with such Id" })
        }
        res.status(200).json(note)
    }).catch (error=> {
        res.status(400).json({ message: "There was some issue in fetching note" })
    }) 
}

export const deleteNote: RequestHandler = async(req, res) => {
    const user_id = Number(req.headers['user_id'])
    const note_id = Number(req?.body['note_id'])
    if (!user_id || !note_id){
        console.log("User_id and note_id are required")
    }
    deleteNoteById(user_id, Number(note_id)).then(() => {
        console.log("Note deleted successfully")
        res.status(200).json({message: "Note deleted successfully"})
    }).catch(error => {
        console.log(error)
        res.status(400).json({ error })
    })
}

export const updateNote: RequestHandler = async(req, res) => {
    const user_id = Number(req.headers['user_id'])
    const note_id = Number(req?.params['note_id'])
    if (!user_id || !note_id){
        console.log("User_id and note_id are required")
    }
    const newFields: UpdateNoteRequest = req?.body
    updateNoteByNoteId(user_id, note_id, newFields.title, newFields.content).then(note =>{
        console.log("Note updated successfully")
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
        console.log("Note updation failed because ", error)
        res.status(400).json({ message: error.message })
    })
}