import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export const Header = () => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <header className="">
      <div className="flex justify-between items-center max-w-screen-2xl mx-auto p-3 text-green-950">
        <Link to="/">
          <h1 className="font-bold text-base sm:text-xl flex flex-wrap">
            <span className="text-customNormGreen">Ham</span>
            <span className="text-customDarkGreen">Estate</span>
          </h1>
        </Link>

        <form className="border outline-none border-customDarkGreen p-3 flex items-center focus-within:ring-1 ring-customDarkGreen rounded-full ml-2">
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none sm:w-72 w-32 placeholder:text-customDarkGreen placeholder:opacity-40"
          />
          <button>
            <FaSearch className="text-customDarkGreen" />
          </button>
        </form>

        <ul className="flex sm:gap-4">
          <Link to="/">
            <li className="relative group list-none hidden sm:inline text-customDarkGreen">
              <span className="relative z-10">Home</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-900 transition-all duration-300 group-hover:w-full"></span>
            </li>
          </Link>
          <Link to="/about">
            <li className="relative group list-none hidden sm:inline text-customDarkGreen">
              <span className="relative z-10">About</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-900 transition-all duration-300 group-hover:w-full"></span>
            </li>
          </Link>
          <Link to="/profile">
            {currentUser ? (
              <img
                className="rounded-full h-8 w-8 object-cover ml-2"
                src={currentUser.avatar}
                alt="profile"
              />
            ) : (
              <li className=" text-slate-700 hover:underline"> Sign in</li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
};
