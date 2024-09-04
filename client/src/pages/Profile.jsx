import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

import { app } from "../firebase";

export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerce, setFilePerce] = useState(0);
  const [formData, setFormData] = useState({});
  const [message, setMessage] = useState({ text: "", type: "" });
  const fileRef = useRef(null);

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

  return (
    <div className="max-w-md mx-auto px-3">
      <h1 className="text-center text-3xl text-green-950 font-semibold my-7 mb-16">
        Profile
      </h1>

      <form autoComplete="off" className="flex flex-col gap-3">
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
          alt="profile"
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
