import { useSelector } from "react-redux";

export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="max-w-md mx-auto px-3">
      <h1 className="text-center text-3xl text-green-950 font-semibold my-7">
        Profile
      </h1>

      <form autoComplete="off" className="flex flex-col gap-3">
        <img
          src={currentUser.avatar}
          alt="profile"
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mb-10"
        />
        <input
          type="text"
          id="username"
          placeholder="Username"
          className="border border-customDarkGreen focus:outline-customDarkGreen placeholder:text-customDarkGreen placeholder:opacity-40 p-3 rounded-full"
        />
        <input
          type="email"
          id="email"
          placeholder="Email"
          className="border border-customDarkGreen focus:outline-customDarkGreen placeholder:text-customDarkGreen placeholder:opacity-40 p-3 rounded-full"
        />
        <input
          type="password"
          id="password"
          placeholder="Password"
          className="border border-customDarkGreen focus:outline-customDarkGreen placeholder:text-customDarkGreen placeholder:opacity-40 p-3 rounded-full"
        />
        <button className="bg-green-900 text-white px-8 py-3 rounded-full transition-all duration-100 hover:opacity-90 disabled:opacity-80 uppercase">
          Update
        </button>
      </form>
      <div className="flex justify-between pt-2">
        <span className="text-green-950 hover:underline cursor-pointer">
          Delete Account
        </span>
        <span className="text-customDarkGreen hover:underline cursor-pointer">
          Sign Out
        </span>
      </div>
    </div>
  );
}
