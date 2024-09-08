import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Loading } from "../components/Loading";
import { ListingItem } from "../components/ListingItem";

export default function Search() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [sidebarData, setSidebarData] = useState({
    searchTerm: "",
    type: "all",
    parking: false,
    furnished: false,
    offer: false,
    sort: "created_at",
    order: "desc",
  });

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const typeFromUrl = urlParams.get("type");
    const parkingFromUrl = urlParams.get("parking");
    const furnishedFromUrl = urlParams.get("furnished");
    const offerFromUrl = urlParams.get("offer");
    const sortFromUrl = urlParams.get("sort");
    const orderFromUrl = urlParams.get("order");

    if (
      searchTermFromUrl ||
      typeFromUrl ||
      parkingFromUrl ||
      furnishedFromUrl ||
      offerFromUrl ||
      sortFromUrl ||
      orderFromUrl
    ) {
      setSidebarData({
        searchTerm: searchTermFromUrl || "",
        type: typeFromUrl || "all",
        parking: parkingFromUrl === "true" ? true : false,
        furnished: furnishedFromUrl === "true" ? true : false,
        offer: offerFromUrl === "true" ? true : false,
        sort: sortFromUrl || "created_at",
        order: orderFromUrl || "desc",
      });
    }

    const fetchData = async () => {
      setShowMore(false);
      setLoading(true);

      const searchQuery = urlParams.toString();

      const res = await fetch(`/api/listing/get?${searchQuery}`);
      const data = await res.json();

      if (data.length > 8) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }

      setListings(data);
      setLoading(false);
    };
    fetchData();
  }, [location.search]);

  const handleChange = (e) => {
    if (
      e.target.id === "all" ||
      e.target.id === "rent" ||
      e.target.id === "sell"
    ) {
      setSidebarData({ ...sidebarData, type: e.target.id });
    }

    if (e.target.id === "searchTerm") {
      setSidebarData({ ...sidebarData, searchTerm: e.target.value });
    }

    if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "offer"
    ) {
      setSidebarData({ ...sidebarData, [e.target.id]: e.target.checked });
    }

    if (e.target.id === "sort_order") {
      const sort = e.target.value.split("_")[0] || "created_at";

      const order = e.target.value.split("_")[1] || "desc";

      setSidebarData({ ...sidebarData, sort, order });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set("searchTerm", sidebarData.searchTerm);
    urlParams.set("type", sidebarData.type);
    urlParams.set("parking", sidebarData.parking);
    urlParams.set("furnished", sidebarData.furnished);
    urlParams.set("offer", sidebarData.offer);
    urlParams.set("sort", sidebarData.sort);
    urlParams.set("order", sidebarData.order);

    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const onShowMoreClick = async () => {
    const numberOfListing = listings.length;
    const startIndex = numberOfListing;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("startIndex", startIndex);
    const searchQuery = urlParams.toString();

    const res = await fetch(`/api/listing/get?${searchQuery}`);

    const data = await res.json();

    if (data.length < 9) {
      setShowMore(false);
    }

    setListings([...listings, ...data]);
  };

  return (
    <div className="flex flex-col sm:flex-row">
      <div className="text-green-950 p-7 border-b-2 sm:border-r-2 border-customBorderGreen sm:min-h-screen">
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          <div className="flex items-center gap-2">
            <label className="whitespace-nowrap font-semibold">
              Search Term:
            </label>

            <input
              type="text"
              id="searchTerm"
              placeholder="Search..."
              className="border border-customDarkGreen focus:outline-customDarkGreen placeholder:text-customDarkGreen placeholder:opacity-40 p-3 rounded-full w-full"
              value={sidebarData.searchTerm}
              onChange={handleChange}
            />
          </div>

          <div className="flex gap-4 flex-wrap items-center">
            <label className="font-semibold">Type:</label>

            <input
              type="checkbox"
              id="all"
              className="checkbox-input"
              onChange={handleChange}
              checked={sidebarData.type === "all"}
            />
            <label className="checkbox-span" htmlFor="all">
              Rent & Sale
            </label>

            <input
              type="checkbox"
              id="rent"
              className="checkbox-input"
              onChange={handleChange}
              checked={sidebarData.type === "rent"}
            />
            <label className="checkbox-span" htmlFor="rent">
              Rent
            </label>

            <input
              type="checkbox"
              id="sell"
              className="checkbox-input"
              onChange={handleChange}
              checked={sidebarData.type === "sell"}
            />
            <label className="checkbox-span" htmlFor="sell">
              Sell
            </label>

            <input
              type="checkbox"
              id="offer"
              className="checkbox-input"
              onChange={handleChange}
              checked={sidebarData.offer}
            />
            <label className="checkbox-span" htmlFor="offer">
              Offer
            </label>
          </div>

          <div className="flex flex-wrap gap-4 items-center">
            <label className="font-semibold">Amenities:</label>

            <input
              type="checkbox"
              id="parking"
              className="checkbox-input"
              onChange={handleChange}
              checked={sidebarData.parking}
            />
            <label className="checkbox-span" htmlFor="parking">
              Parking Spot
            </label>

            <input
              type="checkbox"
              id="furnished"
              className="checkbox-input"
              onChange={handleChange}
              checked={sidebarData.furnished}
            />
            <label className="checkbox-span" htmlFor="furnished">
              Furnished
            </label>
          </div>

          <div className="flex items-center gap-2">
            <label className="font-semibold">Sort:</label>

            <select
              onChange={handleChange}
              defaultValue={"created_at_desc"}
              id="sort_order"
              className="border border-customBorderGreen p-3 rounded-full outline-none"
            >
              <option value="regularPrice_desc">Price high to low</option>
              <option value="regularPrice_asc">Price low to high</option>
              <option value="createdAt_desc">Latest</option>
              <option value="createdAt_asc">Oldest</option>
            </select>
          </div>
          <button className="bg-customDarkGreen text-white p-3 rounded-full uppercase hover:opacity-95">
            Search
          </button>
        </form>
      </div>

      <div className="flex-1 text-green-950">
        <h1 className="text-3xl font-semibold border-b border-customBorderGreen p-3 mt-5">
          Listing results:
        </h1>
        <div className="p-7 flex flex-wrap gap-4">
          {!loading && listings.length === 0 && (
            <p className="text-xl flex justify-center items-center w-full h-[70vh]">
              No listing found!
            </p>
          )}

          {loading && (
            <div className="flex justify-center items-center w-full h-[70vh]">
              <Loading />
            </div>
          )}

          {!loading &&
            listings &&
            listings.map((listing) => (
              <div key={listing._id}>
                <ListingItem listing={listing} />
              </div>
            ))}
        </div>
        {showMore && (
          <button
            onClick={onShowMoreClick}
            className="text-customDarkGreen hover:underline w-full mx-auto p-7"
          >
            Show more
          </button>
        )}
      </div>
    </div>
  );
}
