import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkerAlt,
  FaParking,
  FaShare,
} from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import SwiperCore from "swiper";
import "swiper/css/bundle";

import { Loading } from "../components/Loading";
import { Contact } from "../components/Contact";

export default function Listing() {
  SwiperCore.use([Navigation]);
  const { currentUser } = useSelector((state) => state.user);
  const params = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [contact, setContact] = useState(false);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(`/api/listing/get/${params.listingId}`);

        const data = await res.json();

        if (data.success === false) {
          setError(data.message);
          setLoading(false);
        }

        setListing(data);
        setError(false);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchListing();
  }, [params.listingId]);

  return (
    <main className="text-green-950">
      {loading && (
        <div className="flex items-center justify-center h-[80vh]">
          <Loading />
        </div>
      )}
      {error && (
        <p className="flex items-center justify-center h-[80vh] text-2xl">
          Something went wrong!
        </p>
      )}

      {listing && !loading && !error && (
        <>
          <Swiper
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            speed={600}
            effect="slide"
          >
            {listing.imageUrls.map((url, idx) => (
              <SwiperSlide key={idx}>
                <div
                  className="h-[600px]"
                  style={{
                    background: `url(${url}) center no-repeat`,
                    backgroundSize: "cover",
                  }}
                ></div>
              </SwiperSlide>
            ))}
            <div className="swiper-button-next text-customNormGreen opacity-40 hover:opacity-100 transition-opacity duration-300" />
            <div className="swiper-button-prev text-customNormGreen opacity-40 hover:opacity-100 transition-opacity duration-300" />
          </Swiper>

          <div className="fixed top-[13%] right-[3%] z-10 border rounded-full w-10 h-10 sm:w-12 sm:h-12 flex justify-center items-center bg-slate-100 cursor-pointer">
            <FaShare
              className="text-customDarkGreen"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => {
                  setCopied(false);
                }, 2000);
              }}
            />
          </div>

          {copied && (
            <p className="fixed top-[20%] right-[5%] z-10 rounded-md bg-slate-100 p-2 text-green-950">
              Link copied!
            </p>
          )}

          <div className="flex flex-col max-w-7xl mx-auto p-3 my-7 gap-4 text-green-950">
            <p className="text-2xl font-semibold ">
              {listing.name} -{" "}
              <span className="text-customDarkGreen">
                ${" "}
                {listing.offer
                  ? listing.discountPrice.toLocaleString("en-US")
                  : listing.regularPrice.toLocaleString("en-US")}
                {listing.type === "rent" && " / month"}
              </span>
            </p>

            <p className="flex items-center mt-6 gap-2 my-2 text-sm">
              <FaMapMarkerAlt className="text-customNormGreen" />
              {listing.address}
            </p>

            <div className="flex flex-col gap-4 sm:flex-row">
              <p className="bg-customDarkGreen w-full max-w-[200px] text-white text-center p-1 rounded-md">
                {listing.type === "rent" ? "For Rent" : "For Sale"}
              </p>

              {listing.offer && (
                <p className="bg-customNormGreen w-full max-w-[200px] text-white text-center p-1 rounded-md">
                  ${+listing.regularPrice - +listing.discountPrice} OFF
                </p>
              )}
            </div>

            <p className="">
              <span className="font-bold">Description -</span>{" "}
              {listing.description}
            </p>

            <ul className="flex flex-wrap items-center gap-4 sm:gap-6 font-semibold text-sm text-customDarkGreen">
              <li className="flex gap-1 whitespace-nowrap">
                <FaBed className="text-lg" />
                {listing.bedrooms > 1
                  ? `${listing.bedrooms} beds`
                  : `${listing.bedrooms} bed`}
              </li>

              <li className="flex gap-1 whitespace-nowrap">
                <FaBath className="text-lg" />
                {listing.bathrooms > 1
                  ? `${listing.bathrooms} baths`
                  : `${listing.bathrooms} bath`}
              </li>

              <li className="flex gap-1 whitespace-nowrap">
                <FaParking className="text-lg" />
                {listing.parking ? "Parking Spot" : "No Parking"}
              </li>

              <li className="flex gap-1 whitespace-nowrap">
                <FaChair className="text-lg" />
                {listing.furnished ? "Furnished" : "Unfurnished"}
              </li>
            </ul>

            {currentUser && listing.userRef !== currentUser._id && !contact && (
              <button
                onClick={() => setContact(true)}
                className="bg-green-950 text-white rounded-lg uppercase hover:opacity-90 p-3"
              >
                Contact Landlord
              </button>
            )}
            {contact && <Contact listing={listing} />}
          </div>
        </>
      )}
    </main>
  );
}
