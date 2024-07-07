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
