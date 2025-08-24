
const Dashboard = () => {
  return (
    <>
      <div className="container w-full h-screen p-6 rounded-xl">
        <div className="md:grid grid-cols-3 gap-4 justify-between flex flex-col">
            <div className="h-[200px] bg-[var(--primary-lighter)] p-4 rounded-xl">1</div>
            <div className="h-[200px] bg-[var(--primary-lighter)] p-4 rounded-xl">2</div>
            <div className="h-[200px] bg-[var(--primary-lighter)] p-4 rounded-xl">3</div>
            <div className="h-[200px] bg-[var(--primary-lighter)] p-4 rounded-xl">4</div>
        </div>
      </div>
    </>
  )
}

export default Dashboard
