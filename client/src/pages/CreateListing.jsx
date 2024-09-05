import { useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

import { app } from "../firebase";

export default function CreateListing() {
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
  });
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);

  console.log(formData);

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
              onChange={(e) => setFiles(e.target.files)}
              className="p-3 border border-customDarkGreen rounded-lg w-full"
            />

            <button
              type="button"
              disabled={uploading}
              onClick={handleImageSubmit}
              className={`p-3 text-customNormGreen border border-customNormGreen rounded-lg uppercase transition-all duration-200 disabled:opacity-80 ${
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
                className="flex justify-between p-3 border border-customDarkGreen rounded items-center"
              >
                <img
                  src={url}
                  alt="listing image"
                  className="w-20 h-20 object-contain rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(idx)}
                  className="text-red-700 p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
                >
                  Delete
                </button>
              </div>
            ))}

          <button className="p-3 bg-customDarkGreen text-white rounded-full uppercase hover:opacity-95 disabled:opacity-85">
            Create Listing
          </button>
        </div>
      </form>
    </main>
  );
}
