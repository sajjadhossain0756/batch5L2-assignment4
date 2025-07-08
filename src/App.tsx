
import { Outlet } from 'react-router'
import Navbar from './shared/navbar/Navbar'
import { Toaster } from 'sonner'

function App() {
  

  return (
    <>
       <Toaster position="top-center" />
       <Navbar></Navbar>
       <Outlet></Outlet>
    </>
  )
}

export default App
