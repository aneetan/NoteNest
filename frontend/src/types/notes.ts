export interface Note {
   noteId: number | null;
   title: string;
   content: string;
   userId: number | null;
   user: string | undefined;
   createdAt?: Date;
   updatedAt?: Date;
}