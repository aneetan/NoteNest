// components/AddNoteModal.tsx
import { useEffect, useState } from 'react';
import { QueryClient, useMutation } from '@tanstack/react-query';
import { addNotes, editNote } from '../api/note.api';
import { showErrorToast, showSuccessToast } from '../utils/toast.utils';
import type { AxiosError, AxiosResponse } from 'axios';
import type { Note } from '../types/notes';
import { getUserFromToken, getUserIdFromToken } from '../utils/token.utils';

interface AddNoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  isEdit: boolean;
  noteToEdit ?: Note | null;
}

type EditPayload = {noteId: number | null, formData: Partial<Note>};
type AddPayload = Omit<Note, 'noteId' | 'isFavorited'>;

const AddNoteModal: React.FC<AddNoteModalProps> = ({ isOpen, onClose, isEdit, noteToEdit }) => {
  const [formData, setFormData] = useState<Omit<Note,'isFavorited' | 'user'>>({
    noteId : null,
    title: '',
    content: '',
    userId: null
  })
  const [errors, setErrors] = useState<{title?: string, content?: string}>({});
  const queryClient = new QueryClient();
  const user = getUserFromToken(localStorage.getItem("token")!);

  useEffect(() => {
    if(isOpen){
      if(isEdit && noteToEdit){
        setFormData({
          noteId: noteToEdit.noteId,
          title: noteToEdit.title,
          content: noteToEdit.content,
          userId: getUserIdFromToken(localStorage.getItem("token")!)
        })
      } else {
        resetForm();
      }
    }
  }, [isOpen, isEdit, noteToEdit])

  const mutation = useMutation<AxiosResponse, AxiosError, EditPayload | AddPayload> ({
    mutationFn: (payload) => {
      if ('noteId' in payload && payload.noteId !== null) {
        const editPayload = payload as EditPayload;
        return editNote(editPayload.formData, editPayload.noteId!);
      } else {
        const addPayload = payload as AddPayload;
        return addNotes({ 
          ...addPayload, 
          user: user?.fullName,
          userId: Number(user?.id),
          noteId: null,
          isFavorited: false
        });
      }
    },
    onSuccess: () => {
         showSuccessToast(isEdit? "Note Updated Successfully" : "Note Added Successfully");
         queryClient.invalidateQueries({ queryKey: ['notes'] });
      },
      onError: (err) => {
         console.log(err)
         if(err.response){
            console.log('Error response data', err.response)
         }
         showErrorToast("Something went wrong");
      }
  })

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({...prev, [name]: undefined}));
    }
  }

  const validateForm = () => {
    const newErrors: {title?: string, content?: string} = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.content.trim()) {
      newErrors.content = 'Content is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

     if (isEdit) {
      mutation.mutate({ noteId: formData.noteId, formData});
    } else {
      mutation.mutate({
        title: formData.title,
        content: formData.content,
        user: user?.fullName,
        userId: Number(user?.id)
      });
    }
    
    resetForm();
    onClose();
  };

  const resetForm = ()=> {
    setFormData({
      noteId: null,
      title: '',
      content: '',
      userId: null
    });
    setErrors({});
  }

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const handleClose = () => {
    setErrors({});
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl font-bold text-gray-800">
                {isEdit ? 'Edit Note' : 'Add New Note'}
            </h2>
            <button 
              onClick={handleClose}
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
              aria-label="Close modal"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Title *
              </label>
              <input
                type="text"
                id="title"
                name='title'
                value={formData.title}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.title ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter note title"
              />
              {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
            </div>
            
            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                Content *
              </label>
              <textarea
                id="content"
                name='content'
                value={formData.content}
                onChange={handleChange}
                rows={5}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none ${
                  errors.content ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter your note content"
              />
              {errors.content && <p className="mt-1 text-sm text-red-600">{errors.content}</p>}
            </div>
            
            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={handleClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-[var(--primary-color)] rounded-md hover:bg-[var(--primary-color-hover)] focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                 {isEdit ? 'Update Note' : 'Add Note'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddNoteModal;