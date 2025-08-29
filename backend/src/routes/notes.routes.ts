import { Router } from "express";
import notesController from "../controller/notes.controller";

const noteRouter = Router();

noteRouter.post('/add-note', notesController.addNotes);
noteRouter.get('/:userId', notesController.getNotesByUserId);
noteRouter.get('/', notesController.getNotes);
noteRouter.put('/edit-note/:id', notesController.editNote);
noteRouter.delete('/delete-note/:id', notesController.deleteNote);

export default noteRouter;