import React from "react";

export default function Search() {
  return (
    <div className="flex flex-col sm:flex-row">
      <div className="text-green-950 p-7 border-b-2 sm:border-r-2 border-customBorderGreen sm:min-h-screen">
        <form className="flex flex-col gap-8">
          <div className="flex items-center gap-2">
            <label className="whitespace-nowrap font-semibold">
              Search Term:
            </label>
            <input
              type="text"
              id="searchTerm"
              placeholder="Search..."
              className="border border-customDarkGreen focus:outline-customDarkGreen placeholder:text-customDarkGreen placeholder:opacity-40 p-3 rounded-full w-full"
            />
          </div>

          <div className="flex flex-wrap gap-4 items-center">
            <label className="font-semibold">Type:</label>

            <input type="checkbox" id="all" className="checkbox-input" />
            <span className="checkbox-label">Rent and Sell</span>

            <input type="checkbox" id="rent" className="checkbox-input" />
            <span className="checkbox-label">Rent</span>

            <input type="checkbox" id="sell" className="checkbox-input" />
            <span className="checkbox-label">Sell</span>

            <input type="checkbox" id="offer" className="checkbox-input" />
            <span className="checkbox-label">Offer</span>
          </div>

          <div className="flex flex-wrap gap-4 items-center">
            <label className="font-semibold">Amenities:</label>

            <input type="checkbox" id="parking" className="checkbox-input" />
            <span className="checkbox-label">Parking Spot</span>

            <input type="checkbox" id="furnished" className="checkbox-input" />
            <span className="checkbox-label">Furnished</span>
          </div>

          <div className="flex items-center gap-2">
            <label className="font-semibold">Sort:</label>

            <select
              id="sort_order"
              className="border border-customBorderGreen p-3 rounded-full outline-none"
            >
              <option>Price high to low</option>
              <option>Price low to high</option>
              <option>Latest</option>
              <option>Oldest</option>
            </select>
          </div>
          <button className="bg-customDarkGreen text-white p-3 rounded-full uppercase hover:opacity-95">
            Search
          </button>
        </form>
      </div>

      <div className="">
        <h1 className="text-3xl text-green-950 font-semibold border-b border-customBorderGreen mt-5">
          Listing Results
        </h1>
      </div>
    </div>
  );
}
