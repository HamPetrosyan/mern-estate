import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.success === false) {
        setError(data.message);
        setLoading(false);
        return;
      }
      setLoading(false);
      setError(null);
      navigate("/sign-in");
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <>
      <div className="flex flex-col justify-end min-h-[50vh] max-w-[400px] m-auto px-3">
        <h1 className="text-3xl text-center font-semibold text-customDarkGreen my-7">
          Sign Up
        </h1>
        <form
          autoComplete="off"
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 text-green-950"
        >
          <input
            type="text"
            id="username"
            placeholder="Username"
            onChange={handleChange}
            className="border border-customDarkGreen focus:outline-customDarkGreen placeholder:text-customDarkGreen placeholder:opacity-40 p-3 rounded-full w-full"
          />
          <input
            type="email"
            id="email"
            placeholder="Email"
            onChange={handleChange}
            className="border border-customDarkGreen focus:outline-customDarkGreen placeholder:text-customDarkGreen placeholder:opacity-40 p-3 rounded-full w-full"
          />
          <input
            type="password"
            id="password"
            placeholder="Password"
            onChange={handleChange}
            className="border border-customDarkGreen focus:outline-customDarkGreen placeholder:text-customDarkGreen placeholder:opacity-40 p-3 rounded-full w-full"
          />
          <button
            disabled={loading}
            className={`bg-green-900 text-white px-8 py-3 rounded-full transition-all duration-100 hover:opacity-90 disabled:opacity-80 uppercase ${
              loading ? "cursor-not-allowed" : "cursor-pointer"
            }`}
          >
            {loading ? "Loading..." : "Sign Up"}
          </button>
        </form>
        <div className="flex gap-2 pt-2">
          <p className="text-green-950">Have an account?</p>
          <Link to={"/signin"}>
            <span className="text-customDarkGreen hover:underline hover:underline-offset-2">
              Sign In
            </span>
          </Link>
        </div>
      </div>
      <div className="max-w-[400px] m-auto px-3">
        {error && <p className="text-red-500 mt-3">{error}</p>}
      </div>
    </>
  );
}
