import { useState } from "react";
import { AiOutlineHome } from "react-icons/ai";
import { FaBars, FaTasks, FaTimes } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { MdLogin } from "react-icons/md";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Toggle sidebar
  const toggleSidebar = () => setIsOpen(!isOpen);

  // Close sidebar when a link is clicked
  const closeSidebar = () => setIsOpen(false);

  const navlinks = (
    <>
      <NavLink to={"/"} onClick={closeSidebar}>
        <button className="flex gap-2 cursor-pointer">
          <AiOutlineHome size={24} />
          Home
        </button>
      </NavLink>
      <NavLink to={"/"} onClick={closeSidebar}>
        <button className="flex gap-2 items-center cursor-pointer">
          <IoMdAdd />
          Add Task
        </button>
      </NavLink>
      <NavLink to={"/"} onClick={closeSidebar}>
        <button className="flex gap-2 items-center cursor-pointer">
          <FaTasks />
          Manage Task
        </button>
      </NavLink>
      <NavLink className={'block lg:hidden'} to={"/"} onClick={closeSidebar}>
        <button className="flex gap-2 items-center cursor-pointer">
          <MdLogin />
          Login
        </button>
      </NavLink>
    </>
  );

  return (
    <>
      {/* Navbar */}
      <nav className="bg-slate-100 py-4 px-8 flex justify-between items-center fixed top-0 w-full lg:max-w-[1440px] mx-auto z-50">
        {/* Logo */}
        <div>
          <h1 className={`font-bold text-2xl text-green-500`}>DropTask</h1>
        </div>

        {/* Desktop NavLinks (Hidden on small & medium screens) */}
        <div className="hidden lg:flex gap-8">{navlinks}</div>

        {/* Login NavLink (Hidden on small & medium screens) */}
        <div className="hidden lg:block">
          <NavLink to={"/"} onClick={closeSidebar}>
            <button className="flex gap-2 items-center cursor-pointer">
              <MdLogin />
              Login
            </button>
          </NavLink>
        </div>

        {/* Menu Button for Small & Medium Screens */}
        <div className="lg:hidden">
          <button onClick={toggleSidebar}>
            {isOpen ? (
              <FaTimes className="text-2xl text-primary" />
            ) : (
              <FaBars className="text-2xl text-primary" />
            )}
          </button>
        </div>
      </nav>

      {/* Sidebar (for small & medium screens) */}
      <div
        className={`fixed top-16 left-0 w-full bg-white shadow-lg transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-50`}
      >
        {/* Sidebar NavLinks */}
        <div className="flex flex-col items-center gap-6 p-6 text-lg">
          {navlinks}
        </div>
      </div>

      {/* Overlay when sidebar is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40"
          onClick={closeSidebar}
        />
      )}
    </>
  );
};

export default Navbar;
