import { ID, Query } from 'appwrite';

import type { NewUser, User } from '@/models';

import { account, appwriteConfig, avatars, databases } from './config';

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
