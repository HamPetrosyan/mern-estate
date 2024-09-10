import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

import { app } from "../firebase";

export default function CreateListing() {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [imageUploadError, setImageUploadError] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: "",
    description: "",
    address: "",
    regularPrice: 50,
    discountPrice: 0,
    bathrooms: 1,
    bedrooms: 1,
    furnished: false,
    parking: false,
    type: "sell",
    offer: false,
  });

  const handleImageSubmit = (e) => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      setUploading(true);
      setImageUploadError(false);
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setImageUploadError(false);
          setUploading(false);
        })
        .catch((err) => {
          setImageUploadError("Image upload failed (2 MB max per image)");
          setUploading(false);
        });
    } else {
      setImageUploadError("You have to upload 6 images per listing");
      setUploading(false);
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleRemoveImage = (idx) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== idx),
    });
  };

  const handleChange = (e) => {
    if (e.target.id === "sell" || e.target.id === "rent") {
      setFormData({
        ...formData,
        type: e.target.id,
      });
    }

    if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "offer"
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.checked,
      });
    }

    if (
      e.target.type === "number" ||
      e.target.type === "text" ||
      e.target.type === "textarea"
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.imageUrls.length < 1)
      return setError("You must upload at least one image");

    if (+formData.regularPrice < +formData.discountPrice)
      return setError("Discount price must be lower than regular price");

    setLoading(true);
    setError(false);

    try {
      const res = await fetch("/api/listing/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          userRef: currentUser._id,
        }),
      });

      const data = await res.json();

      setLoading(false);

      if (data.success === false) {
        setError(data.message);
      }

      navigate(`/listing/${data._id}`);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <main className="p-6 max-w-5xl mx-auto text-green-950">
      <h1 className="text-4xl font-bold text-center my-12">Create a Listing</h1>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-6">
        <div className="flex flex-col flex-1 gap-6">
          <input
            type="text"
            placeholder="Name"
            id="name"
            maxLength="62"
            minLength="10"
            required
            onChange={handleChange}
            value={formData.name}
            className="border border-customDarkGreen focus:outline-none focus:ring-1 focus:ring-customDarkGreen placeholder:text-customDarkGreen placeholder:opacity-60 p-4 rounded-lg shadow-md"
          />

          <textarea
            type="text"
            placeholder="Description"
            id="description"
            required
            onChange={handleChange}
            value={formData.description}
            className="border border-customDarkGreen focus:outline-none focus:ring-1 focus:ring-customDarkGreen placeholder:text-customDarkGreen placeholder:opacity-60 p-4 rounded-lg shadow-md resize-none"
          />

          <input
            type="text"
            placeholder="Address"
            id="address"
            required
            onChange={handleChange}
            value={formData.address}
            className="border border-customDarkGreen focus:outline-none focus:ring-1 focus:ring-customDarkGreen placeholder:text-customDarkGreen placeholder:opacity-60 p-4 rounded-lg shadow-md"
          />

          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="sell"
                className="checkbox-input"
                onChange={handleChange}
                checked={formData.type === "sell"}
              />
              <label
                htmlFor="sell"
                className="checkbox-label text-lg font-medium"
              >
                Sell
              </label>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="rent"
                className="checkbox-input"
                onChange={handleChange}
                checked={formData.type === "rent"}
              />
              <label
                htmlFor="rent"
                className="checkbox-label text-lg font-medium"
              >
                Rent
              </label>
            </div>
          </div>

          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="parking"
                className="checkbox-input"
                onChange={handleChange}
                checked={formData.parking}
              />
              <label
                htmlFor="parking"
                className="checkbox-label text-lg font-medium"
              >
                Parking spot
              </label>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="furnished"
                className="checkbox-input"
                onChange={handleChange}
                checked={formData.furnished}
              />
              <label
                htmlFor="furnished"
                className="checkbox-label text-lg font-medium"
              >
                Furnished
              </label>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="offer"
                className="checkbox-input"
                onChange={handleChange}
                checked={formData.offer}
              />
              <label
                htmlFor="offer"
                className="checkbox-label text-lg font-medium"
              >
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
                required
                onChange={handleChange}
                value={formData.bedrooms}
                className="border border-customDarkGreen p-4 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-customDarkGreen"
              />
              <p className="text-lg">Beds</p>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bathrooms"
                min="1"
                max="10"
                required
                onChange={handleChange}
                value={formData.bathrooms}
                className="border border-customDarkGreen p-4 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-customDarkGreen"
              />
              <p className="text-lg">Baths</p>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="number"
                id="regularPrice"
                min="50"
                max="1000000000"
                required
                onChange={handleChange}
                value={formData.regularPrice}
                className="border border-customDarkGreen p-4 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-customDarkGreen"
              />
              <div className="flex flex-col items-center">
                <p className="text-lg">Regular price</p>
                {formData.type === "rent" && (
                  <span className="text-xs">($ / month)</span>
                )}
              </div>
            </div>

            {formData.offer && (
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  id="discountPrice"
                  min="0"
                  max="1000000000"
                  required
                  onChange={handleChange}
                  value={formData.discountPrice}
                  className="border border-customDarkGreen p-4 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-customDarkGreen"
                />
                <div className="flex flex-col items-center">
                  <p className="text-lg">Discounted Price</p>
                  {formData.type === "rent" && (
                    <span className="text-xs">($ / month)</span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col flex-1 gap-6 text-green-950 ml-0 sm:ml-6">
          <p className="text-lg font-semibold">
            Images:
            <span className="font-normal text-customDarkGreen ml-2">
              The first image will be the cover (max 6)
            </span>
          </p>

          <div className="flex gap-6">
            <input
              type="file"
              id="images"
              accept="image/*"
              multiple
              onChange={(e) => setFiles(e.target.files)}
              className="p-4 border border-customDarkGreen rounded-lg w-full shadow-md"
            />

            <button
              type="button"
              disabled={uploading}
              onClick={handleImageSubmit}
              className={`p-4 text-customNormGreen border border-customNormGreen rounded-lg uppercase transition-all duration-200 disabled:opacity-80 ${
                !uploading &&
                "hover:scale-105 cursor-pointer hover:shadow hover:shadow-customNormGreen"
              } ${uploading ? "cursor-not-allowed" : ""}`}
            >
              {uploading ? "Uploading..." : "Upload"}
            </button>
          </div>

          <p className="text-red-700">{imageUploadError && imageUploadError}</p>

          {formData.imageUrls.length > 0 &&
            formData.imageUrls.map((url, idx) => (
              <div
                key={idx}
                className="flex justify-between p-4 border border-customDarkGreen rounded-lg shadow-md items-center"
              >
                <img
                  src={url}
                  alt="listing image"
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(idx)}
                  className="text-red-700 p-3 rounded-lg uppercase hover:opacity-90 disabled:opacity-80"
                >
                  Delete
                </button>
              </div>
            ))}

          <button
            disabled={loading || uploading}
            className="p-4 bg-customDarkGreen text-white rounded-full uppercase shadow-md hover:opacity-95 disabled:opacity-80 disabled:cursor-not-allowed"
          >
            {loading ? "Creating..." : "Create Listing"}
          </button>
          {error && <p className="text-red-700 text-sm">{error}</p>}
        </div>
      </form>
    </main>
  );
}
