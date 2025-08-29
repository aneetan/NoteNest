import { BrowserRouter, Navigate, Route, Routes } from 'react-router'
import './App.css'
import Register from './pages/Register'
import Login from './pages/Login'
import ForgotPw from './pages/forgotpw/ForgotPw'
import ResetPw from './pages/forgotpw/ResetPw'
import OtpVerify from './pages/forgotpw/OtpVerify'
import UserLayout from './components/layout/UserLayout'
import Dashboard from './pages/Dashboard'
import MyNotes from './pages/MyNotes'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ToastContainer} from 'react-toastify';
import ProtectedRoutes from './security/ProtectedRoutes'

function App() {
  const queryClient = new QueryClient();
  return (
    <>
    <QueryClientProvider client={queryClient}>
      <ToastContainer/>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/register' element={<Register/>} />
          <Route path='/forgot-password' element={<ForgotPw/>} />
          <Route path='/verify-otp' element={<OtpVerify/>} />
          <Route path='/reset-password' element={<ResetPw/>} />

          <Route element={<ProtectedRoutes/>}>
            <Route element={<UserLayout/>}>
                <Route path="dashboard" element={<Dashboard/>} />
                <Route path="notes" element={<MyNotes/>} />
            </Route>
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
    </>
  )
}

export default App
