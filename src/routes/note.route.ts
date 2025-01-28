import bodyParser from "body-parser";
import { Router } from "express";
import { createNote, getAllNotes } from "../controller/note.controller";
import { verifyJwtToken } from "../auth/user.auth";

export const noteRouter = Router()

noteRouter.use(bodyParser.json())

noteRouter.use(verifyJwtToken)

noteRouter.route("/createNote").post(createNote)

noteRouter.route("/getNotes").get(getAllNotes)