import { FaPlus } from "react-icons/fa"
import NotesComponent from "../components/NotesComponent"
import { useState } from "react";
import AddNoteModal from "../components/AddNoteModal";

const Dashboard = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const openAddModal = () => {
    setIsAddModalOpen(true);
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);
  }
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
            <NotesComponent user={false}/>
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
