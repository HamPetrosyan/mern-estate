import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  clearError,
  signInFailure,
  signInStart,
  signInSuccess,
} from "../redux/user/userSlice";
import { OAuth } from "../components/OAuth";

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { error, loading } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });

    if (error) {
      dispatch(clearError());
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());

      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }

      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <>
      <div className="flex flex-col justify-end min-h-[50vh] max-w-[400px] m-auto px-3">
        <h1 className="text-3xl text-center font-semibold text-customDarkGreen my-7">
          Sign In
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
            {loading ? "Loading..." : "Sign In"}
          </button>
          <OAuth />
        </form>
        <div className="flex gap-2 pt-2">
          <p className="text-green-950">Don&apos;t have an account?</p>
          <Link to={"/sign-up"}>
            <span className="text-customDarkGreen hover:underline hover:underline-offset-2">
              Sign Up
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
