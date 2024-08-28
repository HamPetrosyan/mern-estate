import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className="shadow-md shadow-blue-300">
      <div className="flex justify-between items-center max-w-7xl mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-2xl flex flex-wrap">
            <span className="text-blue-700">Ham</span>
            <span className="text-blue-900">Estate</span>
          </h1>
        </Link>
        <form className="bg-blue-50 rounded-lg border-2 border-transparent focus-within:border-blue-900 transition duration-75 flex items-center p-3">
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent text-blue-950 placeholder:text-blue-800 placeholder:opacity-40 border-none outline-none w-24 sm:w-64"
          />
          <FaSearch className="text-blue-700" />
        </form>
        <ul className="flex gap-4">
          <Link to="/">
            <li className="hidden sm:inline text-blue-900 hover:underline">
              Home
            </li>
          </Link>
          <Link to="/about">
            <li className="hidden sm:inline text-blue-900 hover:underline">
              About
            </li>
          </Link>
          <Link to="/sign-in">
            <li className="text-blue-900 hover:underline">Sign In</li>
          </Link>
        </ul>
      </div>
    </header>
  );
};
