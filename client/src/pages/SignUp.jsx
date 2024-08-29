import { Link } from "react-router-dom";

export default function SignUp() {
  return (
    <div className="flex flex-col justify-center min-h-[70vh] max-w-[400px] m-auto px-3">
      <h1 className="text-3xl text-center font-semibold text-customDarkGreen my-7">
        Sign Up
      </h1>
      <form className="flex flex-col gap-4 text-green-950">
        <input
          type="text"
          id="username"
          placeholder="Username"
          className="border border-customDarkGreen focus:outline-customDarkGreen placeholder:text-customDarkGreen placeholder:opacity-40 p-3 rounded-full w-full"
        />
        <input
          type="email"
          id="email"
          placeholder="Email"
          className="border border-customDarkGreen focus:outline-customDarkGreen placeholder:text-customDarkGreen placeholder:opacity-40 p-3 rounded-full w-full"
        />
        <input
          type="password"
          id="password"
          placeholder="Password"
          className="border border-customDarkGreen focus:outline-customDarkGreen placeholder:text-customDarkGreen placeholder:opacity-40 p-3 rounded-full w-full"
        />
        <button className="bg-green-900 text-white px-8 py-3 rounded-full transition-all duration-100 hover:opacity-90 disabled:opacity-80 uppercase">
          Sign Up
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
  );
}
