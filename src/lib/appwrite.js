import {
  Client,
  Account,
  Databases,
  Storage,
  Avatars,
  Query,
  ID,
} from "appwrite";

export const client = new Client();

export const appwriteConfig = {
  url: import.meta.env.VITE_APPWRITE_URL,
  projectId: import.meta.env.VITE_APPWRITE_PROJECT_ID,
  databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
  storageId: import.meta.env.VITE_APPWRITE_STORAGE_ID,
  userCollectionId: import.meta.env.VITE_APPWRITE_USER_COLLECTION_ID,
  postCollectionId: import.meta.env.VITE_APPWRITE_POST_COLLECTION_ID,
  savesCollectionId: import.meta.env.VITE_APPWRITE_SAVES_COLLECTION_ID,
  mediaBucketId: import.meta.env.VITE_APPWRITE_MEDIA_BUCKET_ID,
};

client.setEndpoint(appwriteConfig.url).setProject(appwriteConfig.projectId);

export const account = new Account(client);
export { ID } from "appwrite";
export const databases = new Databases(client);
export const storage = new Storage(client);
export const avatars = new Avatars(client);

// ============================== GET USER
export async function getCurrentUser() {
  try {
    const currentAccount = await account.get();

    if (!currentAccount) {
      throw new Error("User not authenticated");
    }

    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser.documents.length) {
      throw new Error("User not found in database");
    }

    return currentUser.documents[0];
  } catch (error) {
    console.log("Error getting current user:", error);
    return null;
  }
}

// ============================== GET All USERS
export async function getAllUsers() {
  try {
    const users = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId
    );

    if (!users) throw Error;

    return users.documents;
  } catch (error) {
    console.log("Error fetching Users: ", error);
    return [];
  }
}

// ============================== GET POSTS
export async function getPosts() {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId
    );

    if (!posts) throw Error;

    return posts.documents;
  } catch (error) {
    console.log("Error fetching posts: ", error);
    return [];
  }
}

// // ============================== UPLOAD IMAGE FILE
// export async function uploadFile () {
//   const file = document.getElementById('uploader').files[0]; // Get the selected file
//   const bucketId = appwriteConfig.mediaBucketId;

//   if (file) {
//       const promise = storage.createFile(bucketId, ID.unique(), file);

//       promise.then(function (response) {
//           console.log('File uploaded successfully:', response);
//       }, function (error) {
//           console.log('File upload failed:', error);
//       });
//   }
// }

// // ============================== Displaying Uploaded Images
// export async function displayPreview (fileId) {
//   const bucketId = '<BUCKET_ID>'; // Replace with your bucket ID

//   const result = storage.getFilePreview(bucketId, fileId);

//   result.then(function (response) {
//       const img = document.createElement('img');
//       img.src = response;
//       document.body.appendChild(img); // Display image on the page
//   }, function (error) {
//       console.log('Failed to get file preview:', error);
//   });
// }

// // ============================== DOWNLOAD IMAGE FILE
// export async function downloadFile (fileId) {
//   const bucketId = appwriteConfig.mediaBucketId;

//   const result = storage.getFileDownload(bucketId, fileId);

//   result.then(function (response) {
//       window.open(response, '_blank');
//       console.log('File download started:', response);
//   }, function (error) {
//       console.log('File download failed:', error);
//   });
// }
