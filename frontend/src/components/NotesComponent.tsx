import { useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { MdPerson } from 'react-icons/md';
import { NavLink } from 'react-router';

interface Note {
  id: string;
  content: string;
  author: string;
  title: string;
  date: string;
  isFavorited: boolean;
}

interface ComponentProps {
   user: boolean;
}

const NotesComponent:React.FC<ComponentProps> = ({user}) => {
  const [notes, setNotes] = useState<Note[]>([
    {
      id: '1',
      content: 'Meeting notes from the client presentation. We discussed project requirements and timelines for Q3 deliverables.',
      author: 'Sarah Johnson',
      title: 'About Post',
      date: '2023-10-15',
      isFavorited: true
    },
    {
      id: '2',
      content: 'Grocery list for the weekend: eggs, milk, bread, fruits, and vegetables. Don\'t forget to buy dog food!',
      author: 'Mike Chen',
      title: 'Personal Post',
      date: '2023-10-14',
      isFavorited: false
    },
    {
      id: '3',
      content: 'Ideas for the new blog post: "10 React Best Practices in 2023", "State Management Comparison", "TypeScript Tips for React Devs".',
      author: 'Emma Wilson',
      title: 'Ideas Notes',
      date: '2023-10-12',
      isFavorited: true
    },
    {
      id: '4',
      content: 'Reminder: Dentist appointment on Tuesday at 3 PM. Bring insurance card and arrive 15 minutes early to fill out paperwork.',
      author: 'Alex Rivera',
      title: 'Reminders Hello',
      date: '2023-10-10',
      isFavorited: false
    }
  ]);

  const toggleFavorite = (id: string) => {
    setNotes(notes.map(note => 
      note.id === id ? { ...note, isFavorited: !note.isFavorited } : note
    ));
  };

  const handleEdit = (noteId: string) => {
  // Implement your edit logic here
  console.log('Edit note:', noteId);
  // You might want to open a modal or navigate to an edit page
};

const handleDelete = (noteId: string) => {
  // Implement your delete logic here
  if (window.confirm('Are you sure you want to delete this note?')) {
    setNotes(notes.filter(note => note.id !== noteId));
  }
};

  return (
   <>
      {notes.map(note => (
         <div key={note.id} className="bg-[var(--primary-lighter)] rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
         <div className="p-5">
            <div className="flex justify-between items-start mb-3">
               <NavLink to="/desc">
                  <span className="py-1 font-semibold text-base rounded-full hover:underline text-[var(--primary-color)]">
                  {note.title}
                  </span>
               </NavLink>

               <div className="flex items-center gap-2">
               {user?(
                  <>
                     {/* Edit Button */}
                     <button 
                        onClick={() => handleEdit(note.id)}
                        className="text-gray-600 hover:text-blue-600 focus:outline-none p-1 rounded-full hover:bg-blue-50"
                        aria-label="Edit note"
                     >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                     </button>
                     
                     {/* Delete Button */}
                     <button 
                        onClick={() => handleDelete(note.id)}
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
                     onClick={() => toggleFavorite(note.id)}
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
                  {note.author}
               </span>
               )}
               <span>{new Date(note.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
            </div>
         </div>
         </div>
      ))}
   </>
  );
};

export default NotesComponent;