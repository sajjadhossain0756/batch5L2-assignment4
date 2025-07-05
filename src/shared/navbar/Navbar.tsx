
import { Link, NavLink } from 'react-router'

const Navbar = () => {

  const navItem = <>
        <li><NavLink to='/add-article'>All Books</NavLink></li>
        <li><NavLink to='/all-articles'>Add Book</NavLink></li>
        <li><NavLink to='/my-articles'>Borrow Summary</NavLink></li>
    </>

  return (
    <div className="navbar px-5 dark:from-black dark:to-gray-700 md:px-10 bg-gradient-to-r from-teal-500 to-blue-500
         text-white lg:flex gap-5 py-5 sticky top-0 z-10 backdrop-blur-md bg-opacity-50">
            <div className="navbar-start">
                <Link to='/'><p className="font-bold text-xl">Library Management App</p></Link>
            </div>
            <div className="navbar-center ml-auto hidden lg:flex">
                <ul className="menu flex gap-5  menu-horizontal px-1 items-center">
                    {navItem}
                </ul>
            </div>
        </div>
  )
}

export default Navbar