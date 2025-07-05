
import { Outlet } from 'react-router'
import Navbar from './shared/navbar/Navbar'

function App() {
  

  return (
    <>
       <Navbar></Navbar>
       <Outlet></Outlet>
    </>
  )
}

export default App
