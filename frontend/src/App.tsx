import { BrowserRouter, Route, Routes } from 'react-router'
import './App.css'
import Register from './pages/Register'
import Login from './pages/Login'
import ForgotPw from './pages/forgotpw/ForgotPw'
import ResetPw from './pages/forgotpw/ResetPw'
import OtpVerify from './pages/forgotpw/OtpVerify'
import UserLayout from './components/layout/UserLayout'
import Dashboard from './pages/Dashboard'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/register' element={<Register/>} />
          <Route path='/forgot-password' element={<ForgotPw/>} />
          <Route path='/verify-otp' element={<OtpVerify/>} />
          <Route path='/reset-password' element={<ResetPw/>} />

          <Route element={<UserLayout/>}>
              <Route path="dashboard" element={<Dashboard/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
