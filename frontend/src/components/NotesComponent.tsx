import { useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { MdPerson } from 'react-icons/md';
import DetailsModal from './DetailsNote';
import AddNoteModal from './AddNoteModal';
import DeleteModal from './DeleteModal';
import type { Note } from '../types/notes';

interface ComponentProps {
   user: boolean;
}

const NotesComponent:React.FC<ComponentProps> = ({user}) => {
  const [notes, setNotes] = useState<Note[]>([
    {
      noteId: 1,
      content: 'Meeting notes from the client presentation. We discussed project requirements and timelines for Q3 deliverables.',
      user: 'Sarah Johnson',
      title: 'About Post',
      isFavorited: true,
      userId: 1
    },
    {
      noteId: 2,
      content: 'Grocery list for the weekend: eggs, milk, bread, fruits, and vegetables. Don\'t forget to buy dog food!',
      user: 'Mike Chen',
      title: 'Personal Post',
      isFavorited: false,
      userId: 1
    }
  ]);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [isDescModalOpen, setIsDescModalOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const toggleFavorite = (id: number) => {
    setNotes(notes.map(note => 
      note.noteId === id ? { ...note, isFavorited: !note.isFavorited } : note
    ));
  };

const openDescModal = (note: Note) => {
   setSelectedNote(note);
   setIsDescModalOpen(true);
}

const closeDescModal = () => {
   setIsDescModalOpen(false);
   setSelectedNote(null);
}

const openEditModal = (note: Note) => {
   setSelectedNote(note);
   setIsEditOpen(true);
}

const closeEditModal = () => {
   setIsEditOpen(false);
   setSelectedNote(null);
}

const openDeleteModal = (note: Note) => {
   setSelectedNote(note);
   setIsDeleteOpen(true);
}

const closeDeleteModal = () => {
   setIsDeleteOpen(false);
   setSelectedNote(null);
}

  return (
   <>
      {notes.map(note => (
         <div key={note.noteId} className="bg-[var(--primary-lighter)] rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
         <div className="p-5">
            <div className="flex justify-between items-start mb-3">
                  <span onClick={() => openDescModal(note)} className="py-1 font-semibold text-base rounded-full hover:underline cursor-pointer text-[var(--primary-color)]">
                  {note.title}
                  </span>

               <div className="flex items-center gap-2">
               {user?(
                  <>
                     {/* Edit Button */}
                     <button 
                        onClick={() => openEditModal(note)}
                        className="text-gray-600 hover:text-blue-600 focus:outline-none p-1 rounded-full hover:bg-blue-50"
                        aria-label="Edit note"
                     >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                     </button>
                     
                     {/* Delete Button */}
                     <button 
                        onClick={() => openDeleteModal(note)}
                        className="text-gray-600 hover:text-red-600 focus:outline-none p-1 rounded-full hover:bg-red-50"
                        aria-label="Delete note"
                     >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                     </button>
                     </>
               ): (
                  <>
                     <button 
                     onClick={() => toggleFavorite(note.noteId!)}
                     className="text-gray-400 hover:text-yellow-500 focus:outline-none"
                     >
                     {note.isFavorited ? (
                        <FaHeart className='w-6 h-6 text-red-500'/>
                     ) : (
                        <FaRegHeart className='w-6 h-6'/>
                     )}
                     </button>
                  </>
               )}
               </div>

            </div>
            
            
            <p className="text-gray-700 mb-4 line-clamp-3">
               {note.content}
            </p>
            
            <div className="flex items-center justify-between text-sm text-gray-500">
               {!user && (
               <span className="flex flex-row gap-2 font-medium items-end">
                  <MdPerson className='w-5 h-5'/>
                  {note.user}
               </span>
               )}
               {/* <span>{new Date(note.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span> */}
            </div>
         </div>
         </div>
      ))}
       <DetailsModal
        note={selectedNote}
        isOpen={isDescModalOpen}
        onClose={closeDescModal}
        user={user}
      />

      <AddNoteModal
         isOpen={isEditOpen}
         onClose={closeEditModal}
         isEdit= {true}
         noteToEdit= {selectedNote}
      />

      <DeleteModal
         isOpen = {isDeleteOpen}
         onClose= {closeDeleteModal}
         noteToDelete= {selectedNote}
      />
   </>
  );
};

export default NotesComponent;