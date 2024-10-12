import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { appwriteConfig, databases, ID, storage } from "../lib/appwrite";
import { Permission, Role } from "appwrite";
import SideNavbar from "../components/sideNavbar";

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
      await databases.createDocument(
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
    } catch (error) {
      console.log("Error creating post: ", error);
    }
  };

  return (
    <>
      <SideNavbar />
      <div className="ml-0 md:ml-64 flex flex-col items-center min-h-screen bg-gray-50 dark:bg-black">
        <h1 className="text-3xl md:text-5xl text-black dark:text-white font-bold my-8 md:my-12">
          Profile Settings
        </h1>
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between w-full px-4 md:px-10">
          {/* Dropzone */}
          <div className="flex items-center justify-center w-full md:w-1/2 mb-4 md:mb-0">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-full border-2 border-gray-400 border-dashed rounded-lg cursor-pointer bg-gray-100 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-300 dark:border-gray-600 dark:hover:border-gray-500"
            >
              <div className="flex flex-col items-center justify-center p-4">
                {imagePreview && (
                  <div className="flex items-center justify-center mb-2">
                    <img
                      src={imagePreview}
                      alt="Avatar Preview"
                      className="w-full max-h-[240px] md:max-h-[340px] rounded-lg object-cover"
                    />
                  </div>
                )}

                <p className="mb-2 text-base text-gray-500 dark:text-gray-400">
                  <span className="font-bold mr-1">
                    {imagePreview
                      ? "Click to upload new picture"
                      : "Click to upload"}
                  </span>
                  or drag and drop
                </p>

                <p className="text-xs text-gray-500 dark:text-gray-400">
                  SVG, PNG, JPG or GIF (MAX. 800x400px)
                </p>
              </div>
              <input
                id="dropzone-file"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          </div>

          {/* Form */}
          <div className="w-full md:w-1/2 md:ml-10">
            <form
              className="max-w-md mx-auto"
              onSubmit={handleSubmit}
              encType="multipart/form-data"
            >
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

              <button
                type="submit"
                className="mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Create
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreatePost;
