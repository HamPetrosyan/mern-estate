import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

import { app } from "../firebase";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signOutStart,
  signOutSuccess,
  signOutFailure,
} from "../redux/user/userSlice";

export default function Profile() {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerce, setFilePerce] = useState(0);
  const [formData, setFormData] = useState({
    username: currentUser.username,
    email: currentUser.email,
    password: "",
    avatar: currentUser.avatar,
  });
  const [message, setMessage] = useState({ text: "", type: "" });
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [showListingsError, setShowListingsError] = useState(false);
  const [userListings, setUserListings] = useState([]);
  const fileRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Handle progress updates
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerce(Math.round(progress));
        setMessage({ text: "", type: "" });
      },
      (error) => {
        // Handle errors
        setFilePerce(0);
        setMessage({ text: "Error Image Upload", type: "error" });
        setTimeout(() => setMessage({ text: "", type: "" }), 3000);
      },
      () => {
        // Handle successful completion
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          setFormData({ ...formData, avatar: downloadUrl });
          setFilePerce(0);
          setMessage({ text: "Image successfully uploaded!", type: "success" });
          setTimeout(() => setMessage({ text: "", type: "" }), 3000);
        });
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const isFormChanged = () => {
    const isDataChanged =
      formData.username !== currentUser.username ||
      formData.email !== currentUser.email ||
      (formData.password && formData.password.trim().length > 0) ||
      formData.avatar !== currentUser.avatar;
    return isDataChanged;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.email) {
      setMessage({
        text: "Username and email are required",
        type: "error",
      });
      return;
    }

    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
      dispatch(updateUserFailure(null));
      setMessage({ text: "", type: "" });
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());

      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }

      dispatch(deleteUserSuccess());
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleSignOut = async () => {
    try {
      dispatch(signOutStart());

      const res = await fetch("/api/auth/signout");

      const data = await res.json();

      if (data.success === false) {
        dispatch(signOutFailure(data.message));
        return;
      }

      dispatch(signOutSuccess());
    } catch (error) {
      dispatch(signOutFailure(error.message));
    }
  };

  const handleShowListings = async () => {
    try {
      setShowListingsError(false);

      const res = await fetch(`/api/user/listings/${currentUser._id}`);
      const data = await res.json();

      if (data.success === false || data.length === 0) {
        setShowListingsError(true);
        return;
      }

      setUserListings(data);
    } catch (error) {
      setShowListingsError(true);
    }
  };

  const handleListingDelete = async (listingId) => {
    try {
      const res = await fetch(`/api/listing/delete/${listingId}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (data.success === false) {
        console.log(data.message);
        return;
      }

      setUserListings((prev) =>
        prev.filter((listing) => listing._id !== listingId)
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto px-3">
      <h1 className="text-center text-3xl text-green-950 font-semibold my-7 mb-16">
        Profile
      </h1>

      <form
        onSubmit={handleSubmit}
        autoComplete="off"
        className="flex flex-col gap-3"
      >
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
        />
        <img
          onClick={() => fileRef.current.click()}
          src={formData.avatar || currentUser.avatar}
          alt=""
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mb-5"
        />

        <p className="text-sm self-center">
          {filePerce > 0 && filePerce < 100 ? (
            <span className="text-customNormGreen">
              {`Uploading ${filePerce}%`}
            </span>
          ) : (
            message.text && (
              <span
                className={
                  message.type === "error"
                    ? "text-red-700"
                    : "text-customNormGreen"
                }
              >
                {message.text}
              </span>
            )
          )}
        </p>

        <input
          type="text"
          id="username"
          placeholder="Username"
          defaultValue={currentUser.username}
          onChange={handleChange}
          className="border border-customDarkGreen focus:outline-customDarkGreen placeholder:text-customDarkGreen placeholder:opacity-40 p-3 rounded-full"
        />
        <input
          type="email"
          id="email"
          placeholder="Email"
          defaultValue={currentUser.email}
          onChange={handleChange}
          className="border border-customDarkGreen focus:outline-customDarkGreen placeholder:text-customDarkGreen placeholder:opacity-40 p-3 rounded-full"
        />
        <input
          type="password"
          id="password"
          placeholder="Password"
          onChange={handleChange}
          className="border border-customDarkGreen focus:outline-customDarkGreen placeholder:text-customDarkGreen placeholder:opacity-40 p-3 rounded-full"
        />

        <button
          disabled={!isFormChanged() || loading}
          className={`bg-customDarkGreen text-white px-8 py-3 rounded-full transition-all duration-100 hover:opacity-90 disabled:opacity-80 uppercase ${
            !isFormChanged() ? "cursor-not-allowed" : "cursor-pointer"
          }`}
        >
          {loading ? "Loading..." : "Update"}
        </button>

        <Link
          to={"/create-listing"}
          className="bg-customNormGreen text-center text-white px-8 py-3 rounded-full transition-all duration-100 hover:opacity-90 disabled:opacity-80 uppercase"
        >
          Create Listing
        </Link>
      </form>

      <div className="flex justify-between pt-2">
        <span
          onClick={handleDeleteUser}
          className="text-green-950 hover:underline cursor-pointer"
        >
          Delete Account
        </span>
        <span
          onClick={handleSignOut}
          className="text-customDarkGreen hover:underline cursor-pointer"
        >
          Sign Out
        </span>
      </div>

      <p className="my-4 text-red-700">{error ? error : ""}</p>

      <p className="my-4 text-customNormGreen">
        {updateSuccess ? "User is updated successfully!" : ""}
      </p>

      <div className="">
        <button
          onClick={handleShowListings}
          className="text-customNormGreen w-full underline underline-offset-4"
        >
          Show Listings
        </button>

        {showListingsError && (
          <p className="text-green-950 mt-5 text-center">
            There are no listings available.
          </p>
        )}
      </div>

      <p className="text-red-700 mt-5">{showListingsError}</p>

      {userListings && userListings.length > 0 && (
        <div className="flex flex-col gap-4 text-green-950">
          <h1 className="text-center mt-7 text-2xl font-semibold">
            Your Listings
          </h1>

          {userListings.map((listing) => {
            const truncatedName =
              listing.name.length > 10
                ? `${listing.name.slice(0, 10)}...`
                : listing.name;

            return (
              <div
                key={listing._id}
                className="border border-customBorderGreen rounded-lg p-3 flex flex-col gap-4"
              >
                <h2 className="text-lg font-semibold break-words text-green-900">
                  {listing.name}
                </h2>

                {listing.imageUrls.length === 1 ? (
                  <div className="flex items-center">
                    <img
                      src={listing.imageUrls[0]}
                      alt="listing cover"
                      className="h-24 w-24 object-cover rounded-lg"
                    />

                    <div className="flex justify-between items-center w-full pl-3 text-customDarkGreen">
                      <Link to={`/listing/${listing._id}`}>
                        <li className="relative group list-none font-semibold ">
                          <span className="relative z-10">{truncatedName}</span>
                          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-900 transition-all duration-300 group-hover:w-full"></span>
                        </li>
                      </Link>

                      <div className="flex flex-col items-center">
                        <button
                          onClick={() => handleListingDelete(listing._id)}
                          className="text-red-700 uppercase"
                        >
                          Delete
                        </button>
                        <Link to={`/update-listing/${listing._id}`}>
                          <button className="text-customNormGreen uppercase">
                            Edit
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex gap-2 overflow-x-auto">
                    {listing.imageUrls.map((url, index) => (
                      <img
                        key={index}
                        src={url}
                        alt={`listing image ${index}`}
                        className="h-24 w-24 object-cover rounded-lg"
                      />
                    ))}
                  </div>
                )}

                {listing.imageUrls.length > 1 && (
                  <div className="flex items-center justify-between mt-2 text-customDarkGreen">
                    <Link to={`/listing/${listing._id}`}>
                      <li className="relative group list-none font-semibold ">
                        <span className="relative z-10">{truncatedName}</span>
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-900 transition-all duration-300 group-hover:w-full"></span>
                      </li>
                    </Link>

                    <div className="flex flex-col items-center">
                      <button
                        onClick={() => handleListingDelete(listing._id)}
                        className="text-red-700 uppercase"
                      >
                        Delete
                      </button>
                      <Link to={`/update-listing/${listing._id}`}>
                        <button className="text-customNormGreen uppercase">
                          Edit
                        </button>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
