import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const Contact = ({ listing }) => {
  const [landlord, setLandlord] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  const onChange = (e) => {
    setMessage(e.target.value);
  };

  useEffect(() => {
    const fetchLandlord = async () => {
      try {
        setError(false);
        const res = await fetch(`/api/user/${listing.userRef}`);

        const data = await res.json();

        setLandlord(data);
      } catch (error) {
        setError(true);
        console.log(error);
      }
    };
    fetchLandlord();
  }, [listing.userRef]);

  return (
    <>
      {landlord && (
        <div className="text-green-950 flex flex-col gap-2">
          <p>
            Contact <span className="font-semibold">{landlord.username}</span>{" "}
            for{" "}
            <span className="font-semibold">{listing.name.toLowerCase()}</span>
          </p>

          <textarea
            name="message"
            id="message"
            rows="2"
            value={message}
            onChange={onChange}
            placeholder="Enter your message here..."
            className="border border-customDarkGreen focus:outline-customDarkGreen placeholder:text-customDarkGreen placeholder:opacity-40 p-3 rounded-lg w-full"
          ></textarea>

          <Link
            to={`mailto:${landlord.email}?subject=${encodeURIComponent(
              `Regarding ${listing.name}`
            )}&body=${encodeURIComponent(message)}`}
            className="bg-customDarkGreen text-white text-center p-3 uppercase rounded-full hover:opacity-95"
          >
            Send Message
          </Link>
        </div>
      )}
    </>
  );
};
