export interface NoteAttributes {
   noteId: number;
   title: string;
   content: string;
   createdAt?: Date;
   updatedAt?: Date;
   userId: number;
   user: string;
}