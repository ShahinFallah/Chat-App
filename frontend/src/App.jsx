import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import SignUp from './pages/signUp/SignUp'
import { Toaster } from 'react-hot-toast'
import { useAuthContext } from './context/AuthContext'

function App() {
  const { userAuth } = useAuthContext()

  return (
    <>
      <div className='flex bg-base-300 h-screen justify-center items-center'>
        <Routes>
          <Route path='/' element={!userAuth ? <Navigate to='login' /> : <Home />} />
          <Route path='login' element={userAuth ? <Navigate to='/' /> : <Login />} />
          <Route path='signup' element={userAuth ? <Navigate to='/' /> : <SignUp />} />
        </Routes>

        <div><Toaster /></div>
      </div>
    </>
  )
}

export default App
