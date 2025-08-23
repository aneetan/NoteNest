import { BrowserRouter, Route, Routes } from 'react-router'
import './App.css'
import Register from './pages/Register'
import Login from './pages/Login'
import ForgotPw from './pages/forgotpw/ForgotPw'
import ResetPw from './pages/forgotpw/ResetPw'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/register' element={<Register/>} />
          <Route path='/forgot-password' element={<ForgotPw/>} />
          <Route path='/reset-password' element={<ResetPw/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
