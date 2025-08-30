import { FaPlus } from "react-icons/fa"
import NotesComponent from "../components/NotesComponent"
import { useState } from "react";
import AddNoteModal from "../components/AddNoteModal";
import { useQuery } from "@tanstack/react-query";
import type { AxiosError, AxiosResponse } from "axios";
import type { Note } from "../types/notes";
import { viewNotes } from "../api/note.api";
import { getUserFromToken } from "../utils/token.utils";

const Dashboard = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const {data, isLoading, error} = useQuery<AxiosResponse, AxiosError, Note[]>({
      queryKey: ['notes'],
      queryFn: () => viewNotes(),
    })
  const notes = (data || []).sort((a, b) => {
    return new Date(b.updatedAt!).getTime() - new Date(a.updatedAt!).getTime();
  });
  const user = getUserFromToken(localStorage.getItem("token")!);

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
          <h1 className="text-3xl font-bold text-gray-800 mb-4"> All Notes </h1>
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

export default Dashboard
