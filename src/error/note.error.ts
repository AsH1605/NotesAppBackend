import e from "express"
import { ApiError } from "./ApiError"

// Note Errors: 7XX
enum NoteErrorCodes {
    NOTE_ALREADY_EXISTS_TITLE = 701,
    UNKNOWN_NOTE_ERROR = 799
}

export const noteAlreadyExistsWithTitleError = new ApiError(NoteErrorCodes.NOTE_ALREADY_EXISTS_TITLE, "Note with title already exists")

export class UnknownNoteError extends ApiError {
    constructor(
        message: string
    ) {
        super(NoteErrorCodes.UNKNOWN_NOTE_ERROR, message)
    }
}