import Notes from "../models/note.model";
import { NoteAttributes } from "../types/note.types";

class NotesRepository {
   async createNote (note: Omit<NoteAttributes ,'noteId'>): Promise<Notes> {
      const {title, content, user, userId} = note;

      return await Notes.create({
         title, content, user, userId
      })
   }

   async getNotesByUserId(userId: number): Promise<Notes[]> {
      return await Notes.findAll({
         where: {userId}
      });
   }

   async getNotes(): Promise<Notes[]> {
      return await Notes.findAll();
   }

   async editNote(noteId: number, updates: Partial<NoteAttributes>): Promise<Notes | null> {
      const note = await Notes.findByPk(noteId);
      if(!note) return null;

      await note.update(updates);
      return note;
   }

   async deleteNote (noteId: number): Promise<boolean> {
      const deletedCount = await Notes.destroy({ where: {noteId} });
      return deletedCount > 0;
   }

}

export default new NotesRepository();