import express from "express";
import {
  createNotes,
  delNotes,
  getNoteById,
  getNotes,
  updateNote,
} from "../controllers/notesController.js";

const notesRouter = express.Router();

notesRouter.post("/create", createNotes);
notesRouter.get("/get", getNotes);
notesRouter.get("/get/:id", getNoteById);

notesRouter.put("/update/:id", updateNote);
notesRouter.delete("/delete/:id", delNotes);

export default notesRouter;
