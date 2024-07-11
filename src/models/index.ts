import type dynamicIconImports from 'lucide-react/dynamicIconImports';

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

export interface Link {
  label: string;
  route: string;
  icon: keyof typeof dynamicIconImports;
}

export enum PostFormAction {
  CREATE = 'CREATE',
  UPDATE = 'UPDATE',
}

export interface Tag {
  id: string;
  value: string;
}

export interface NewPost {
  userId: string;
  caption: string;
  files: FileList;
  location?: string;
  tags?: Tag[];
}

export interface Post {
  postId: string;
  caption: string;
  imageId: string;
  imageUrl: URL;
  files: FileList;
  location?: string;
  tags?: Tag[];
}
