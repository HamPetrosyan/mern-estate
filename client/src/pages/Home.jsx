import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import SwiperCore from "swiper";
import "swiper/css/bundle";
import { ListingItem } from "../components/ListingItem";

export default function Home() {
  SwiperCore.use([Navigation]);
  const [offerListings, setOfferListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  const [sellListings, setSellListings] = useState([]);

  console.log(offerListings);

  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch("/api/listing/get?offer=true&limit=4");
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchRentListings = async () => {
      try {
        const res = await fetch("/api/listing/get?type=rent&limit=4");
        const data = await res.json();
        setRentListings(data);
        fetchSellListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSellListings = async () => {
      try {
        const res = await fetch("/api/listing/get?type=sell&limit=4");
        const data = await res.json();
        setSellListings(data);
      } catch (error) {
        log(error);
      }
    };

    fetchOfferListings();
  }, []);

  return (
    <div>
      {/* top */}
      <div className="flex flex-col gap-6 p-28 px-3 max-w-7xl mx-auto">
        <h1 className="text-customDarkGreen font-bold text-3xl lg:text-6xl">
          Find your next <span className="text-customNormGreen">perfect</span>
          <br /> place with ease
        </h1>
        <div className="text-green-950 text-xs sm:text-sm">
          Ham Estate is the best place to find your next perfect place to live.{" "}
          <br />
          We have a wide range of properties for you to choose from.
        </div>
        <Link to={"/search"}>
          <li className="relative group list-none hidden sm:inline text-customDarkGreen">
            <span className="relative z-10">Let's get started...</span>
            <span className="absolute top-5 left-0 w-0 h-0.5 bg-customDarkGreen transition-all duration-300 group-hover:w-full"></span>
          </li>
        </Link>
      </div>
      {/* swiper */}

      <Swiper
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        speed={600}
        effect="slide"
      >
        {offerListings &&
          offerListings.length > 0 &&
          offerListings.map((listing) => (
            <SwiperSlide key={listing._id}>
              <div
                style={{
                  background: `url(${listing.imageUrls[0]}) center no-repeat`,
                  backgroundSize: "cover",
                }}
                className="h-[500px]"
              ></div>
            </SwiperSlide>
          ))}
        <div className="swiper-button-next text-customNormGreen opacity-40 hover:opacity-100 transition-opacity duration-300" />
        <div className="swiper-button-prev text-customNormGreen opacity-40 hover:opacity-100 transition-opacity duration-300" />
      </Swiper>

      {/* listing results for offer, slane and rent */}

      <div className="max-w-7xl mx-auto p-3 flex flex-col gap-8 my-10">
        {offerListings && offerListings.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-customDarkGreen">
                Recent offers
              </h2>
              <Link to={"/search?offer=true"}>
                <li className="relative group list-none hidden sm:inline text-customNormGreen">
                  <span className="relative z-10 text-sm">
                    show more offers
                  </span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-customNormGreen transition-all duration-300 group-hover:w-full"></span>
                </li>
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {offerListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}

        {rentListings && rentListings.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-customDarkGreen">
                Recent places for rent
              </h2>
              <Link to={"/search?offer=true"}>
                <li className="relative group list-none hidden sm:inline text-customNormGreen">
                  <span className="relative z-10 text-sm">
                    show more places for rent
                  </span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-customNormGreen transition-all duration-300 group-hover:w-full"></span>
                </li>
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {rentListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}

        {sellListings && sellListings.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-customDarkGreen">
                Recent places for sell
              </h2>
              <Link to={"/search?offer=true"}>
                <li className="relative group list-none hidden sm:inline text-customNormGreen">
                  <span className="relative z-10 text-sm">
                    show more places for sells
                  </span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-customNormGreen transition-all duration-300 group-hover:w-full"></span>
                </li>
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {sellListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
