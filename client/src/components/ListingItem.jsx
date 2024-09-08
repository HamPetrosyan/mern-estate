import { Link } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";

export const ListingItem = ({ listing }) => {
  return (
    <div className="text-green-950 shadow shadow-customNormGreen hover:shadow-md hover:shadow-customNormGreen transition-shadow overflow-hidden rounded-lg sm:w-[330px]">
      <Link to={`/listing/${listing._id}`}>
        <img
          src={
            listing.imageUrls[0] ||
            "https://alcbc.ca/wp-content/uploads/2018/08/real.jpg"
          }
          alt="listing cover"
          className="h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300"
        />
        <div className="p-3 flex flex-col gap-2 w-full">
          <p className="truncate text-lg font-semibold">{listing.name}</p>
          <div className="flex items-center gap-1">
            <MdLocationOn className="text-customNormGreen h-4 w-4" />
            <p className="text-customDarkGreen text-sm truncate w-full">
              {listing.address}
            </p>
          </div>

          <p className="text-sm line-clamp-2">{listing.description}</p>

          <p className="text-customDarkGreen font-semibold mt-2">
            ${" "}
            {listing.offer
              ? listing.discountPrice.toLocaleString("en-US")
              : listing.regularPrice.toLocaleString("en-US")}
            {listing.type === "rent" && " / month"}
          </p>

          <div className="flex gap-4">
            <div className="font-bold text-xs">
              {listing.bedrooms > 1
                ? `${listing.bedrooms} beds`
                : `${listing.bedrooms} bed`}
            </div>

            <div className="font-bold text-xs">
              {listing.bathrooms > 1
                ? `${listing.bathrooms} baths`
                : `${listing.bathrooms} bath`}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};
