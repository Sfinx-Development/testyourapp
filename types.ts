export interface User {
  uid: string;
  email: string | null;
}

export interface Account {
  id: string;
  username: string;
  playStoreMail: string | null;
  appStoreMail: string | null;
  uid: string;
}

export interface App {
  name: string;
  link: string;
  description: string;
  imageUrl: string;
  accountId: string;
}

export interface UserCreate {
  email: string;
  password: string;
}
