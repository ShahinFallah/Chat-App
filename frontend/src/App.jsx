import { Routes, Route } from 'react-router-dom'
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import SignUp from './pages/signUp/SignUp'

function App() {
  return (
    <>
      <div className='flex bg-base-300 h-screen justify-center items-center'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='login' element={<Login />} />
          <Route path='signup' element={<SignUp />} />
        </Routes>
      </div>
    </>
  )
}

export default App
