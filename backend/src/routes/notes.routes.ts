import { Router } from "express";
import notesController from "../controller/notes.controller";

const noteRouter = Router();

noteRouter.post('/add-task', notesController.addNotes);
noteRouter.get('/:userId', notesController.getNotesByUserId);
noteRouter.get('/', notesController.getNotes);
noteRouter.put('/edit-task/:id', notesController.editNote);
noteRouter.delete('/delete-task/:id', notesController.deleteNote);

export default noteRouter;