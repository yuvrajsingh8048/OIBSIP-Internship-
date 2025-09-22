import React, { useState } from "react";
import assest from "../assets/assest";
import { FaSearch, FaRegUserCircle, FaBars, FaTimes } from "react-icons/fa";
import { FaBasketShopping } from "react-icons/fa6";
import { IoIosLogOut } from "react-icons/io";
import { IoBag } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import { usePizza } from "../context/StoreContext";

const NavBar = ({ setShowLogin }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const { cart, token, setToken } = usePizza();
  const navigate = useNavigate()

  const logoutHandler = () => {
    localStorage.removeItem("token")
    setToken("")
    navigate('/')
  }

  return (
    <div className="flex justify-between items-center px-5 py-3 shadow-md relative bg-white">
      {/* Logo */}
      <Link to="/">
        <img
          src={assest.logo}
          alt="logo"
          className="w-[120px] cursor-pointer z-20"
        />
      </Link>

      {/* Desktop Menu */}
      <ul className="hidden md:flex list-none gap-6 text-lg text-[#49557e] font-serif">
        <Link to="/">
          <li className="hover:text-red-500 cursor-pointer">Home</li>
        </Link>
        <ScrollLink to="menu" smooth duration={500}>
          <li className="hover:text-red-500 cursor-pointer">Menu</li>
        </ScrollLink>
        <ScrollLink to="mobile-app" smooth duration={500}>
          <li className="hover:text-red-500 cursor-pointer">Mobile App</li>
        </ScrollLink>
        <ScrollLink to="contact-us" smooth duration={500}>
          <li className="hover:text-red-500 cursor-pointer">Contact Us</li>
        </ScrollLink>
      </ul>

      {/* Desktop Right Section */}
      <div className="hidden md:flex items-center gap-6 text-xl">
        <FaSearch className="cursor-pointer" />
        <Link to="/cart">
          <div className="relative">
            <FaBasketShopping className="cursor-pointer" />
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-2 h-3 w-3 bg-red-500 rounded-full"></span>
            )}
          </div>
        </Link>

        {token ? (
          <div className="relative group">
            <FaRegUserCircle
              onClick={() => setDropDown(!dropDown)}
              className="cursor-pointer text-2xl text-gray-700"
            />
            {dropDown && (
              <div className=" absolute top-10 -right-3 bg-white border border-red-700 text-sm rounded-md px-4 py-2 shadow-md">
                <div className="flex items-center gap-2 cursor-pointer hover:text-red-600">
                  <IoBag /> <span>Orders</span>
                </div>
                <hr className="h-[2px] my-1 bg-gray-300"/>
                <div
                  className="flex items-center gap-2 cursor-pointer hover:text-red-600"
                  onClick={logoutHandler}
                >
                  <IoIosLogOut /> <span>Logout</span>
                </div>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={() => setShowLogin(true)}
            className="bg-white border border-red-700 text-red-700 px-6 py-1 rounded-full text-lg transition hover:bg-red-700 hover:text-white"
          >
            Sign In
          </button>
        )}
      </div>

      {/* Mobile Menu Toggle */}
      <div className="md:hidden z-20">
        {menuOpen ? (
          <FaTimes
            size={24}
            className="cursor-pointer"
            onClick={() => setMenuOpen(false)}
          />
        ) : (
          <FaBars
            size={24}
            className="cursor-pointer"
            onClick={() => setMenuOpen(true)}
          />
        )}
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-3/4 bg-white shadow-md flex flex-col items-center gap-6 py-10 transform transition-transform duration-300 ease-in-out md:hidden ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <ul className="flex flex-col text-lg text-[#49557e] font-serif items-center gap-4">
          <Link to="/" onClick={() => setMenuOpen(false)}>
            <li>Home</li>
          </Link>
          <ScrollLink
            to="menu"
            smooth
            duration={500}
            onClick={() => setMenuOpen(false)}
          >
            <li>Menu</li>
          </ScrollLink>
          <ScrollLink
            to="mobile-app"
            smooth
            duration={500}
            onClick={() => setMenuOpen(false)}
          >
            <li>Mobile App</li>
          </ScrollLink>
          <ScrollLink
            to="contact-us"
            smooth
            duration={500}
            onClick={() => setMenuOpen(false)}
          >
            <li>Contact Us</li>
          </ScrollLink>
        </ul>

        <div className="flex items-center gap-6 text-xl">
          <FaSearch className="cursor-pointer" />
          <Link to="/cart" onClick={() => setMenuOpen(false)}>
            <div className="relative">
              <FaBasketShopping className="cursor-pointer" />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-2 h-3 w-3 bg-red-500 rounded-full"></span>
              )}
            </div>
          </Link>
        </div>

        {token ? (
          <div className="relative group">
            <FaRegUserCircle
              onClick={() => setDropDown(!dropDown)}
              className="cursor-pointer text-2xl text-yellow-700"
            />
            {dropDown && (
              <div className=" absolute top-10 -right-10 bg-white border border-red-700 text-sm rounded-md px-4 py-2 shadow-md">
                <div className="flex items-center gap-2 cursor-pointer hover:text-red-600">
                  <IoBag /> <span>Orders</span>
                </div>
                <hr className="h-[2px] my-1 bg-gray-300"/>
                <div
                  className="flex items-center gap-2 cursor-pointer hover:text-red-600"
                  onClick={logoutHandler}
                >
                  <IoIosLogOut /> <span>Logout</span>
                </div>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={() => setShowLogin(true)}
            className="bg-white border border-red-700 text-red-700 px-6 py-1 rounded-full text-lg transition hover:bg-red-700 hover:text-white"
          >
            Sign In
          </button>
        )}
      </div>
    </div>
  );
};

export default NavBar;
