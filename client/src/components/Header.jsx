import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export const Header = () => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <header className="">
      <div className="flex justify-between items-center max-w-screen-2xl mx-auto p-3">
        <Link to={"/"}>
          <h1 className="font-bold text-sm sm:text-2xl flex flex-wrap select-none">
            <span className="text-customNormGreen">Ham</span>
            <span className="text-customDarkGreen">Estate</span>
          </h1>
        </Link>
        <form className="rounded-full border border-customDarkGreen focus-within:outline focus-within:outline-customDarkGreen flex items-center p-3">
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent text-green-950 placeholder:text-customDarkGreen placeholder:opacity-40 border-none outline-none w-24 sm:w-64"
          />
          <FaSearch className="text-customDarkGreen" />
        </form>

        <ul className="flex gap-4">
          <Link to={"/"}>
            <li className="relative text-customDarkGreen group">
              <span className="relative z-10">Home</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-customDarkGreen transition-all duration-300 group-hover:w-full"></span>
            </li>
          </Link>
          <Link to={"/about"}>
            <li className="relative text-customDarkGreen group">
              <span className="relative z-10">About</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-customDarkGreen transition-all duration-300 group-hover:w-full"></span>
            </li>
          </Link>

          <Link to={"/profile"}>
            {currentUser ? (
              <img
                src={currentUser.avatar}
                alt="profile"
                className="rounded-full h-7 w-7"
              />
            ) : (
              <li className="relative text-customDarkGreen group">
                <span className="relative z-10">Sign In</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-customDarkGreen transition-all duration-300 group-hover:w-full"></span>
              </li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
};
