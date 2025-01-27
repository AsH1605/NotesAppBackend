import { RequestHandler } from "express";

export const createNote: RequestHandler= async(req, res) => {
    // 1. extract toekn from request header
    // 2. get user_id from token 
    // 3. if user_id is undefined return 401 unauthorized
    // 4. create CreateNoteRequest interface
    // 5. else read note from request body
    // 6. save note to datbase with user_id
    // 7. create CreateNoteResponse interface
    // 8. return saved note as response
    // verifyJwtToken()
}

