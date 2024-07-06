export interface NewUser {
  username: string;
  email: string;
  password: string;
}

export interface User {
  accountId: string;
  email: string;
  imageUrl: URL;
  username: string;
}
