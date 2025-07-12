
import { ModeToggle } from '@/components/mode-toggler'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { MenuIcon } from 'lucide-react'
import { Link, NavLink } from 'react-router'

const Navbar = () => {

  const navItem = <>
    <li><NavLink to='/'>All Books</NavLink></li>
    <li><NavLink to='/create-book'>Add Book</NavLink></li>
    <li><NavLink to='/borrow-summary'>Borrow Summary</NavLink></li>
    <li><ModeToggle></ModeToggle></li>
  </>

  return (
    <div className="navbar px-5 dark:from-gray-800 dark:to-gray-700 md:px-10 bg-gradient-to-r from-teal-500 to-blue-500
         text-white items-center flex gap-5 py-5 sticky top-0 z-10 backdrop-blur-md bg-opacity-50">
      <div className="navbar-start">
        <Link to='/'><p className="font-bold text-xl">Library Management App</p></Link>
      </div>
      <div className="navbar-center ml-auto hidden lg:flex">
        <ul className="menu flex gap-5  menu-horizontal px-1 items-center">
          {navItem}
        </ul>
      </div>
      {/* Mobile Navigation (visible on small screens) */}
      <div className="flex-1 flex items-center justify-end md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
            >
              <MenuIcon className="h-5 w-5" />
              <span className="sr-only">Toggle mobile menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] dark:from-gray-500 dark:to-gray-800 bg-gradient-to-t from-teal-500 to-teal-800 pl-3 sm:w-[400px]">
            <nav className="flex flex-col gap-4 py-6">
              <Link
                to="/"
                className="text-lg font-medium hover:text-primary"
              >
                All Books
              </Link>
              <Link
                to="/create-book"
                className="text-lg font-medium hover:text-primary"
              >
                Add Book
              </Link>
              <Link
                to="/borrow-summary"
                className="text-lg font-medium hover:text-primary"
              >
                Borrow Summary
              </Link>
              {/* Add more mobile links */}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  )
}

export default Navbar