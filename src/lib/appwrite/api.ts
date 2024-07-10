import { ID, ImageGravity, Query } from 'appwrite';

import type { NewPost, NewUser, Post, User } from '@/models';

import { account, appwriteConfig, avatars, databases, storage } from './config';

export const saveUserToDB = async (user: User) => {
  try {
    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      ID.unique(),
      user
    );

    return newUser;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const createUserAccount = async (user: NewUser) => {
  const { username, email, password } = user;

  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );

    const imageUrl = avatars.getInitials(username);

    const newUser = await saveUserToDB({
      accountId: newAccount.$id,
      email: newAccount.email,
      username,
      imageUrl,
    });

    return newUser;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const signInAccount = async (user: Omit<NewUser, 'username'>) => {
  const { email, password } = user;

  try {
    const session = await account.createEmailPasswordSession(email, password);

    return session;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const getAccount = async () => {
  try {
    const currentAccount = await account.get();

    return currentAccount;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const getCurrentUser = async () => {
  try {
    const currentAccount = await getAccount();

    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      [Query.equal('accountId', currentAccount.$id)]
    );

    return currentUser.documents[0];
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const signOutAccount = async () => {
  try {
    const session = await account.deleteSession('current');

    return session;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const uploadFile = async (file: File) => {
  try {
    const uploadedFile = await storage.createFile(
      appwriteConfig.storageId,
      ID.unique(),
      file
    );

    return uploadedFile;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const getFilePreview = async (fileId: string) => {
  try {
    const fileUrl = await storage.getFilePreview(
      appwriteConfig.storageId,
      fileId,
      2000,
      2000,
      ImageGravity.Top,
      100
    );

    return fileUrl;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const createPost = async (post: NewPost) => {
  try {
    const uploadedFile = await uploadFile(post.files[0]);

    const fileUrl = await getFilePreview(uploadedFile.$id);

    const newPost = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postsCollectionId,
      ID.unique(),
      {
        creator: post.userId,
        caption: post.caption,
        imageUrl: fileUrl,
        imageId: uploadedFile.$id,
        location: post.location,
        tags: post.tags?.map(({ value }) => value),
      }
    );

    return newPost;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const deleteFile = async (fileId: string) => {
  try {
    await storage.deleteFile(appwriteConfig.storageId, fileId);
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

const updatePostDocument = async (
  post: Post,
  imgData?: Pick<Post, 'imageUrl' | 'imageId'>
) => {
  return await databases.updateDocument(
    appwriteConfig.databaseId,
    appwriteConfig.postsCollectionId,
    post.postId,
    {
      caption: post.caption,
      imageUrl: imgData?.imageUrl,
      imageId: imgData?.imageId,
      location: post.location,
      tags: post.tags?.map(({ value }) => value),
    }
  );
};

export async function updatePost(post: Post) {
  try {
    const hasFileToUpdate = post.files.length;

    if (hasFileToUpdate) {
      const uploadedFile = await uploadFile(post.files[0]);
      const imageUrl = await getFilePreview(uploadedFile.$id);

      const updatedPost = await updatePostDocument(post, {
        imageUrl,
        imageId: uploadedFile.$id,
      });

      await deleteFile(post.imageId);

      return updatedPost;
    } else {
      const updatedPost = await updatePostDocument(post);

      return updatedPost;
    }
  } catch (error) {
    throw new Error((error as Error).message);
  }
}
