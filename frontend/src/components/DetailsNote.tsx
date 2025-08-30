import { MdPerson } from 'react-icons/md';
import { FaTimes } from 'react-icons/fa';
import type { Note } from '../types/notes';
import type { User } from '../types/auth';

interface NoteModalProps {
  note: Note | null;
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
}

const DetailsModal: React.FC<NoteModalProps> = ({ note, isOpen, onClose, user }) => {
  if (!isOpen || !note) return null;
  const isUser = note.user === user!.fullName;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl font-bold text-[var(--primary-color)]">{note.title}</h2>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
              aria-label="Close modal"
            >
              <FaTimes/>  
            </button>
          </div>
          
          <div className="mb-6">
            <p className="text-gray-700 whitespace-pre-line">{note.content}</p>
          </div>
          
          <div className="flex items-center justify-between text-sm text-gray-500 border-t pt-4">
            <div className="flex items-center gap-2">
              {!isUser && (
                <>
                  <MdPerson className='w-5 h-5'/>
                  <span className="font-medium">{note.user}</span>
                </>
              )}
            </div>
            
            <div className="flex items-center gap-4">
              <span>{new Date(note.updatedAt!).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric',
                timeZone: 'UTC'
              })}</span>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsModal;