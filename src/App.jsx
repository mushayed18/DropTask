import { Outlet } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import { Toaster } from 'react-hot-toast'

function App() {

  return (
    <div className='lg:max-w-[1440px] mx-auto'>
      <Toaster position="top-center" reverseOrder={false} />
      <Navbar/>
      <Outlet/>
    </div>
  )
}

export default App
