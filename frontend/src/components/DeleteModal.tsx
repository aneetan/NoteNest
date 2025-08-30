import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Note } from "../types/notes";
import type { AxiosError } from "axios";
import { deleteNote } from "../api/note.api";
import { showErrorToast, showSuccessToast } from "../utils/toast.utils";

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  noteToDelete: Note | null;
}

const DeleteModal: React.FC<DeleteModalProps> = ({isOpen, onClose, noteToDelete}) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (noteId: number) => deleteNote(noteId),
    onSuccess: () => {
      showSuccessToast("Note deleted successfully");
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      onClose();
    },
    onError: (err: AxiosError) => {
      console.error('Delete error:', err);
      showErrorToast("Failed to delete note");
    }
  });

  if (!isOpen || !noteToDelete) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleConfirm = () => {
    mutation.mutate(noteToDelete.noteId!);
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
        <div className="p-6">
          
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-2">Delete Note "{noteToDelete!.title}" </h2>
            <p className="text-gray-600">Are you sure you want to delete this item? This action cannot be undone.</p>
          </div>
          
          <div className="flex justify-center space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleConfirm}
              disabled={mutation.isPending}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors"
            >
                {mutation.isPending ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;