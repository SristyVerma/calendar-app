import {Link} from "react-router-dom";
import stepsync from '../../assets/stepsync.png'
import React, { useState } from "react";
import {navlinks} from '../../api/constant'
import { useDispatch, useSelector } from 'react-redux';
import { signOutUser, selectAuth } from '../../Redux/authSlice';
import { FiMenu } from "react-icons/fi";
import { IoCloseOutline } from "react-icons/io5";
import { MdAccountBox } from "react-icons/md";

export default function Navbar() {
  const [isSideMenuOpen, setMenu] = useState(false);
  const [activeTab, setActiveTab] = useState("Home");
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector(selectAuth);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSignOut = () => {
    dispatch(signOutUser());
  };
  const handleSetActiveTab = (title) => {
    setActiveTab(title);
    setMenu(false); // Close menu if it's open
  };

  const filteredNavLinks = navlinks.filter(link => {
    if (user) {
      return true;
    }
    return !['My Calendar', 'Events', 'Share Calendar', 'Vendor'].includes(link.title);
  });

  

  return (
    <main>
    <nav className="flex justify-between px-8 items-center py-6">
      <div className="flex items-center gap-8">
        <section className="flex items-center gap-4">
          <FiMenu
            onClick={() => setMenu(true)}
            className="text-3xl cursor-pointer lg:hidden"
          />
          <Link to="/" className="text-4xl font-mono">
            <img src={stepsync} className="w-[100px]" alt="stepsync logo" />
          </Link>
        </section>
        <div className="hidden lg:flex items-center gap-4">
        {filteredNavLinks.map((link, index) => (
          <Link
            key={index}
            to={link.url}
            className={`font-bold ${activeTab === link.title ? 'text-blue-600' : 'text-gray-800'}`}
            onClick={() => handleSetActiveTab(link.title)}
          >
            {link.title}
          </Link>
        ))}
      </div>
      </div>

      <div className={`fixed h-full z-10 w-screen lg:hidden bg-black/50 backdrop-blur-sm top-0 right-0 transition-all ${isSideMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <section className="text-black bg-white flex-col absolute left-0 top-0 h-screen p-8 gap-8 z-50 w-56 flex">
          <IoCloseOutline
            onClick={() => setMenu(false)}
            className="mt-0 mb-8 text-3xl cursor-pointer"
          />
          {filteredNavLinks.map((d, i) => (
            <Link key={i} className="font-bold" to={d.url}>
              {d.title}
            </Link>
          ))}
        </section>
      </div>

      <section className="flex items-center gap-4">
        <div className="relative inline-block text-left">
          <div>
            <button
              type="button"
              className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-blue-600 text-sm font-medium text-white hover:bg-blue-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              id="menu-button"
              aria-expanded="true"
              aria-haspopup="true"
              onClick={toggleDropdown}
            >
              {user ? `Hi! ${user.email.split('@')[0]}` : <MdAccountBox className="w-full"/>}
            </button>
          </div>

          {isOpen && (
            <div
              className="origin-top-right z-10 absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="menu-button"
            >
              <div className="w-ful" role="none">
                {user ? (
                  <button
                    onClick={handleSignOut}
                    className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-200  border-red-300 w-full text-left"
                    role="menuitem"
                    id="menu-item-2"
                  >
                    Sign Out
                  </button>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-200 w-full text-left " 
                      role="menuitem"
                      id="menu-item-0"
                    >
                      Login
                    </Link>
                    <Link
                      to="/signup"
                      className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-200 w-full text-left"
                      role="menuitem"
                      id="menu-item-1"
                    >
                      Register
                    </Link>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </section>
    </nav>
    <hr />
  </main>
  );
}