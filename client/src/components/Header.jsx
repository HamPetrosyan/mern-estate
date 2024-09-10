import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch, FaBars, FaTimes } from "react-icons/fa";

export const Header = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);

    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm", searchTerm);

    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  return (
    <header className="shadow shadow-customNormGreen">
      <div className="flex justify-between items-center max-w-screen-2xl mx-auto p-3 text-green-950">
        <Link to="/">
          <h1 className="font-bold text-base sm:text-xl flex flex-wrap">
            <span className="text-customNormGreen">Ham</span>
            <span className="text-customDarkGreen">Estate</span>
          </h1>
        </Link>

        <form
          onSubmit={handleSubmit}
          className="border outline-none border-customDarkGreen p-3 flex items-center focus-within:ring-1 ring-customDarkGreen rounded-full mx-1"
        >
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent focus:outline-none sm:w-72 placeholder:text-customDarkGreen placeholder:opacity-40"
          />
          <button>
            <FaSearch className="text-customDarkGreen" />
          </button>
        </form>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="sm:hidden block text-customDarkGreen"
        >
          {menuOpen ? <FaTimes size={25} /> : <FaBars size={25} />}
        </button>

        <ul className="hidden sm:flex sm:gap-4 items-center">
          <Link to="/">
            <li className="relative group list-none hidden sm:inline text-customDarkGreen">
              <span className="relative z-10">Home</span>
              <span className="absolute top-5 left-0 w-0 h-0.5 bg-customDarkGreen transition-all duration-300 group-hover:w-full"></span>
            </li>
          </Link>

          <Link to="/about">
            <li className="relative group list-none hidden sm:inline text-customDarkGreen">
              <span className="relative z-10">About</span>
              <span className="absolute top-5 left-0 w-0 h-0.5 bg-customDarkGreen transition-all duration-300 group-hover:w-full"></span>
            </li>
          </Link>

          <Link to="/profile">
            {currentUser ? (
              <img
                className="rounded-full h-8 w-8 object-cover ml-2"
                src={currentUser.avatar}
                alt=""
              />
            ) : (
              <li className="relative group list-none hidden sm:inline text-customDarkGreen">
                <span className="relative z-10">Sign in</span>
                <span className="absolute top-5 left-0 w-0 h-0.5 bg-customDarkGreen transition-all duration-300 group-hover:w-full"></span>
              </li>
            )}
          </Link>
        </ul>

        {menuOpen && (
          <ul className="sm:hidden absolute top-16 left-0 w-full bg-white shadow-lg shadow-customNormGreen pt-2">
            <Link to="/">
              <li
                className="p-2 border-b border-customNormGreen text-customNormGreen hover:bg-customNormGreen hover:text-white  transition-all duration-300"
                onClick={() => setMenuOpen(false)}
              >
                Home
              </li>
            </Link>

            <Link to="/about">
              <li
                className="p-2 border-b border-customNormGreen text-customNormGreen hover:bg-customNormGreen hover:text-white transition-all duration-300"
                onClick={() => setMenuOpen(false)}
              >
                About
              </li>
            </Link>

            <Link to="/profile">
              {currentUser ? (
                <li
                  className="p-2 text-customNormGreen hover:bg-customNormGreen hover:text-white transition-all duration-300"
                  onClick={() => setMenuOpen(false)}
                >
                  Profile
                </li>
              ) : (
                <li
                  className="p-2 text-customNormGreen hover:bg-customNormGreen hover:text-white transition-all duration-300"
                  onClick={() => setMenuOpen(false)}
                >
                  Sign in
                </li>
              )}
            </Link>
          </ul>
        )}
      </div>
    </header>
  );
};
