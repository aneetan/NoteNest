import { useState } from 'react';
import { MdPerson } from 'react-icons/md';

interface Note {
  id: string;
  content: string;
  author: string;
  title: string;
  date: string;
  isFavorited: boolean;
}

const NotesComponent = () => {
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

  return (
   <>
      {notes.map(note => (
         <div key={note.id} className="bg-[var(--primary-lighter)] rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
         <div className="p-5">
            <div className="flex justify-between items-start mb-3">
               <span className="py-1 font-semibold text-base rounded-full">
               {note.title}
               </span>
               <button 
               onClick={() => toggleFavorite(note.id)}
               className="text-gray-400 hover:text-yellow-500 focus:outline-none"
               aria-label={note.isFavorited ? "Remove from favorites" : "Add to favorites"}
               >
               {note.isFavorited ? (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-yellow-500">
                     <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                  </svg>
               ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                     <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                  </svg>
               )}
               </button>
            </div>
            
            <p className="text-gray-700 mb-4 line-clamp-3">
               {note.content}
            </p>
            
            <div className="flex items-center justify-between text-sm text-gray-500">
               <span className="flex flex-row gap-2 font-medium items-end">
                  <MdPerson className='w-5 h-5'/>
                  {note.author}
               </span>
               <span>{new Date(note.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
            </div>
         </div>
         </div>
      ))}
   </>
  );
};

export default NotesComponent;