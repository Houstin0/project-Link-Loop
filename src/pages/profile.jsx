import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { databases, appwriteConfig } from "../lib/appwrite";
import { Query } from "appwrite";
import Loader from "../components/loader";
import SideNavbar from "../components/sideNavbar";

export default function Profile() {
  const { userId } = useParams();
  const [profileUser, setProfileUser] = useState(null);

  // Fetch profile data when component mounts or when userId changes
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        // Fetch profile user's data
        const userResponse = await databases.listDocuments(
          appwriteConfig.databaseId,
          appwriteConfig.userCollectionId,
          [Query.equal("$id", userId)] // Get user details for this profile
        );

        setProfileUser(userResponse.documents[0]);
      } catch (error) {
        console.error("Error fetching profile data", error);
      }
    };

    fetchUserProfile();
  }, [userId]); // Re-run effect when userId changes

  if (!profileUser) {
    return <Loader />;
  }

  return (
    <>
      <SideNavbar />
      <div className="fixed left-64 pl-10 h-screen">
        <div
          role="status"
          className="mt-5 mb-5 space-y-8 md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center"
        >
          {/* Profile picture and details */}
          <figure className="max-w-[160px]">
            <img
              className="h-auto max-w-full rounded-full"
              src={profileUser.imageUrl}
              alt={profileUser.name}
            />
          </figure>

          <div className="w-full">
            <h1 className="text-5xl text-purple-800 font-extrabold">
              {profileUser.name}
            </h1>

            <p className="mb-3 text-gray-900 dark:text-gray-400">
              {profileUser.bio}
            </p>
          </div>
        </div>

        <hr className="my-2 border-2 border-purple-200 dark:border dark:border-purple-400" />

        {/* Posts grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {profileUser.posts.length ? (
            profileUser.posts.map((post) => (
              <div key={post.$id}>
                <img
                  className="h-96 w-full rounded-lg object-cover"
                  src={post.imageUrl}
                  alt={post.caption}
                />
              </div>
            ))
          ) : (
            <p>No posts found for this user.</p>
          )}
        </div>
      </div>
    </>
  );
}
