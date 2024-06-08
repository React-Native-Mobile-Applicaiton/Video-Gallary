import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
  Storage,
} from "react-native-appwrite";

export const config = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.vvm.pg",
  projectId: "666003f00015c3623974",
  databaseId: "6660052600262b56ef68",
  userCollectionId: "6660054800207b3fb12e",
  videosCollectionId: "6660056b00166cef69f5",
  storageId: "66600684002a9285aca2",
};

// Init your React Native SDK
const client = new Client();

client
  .setEndpoint(config.endpoint)
  .setProject(config.projectId)
  .setPlatform(config.platform);

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);
const storage = new Storage(client);
// Register User

export const createUser = async (email, password, username) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );
    if (!newAccount) throw Error;

    const avatarurl = avatars.getInitials(username);

    await signIn(email, password);
    console.log({
      accountId: newAccount.$id,
      email,
      username,
      avator: avatarurl,
    });
    const newUser = await databases.createDocument(
      config.databaseId,
      config.userCollectionId,
      ID.unique(),
      {
        accountid: newAccount.$id,
        email,
        username,
        avator: avatarurl,
      }
    );
    console.log(newUser);
    return newUser;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export async function signIn(email, password) {
  try {
    const session = await account.createEmailPasswordSession(email, password);

    return session;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}
export async function signOut() {
  try {
    const session = await account.deleteSession("current");

    return session;
  } catch (error) {
    throw new Error(error);
  }
}
export async function getAccount() {
  try {
    const currentAccount = await account.get();

    return currentAccount;
  } catch (error) {
    throw new Error(error);
  }
}
export async function getCurrentUser() {
  try {
    const currentAccount = await getAccount();

    if (!currentAccount) throw Error;
    // console.log(currentAccount.$id)
    const currentUser = await databases.listDocuments(
      config.databaseId,
      config.userCollectionId,
      [Query.equal("accountid", currentAccount.$id)]
    );
    // console.log(currentUser)

    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getAllPosts() {
  try {
    const posts = await databases.listDocuments(
      config.databaseId,
      config.videosCollectionId
    );

    return posts.documents;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw new Error("Failed to fetch posts");
  }
}

export async function getLatestPosts() {
  try {
    const posts = await databases.listDocuments(
      config.databaseId,
      config.videosCollectionId,
      [Query.orderDesc("$createdAt", Query.limit(7))]
    );

    return posts.documents;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw new Error("Failed to fetch posts");
  }
}
export async function searchPosts(data) {
  try {
    const posts = await databases.listDocuments(
      config.databaseId,
      config.videosCollectionId,
      [Query.contains("title", data)]
    );

    if (!posts) throw new Error("Something went wrong");

    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
}

export async function getUserPosts(userId) {
  try {
    const posts = await databases.listDocuments(
      config.databaseId,
      config.videosCollectionId
      // [Query.equal("users.$id", userId)]
    );
    console.log(userId);
    const userPosts = posts.documents.filter(
      (post) => post.users.accountid === userId
    );

    return userPosts;
    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
}

export const getFilePreview = async (fileId, type) => {
  let fileUrl;
  try {
    // console.log(fileId);
    if(type === 'video'){
        fileUrl =  storage.getFilePreview(config.storageId,fileId)
    }
    else if(type === 'image'){
      fileUrl =  storage.getFilePreview(config.storageId,fileId,2000,2000,'top',100)
    }else{
      throw new Error("invalid file type")
    }

    if(!fileUrl) throw Error
    return fileUrl
  } catch (error) {
    throw new Error(error);
  }
};
export const uploadFile = async (file, type) => {
  if (!file) return;
  const { mimeType, ...rest } = file;
  const asset = { type: mimeType, ...rest };
  try {
    const uploadedFile = await storage.createFile(
      config.storageId,
      ID.unique(),
      asset
    );
    

    const fileUrl = await getFilePreview(uploadedFile.$id,type)
    return fileUrl
  } catch (error) {
    throw new Error(error);
  }
};
export const createVideo = async (form,user) => {
  try {
    const [thumbnailUrl, videoUrl] = await Promise.all([
      uploadFile(form.thumbnail, "image"),
      uploadFile(form.video, "video"),
    ]);
    // console.log(form);

    const newPost = await databases.createDocument(
      config.databaseId,
      config.videosCollectionId,
      ID.unique(),
      {
        title: form.title,
        thumbnail: thumbnailUrl,
        video: videoUrl,
        prompt: form.prompt,
        users: user.$id,
      }
    );
    console.log(newPost)
    return newPost;
  } catch (error) {
    throw new Error(error);
  }
};
