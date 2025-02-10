import { string } from "joi";
import { Note } from "../models/note.model";
import { knex } from "./db";
import { noteAlreadyExistsWithTitleError } from "../error/note.error";

export const createNewNote = async(
    user_id: number,
    title: string,
    content: string
): Promise<Note> => {
    const existingNote = (await knex('note').select<Note[]>('*').where({title: title}))[0]
    if(existingNote){
        console.log("Note with title already exists")
        throw noteAlreadyExistsWithTitleError
    }
    const currentDate = new Date()
    const newNote = (await knex('note').insert({
        user_id: user_id,
        title: title,
        content: content,
        created_at: currentDate,
        last_updated_at: currentDate
    }).returning<Note[]>('*'))[0]
    return newNote;
}

export const getAllNotesByUserId = async(
    user_id: number
): Promise<Note[]> =>{
    const allNotes: Note[] = await knex('note').select<Note[]>('*').where({user_id : user_id})

    for(var i = 0; i < allNotes.length; i++){
        console.log(allNotes[i])
    }
    return allNotes;
}

export const getNoteByNoteId = async(
    user_id: number,
    note_id: number
): Promise<Note> => {
    const note: Note = (await knex('note').select<Note[]>('*').where({user_id: user_id, id: note_id}))[0]
    console.log(note);
    return note;
}

export const deleteNoteById = async(
    user_id: number,
    note_id: number,
): Promise<boolean> => {
    const deletedNoteCount = await knex('note').delete().where({user_id: user_id, id: note_id})
    return deletedNoteCount!=0;
}

export const updateNoteByNoteId = async(
    user_id: number,
    note_id: number,
    title: string,
    content: string
): Promise<Note> => {
    console.log(user_id, note_id)
    const currentNote = (await knex('note').select<Note[]>('*').where({user_id: user_id, id: note_id}))[0]
    const currentDate = new Date();
    const updatedTitle = title.trim() !== '' ? title.trim() : currentNote.title
    const updatedContent = content.trim() !== '' ? content.trim() : currentNote.content
    const newNote = (await knex('note').update({
            title: updatedTitle,
            content: updatedContent,
            last_updated_at: currentDate
        }).where({user_id: user_id, id: note_id}).returning<Note[]>('*'))[0]
    return newNote
}