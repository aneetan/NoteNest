export interface Note {
   noteId: number | null;
   title: string;
   content: string;
   userId: number | null;
   user: string | undefined;
   isFavorited: boolean;
}