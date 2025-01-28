import { Note } from "../models/note.model";
import { knex } from "./db";

export const createNewNote = async(
    user_id: number,
    title: string,
    content: string
): Promise<Note> => {
    const existingNote = (await knex('note').select<Note[]>('*').where({title: title}))[0]
    if(existingNote){
        console.log("Note with title already exists")
        throw new Error("Note with title already exists")
    }
    const currentDate = new Date()
    const newNote = await knex('note').insert<Note>({
        user_id: user_id,
        title: title,
        content: content,
        created_at: currentDate,
        last_updated_at: currentDate
    })
    return newNote;
}