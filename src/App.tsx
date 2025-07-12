
import { Outlet } from 'react-router'
import Navbar from './shared/navbar/Navbar'
import { Toaster } from 'sonner'
import Footer from './shared/footer/Footer'

function App() {


  return (
    <div className="flex flex-col min-h-screen">
      <Toaster position="top-center" />
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default App
