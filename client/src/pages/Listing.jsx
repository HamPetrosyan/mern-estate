import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import SwiperCore from "swiper";
import "swiper/css/bundle";

import { Loading } from "../components/Loading";

export default function Listing() {
  SwiperCore.use([Navigation]);
  const params = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

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
    <main>
      {loading && (
        <div className="flex items-center justify-center h-[80vh]">
          <Loading />
        </div>
      )}
      {error && (
        <p className="flex items-center justify-center h-[80vh]  text-2xl text-green-950">
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
          >
            {listing.imageUrls.map((url, idx) => (
              <SwiperSlide key={idx}>
                <div
                  className="h-[550px]"
                  style={{
                    background: `url(${url}) center no-repeat`,
                    backgroundSize: "cover",
                  }}
                ></div>
              </SwiperSlide>
            ))}
            {/* Add the navigation buttons here */}
            <div className="swiper-button-next text-customColor" />
            <div className="swiper-button-prev text-customColor" />
          </Swiper>
        </>
      )}
    </main>
  );
}
