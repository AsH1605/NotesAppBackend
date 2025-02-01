import bodyParser from "body-parser";
import { Router } from "express";
import { createNote, deleteNote, getAllNotes, getNote, updateNote } from "../controller/note.controller";
import { verifyJwtToken } from "../auth/user.auth";

export const noteRouter = Router()

noteRouter.use(bodyParser.json())

noteRouter.use(verifyJwtToken)

noteRouter.route("/createNote").post(createNote)

noteRouter.route("/getNotes").get(getAllNotes)

noteRouter.route("/getNote/:note_id").get(getNote)

noteRouter.route("/deleteNote/:note_id").delete(deleteNote)

noteRouter.route("/updateNote/:note_id").put(updateNote)