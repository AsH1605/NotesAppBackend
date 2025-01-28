import bodyParser from "body-parser";
import { Router } from "express";
import { createNote } from "../controller/note.controller";

export const noteRouter = Router()

noteRouter.use(bodyParser.json())

noteRouter.route("/createNote").post(createNote)