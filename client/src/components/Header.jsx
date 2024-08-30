import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export const Header = () => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <header className="shadow-md shadow-green-200">
      <div className="flex justify-between items-center max-w-7xl mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-2xl flex flex-wrap">
            <span className="text-customNormGreen">Ham</span>
            <span className="text-customDarkGreen">Estate</span>
          </h1>
        </Link>
        <form className="rounded-lg border border-customDarkGreen focus-within:outline focus-within:outline-customDarkGreen transition-all duration-75 flex items-center p-3">
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent text-green-950 placeholder:text-customDarkGreen placeholder:opacity-40 border-none outline-none w-24 sm:w-64"
          />
          <FaSearch className="text-customNormGreen" />
        </form>

        <ul className="flex gap-4">
          <Link to="/">
            <li className="hidden sm:inline text-customDarkGreen hover:underline">
              Home
            </li>
          </Link>
          <Link to="/about">
            <li className="hidden sm:inline text-customDarkGreen hover:underline">
              About
            </li>
          </Link>

          <Link to="/profile">
            {currentUser ? (
              <img
                src={currentUser.avatar}
                alt="profile"
                className="rounded-full h-7 w-7"
              />
            ) : (
              <li className="text-customDarkGreen hover:underline">Sign In</li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
};
