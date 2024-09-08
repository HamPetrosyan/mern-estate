import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";

import { app } from "../firebase";
import { signInFailure, signInSuccess } from "../redux/user/userSlice";

export const OAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);

      const token = await result.user.getIdToken(true);

      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });

      const data = await res.json();
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      dispatch(signInFailure("Could not sign in or sign up with Google"));
    }
  };

  return (
    <button
      type="button"
      onClick={handleGoogleClick}
      className="bg-customNormGreen text-white px-8 py-3 rounded-full hover:opacity-90"
    >
      Continue with Google
    </button>
  );
};
