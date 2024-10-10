import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { appwriteConfig, databases, ID, storage } from "../lib/appwrite";
import { Permission, Role } from "appwrite";

function CreatePost() {
  const { user } = useUser();
  const [imagePreview, setImagePreview] = useState(""); // For previewing the selected image
  const [caption, setCaption] = useState("");
  const [file, setFile] = useState(null); // File state to store the selected image file

  const navigate = useNavigate();

  // Handle image file selection and preview
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setImagePreview(URL.createObjectURL(selectedFile)); // Create preview URL
    }
  };
  console.log(imagePreview);

  // Upload the image to Appwrite and create the post
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Upload image to Appwrite bucket
      let imageId = "";
      if (file) {
        const uploadedFile = await storage.createFile(
          appwriteConfig.mediaBucketId,
          ID.unique(),
          file
        );
        imageId = uploadedFile.$id; // Store the uploaded image's ID
      }

      // Create a new post document in the database
      const newPost = await databases.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.postCollectionId,
        ID.unique(),
        {
          caption,
          imageId, // Add the imageId field here
          imageUrl: `https://cloud.appwrite.io/v1/storage/buckets/${appwriteConfig.mediaBucketId}/files/${imageId}/view?project=${appwriteConfig.projectId}&mode=admin`, // Construct the image URL
          creator: user.$id, // Owner ID (current user)
        }
      );

      navigate("/");
      console.log("Post created: ", newPost);
    } catch (error) {
      console.log("Error creating post: ", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-sm mx-auto mb-5 mt-10 bg-black"
    >
      <div className="mb-5">
        <div className="flex items-center justify-center w-full">
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                SVG, PNG, JPG, or GIF (MAX. 800x400px)
              </p>
            </div>
            <input
              id="dropzone-file"
              type="file"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
        </div>

        {imagePreview && (
          <div className="mt-4">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-full h-auto rounded-lg"
            />
          </div>
        )}

        <label
          htmlFor="caption"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Your Caption
        </label>
        <textarea
          id="message"
          onChange={(e) => setCaption(e.target.value)}
          value={caption}
          rows="4"
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Caption..."
        ></textarea>
      </div>
      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Create
      </button>
    </form>
  );
}

export default CreatePost;
