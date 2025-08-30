import { NextFunction, Request, Response } from "express";
import { verifyAccessToken } from "../middleware/auth.middleware";
import { validateSchema } from "../middleware/validate.middleware";
import { addNoteSchema, AddNoteUserInput, editNoteSchema } from "../schemas/notes.schema";
import notesRepository from "../repository/notes.repository";
import { errorResponse } from "../helper/errorMessage";
import { NoteAttributes } from "../types/note.types";

class NotesController {
   addNotes = [
      validateSchema(addNoteSchema),
      verifyAccessToken,
      async(req: Request<{}, {}, AddNoteUserInput['body']>, res: Response, next: NextFunction) => {
         try{
            const noteDto = req.body;

            const noteData = {
               title: noteDto.title,
               content: noteDto.content,
               user: noteDto.user,
               userId: noteDto.userId
            }

            const newNote = await notesRepository.createNote(noteData);

            res.status(201).json({newNote, message: "Note created successfully"});
         } catch (e) {
            errorResponse(e, res, "Error while adding note"); 
            next(e);
         }
      }
   ]

   getNotesByUserId = [
      verifyAccessToken,
      async (req: Request, res: Response, next: NextFunction) => {
         try{
            const userId = Number(req.params.userId);
            const notes: NoteAttributes[] = await notesRepository.getNotesByUserId(userId);
            res.status(200).json(notes);
         } catch (e) {
            errorResponse(e, res, "Error while retrieving notes"); 
            next(e);
         }
      }
   ]

   getNotes= [
      verifyAccessToken,
      async (req: Request, res: Response, next: NextFunction) => {
         try{
            const notes: NoteAttributes[] = await notesRepository.getNotes();
            res.status(200).json(notes);
         } catch (e) {
            errorResponse(e, res, "Error while retrieving notes"); 
            next(e);
         }
      }
   ]

   editNote = [
      validateSchema(editNoteSchema),
      verifyAccessToken,
      async(req: Request<{ id: string }, {}, Partial<NoteAttributes>>, res: Response, next: NextFunction) => {
         try {
            const noteId = parseInt(req.params.id, 10);
            if (isNaN(noteId)) return res.status(400).json({ error: "Invalid note ID" });

            const updates = req.body;
            const updatedNote = await notesRepository.editNote(noteId, updates);
            if (!updatedNote) return res.status(404).json({ error: "Note not found" });

            res.status(200).json({message: "Note updated successfully", note: updatedNote});

         } catch(e) {
            next(e);
         }
      }
   ]

   deleteNote = [
      verifyAccessToken,
      async(req: Request<{id: string}, {}, {}>, res: Response, next: NextFunction) => {
         try {
            const noteId = parseInt(req.params.id, 10);
            if (isNaN(noteId)) return res.status(400).json({ error: "Invalid note ID" });

            const deletedCount = await notesRepository.deleteNote(noteId);
            if(deletedCount === false) return res.status(400).json({ error: "Note not found" });
            
            res.status(200).json({message: "User deleted successfully"});
         } catch(e) {
            next(e);
         }
      }
   ]

}

export default new NotesController();