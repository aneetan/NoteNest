import NotesComponent from "../components/NotesComponent"

const Dashboard = () => {
  return (
    <>
      <div className="container w-full h-screen p-6 rounded-xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">My Notes</h1>
        <div className="md:grid grid-cols-3 gap-4 justify-between flex flex-col">
            <NotesComponent/>
        </div>
      </div>
    </>
  )
}

export default Dashboard
