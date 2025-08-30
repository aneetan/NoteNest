import { useState } from "react";
import NotesComponent from "../components/NotesComponent"
import { FaPlus } from "react-icons/fa";
import AddNoteModal from "../components/AddNoteModal";
import { getUserFromToken } from "../utils/token.utils";
import { viewNotesByUser } from "../api/note.api";
import { useQuery } from "@tanstack/react-query";
import type { AxiosError, AxiosResponse } from "axios";
import type { Note } from "../types/notes";

const MyNotes = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const user = getUserFromToken(localStorage.getItem("token")!);
  const {data, isLoading, error} = useQuery<AxiosResponse, AxiosError, Note[]>({
      queryKey: ['notes', user?.id],
      queryFn: () => {
        if (user?.id) {
          return viewNotesByUser(user.id);
        }
        return Promise.resolve({ data: [] } as AxiosResponse);
      },
  })

  const notes = (data || []).sort((a, b) => {
    return new Date(b.updatedAt!).getTime() - new Date(a.updatedAt!).getTime();
  });
  
    const openAddModal = () => {
      setIsAddModalOpen(true);
    };
  
    const closeAddModal = () => {
      setIsAddModalOpen(false);
    }

    if (isLoading) return <div>Loading notes...</div>;
   if (error) return <div>Error: {error.message}</div>;
  return (
    <>
      <div className="container w-full h-screen p-6 rounded-xl">
        <div className="flex flex-col md:flex-row justify-between items-center mb-4">
          <h1 className="text-3xl font-bold text-gray-800 mb-4"> My Notes </h1>
          <button 
          onClick={openAddModal}
          className="flex items-center gap-2 px-4 py-2 border-none bg-[var(--primary-color)]
          rounded-xl text-white font-semibold">
            <FaPlus/>
            Add Notes
          </button>
        </div>
        <div className="md:grid grid-cols-3 gap-4 justify-between flex flex-col">
            <NotesComponent notes={notes} user={user}/>
        </div>
      </div>
        <AddNoteModal 
        isOpen={isAddModalOpen}
        onClose={closeAddModal}
        isEdit= {false}
      />
    </>
  )
}

export default MyNotes
