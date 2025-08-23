import { BrowserRouter, Route, Routes } from 'react-router'
import './App.css'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<div> Hello from NoteNest </div>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
