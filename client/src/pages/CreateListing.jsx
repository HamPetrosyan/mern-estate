export default function CreateListing() {
  return (
    <main className="p-3 max-w-4xl mx-auto text-green-950">
      <h1 className="text-3xl font-semibold text-center my-10">
        Create a Listing
      </h1>
      <form className="flex flex-col sm:flex-row">
        <div className="flex flex-col flex-1 gap-4">
          <input
            type="text"
            id="name"
            placeholder="Name"
            maxLength="62"
            minLength="10"
            required
            className="border border-customDarkGreen focus:outline-customDarkGreen placeholder:text-customDarkGreen placeholder:opacity-40 p-3 rounded-lg"
          />
          <textarea
            type="text"
            id="description"
            placeholder="Description"
            required
            className="border border-customDarkGreen focus:outline-customDarkGreen placeholder:text-customDarkGreen placeholder:opacity-40 p-3 rounded-lg"
          />
          <input
            type="text"
            id="address"
            placeholder="Address"
            required
            className="border border-customDarkGreen focus:outline-customDarkGreen placeholder:text-customDarkGreen placeholder:opacity-40 p-3 rounded-lg"
          />

          <div className="flex flex-wrap gap-6">
            <div className="flex">
              <input type="checkbox" id="sell" className="checkbox-input" />
              <label htmlFor="sell" className="checkbox-label">
                Sell
              </label>
            </div>
            <div className="flex">
              <input type="checkbox" id="rent" className="checkbox-input" />
              <label htmlFor="rent" className="checkbox-label">
                Rent
              </label>
            </div>
            <div className="flex">
              <input type="checkbox" id="parking" className="checkbox-input" />
              <label htmlFor="parking" className="checkbox-label">
                Parking spot
              </label>
            </div>
            <div className="flex">
              <input
                type="checkbox"
                id="furnished"
                className="checkbox-input"
              />
              <label htmlFor="furnished" className="checkbox-label">
                Furnished
              </label>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="offer" className="checkbox-input" />
              <label htmlFor="offer" className="checkbox-label">
                Offer
              </label>
            </div>
          </div>

          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bedrooms"
                min="1"
                max="10"
                defaultValue={1}
                required
                className="border border-customDarkGreen p-3 rounded-lg focus:outline-customDarkGreen"
              />
              <p>Beds</p>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bathrooms"
                min="1"
                max="10"
                defaultValue={1}
                required
                className="border border-customDarkGreen p-3 rounded-lg focus:outline-customDarkGreen"
              />
              <p>Baths</p>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="number"
                id="regularPrice"
                defaultValue={0}
                required
                className="border border-customDarkGreen p-3 rounded-lg focus:outline-customDarkGreen"
              />
              <div className="flex flex-col items-center">
                <p>Regular Price</p>
                <span className="text-xs">($ / month)</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="number"
                id="discountPrice"
                defaultValue={0}
                required
                className="border border-customDarkGreen p-3 rounded-lg focus:outline-customDarkGreen"
              />
              <div className="flex flex-col items-center">
                <p>Discounted Price</p>
                <span className="text-xs">($ / month)</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col flex-1 gap-4 text-green-950 ml-0 sm:ml-3">
          <p className="font-semibold">
            Images:
            <span className="font-normal text-customDarkGreen ml-2">
              The first image will be the cover (max 6)
            </span>
          </p>
          <div className="flex gap-4">
            <input
              type="file"
              id="images"
              accept="image/*"
              multiple
              className="p-3 border border-customDarkGreen rounded-lg w-full"
            />
            <button className="p-3 text-customNormGreen border border-customNormGreen rounded-lg uppercase transition-all duration-200 hover:shadow-customNormGreen hover:shadow  disabled:opacity-80 hover:scale-105">
              Upload
            </button>
          </div>
          <button className="p-3 bg-customDarkGreen text-white rounded-full uppercase hover:opacity-95 disabled:opacity-85">
            Create Listing
          </button>
        </div>
      </form>
    </main>
  );
}
