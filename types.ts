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
  id: string;
  name: string;
  linkToTest: string;
  description: string;
  imageUrl: string;
  operatingSystem: string;
  accountId: string;
  testersMin: number;
  testersRegistered: number;
}

export interface UserCreate {
  email: string;
  password: string;
}

export interface TesterToApp {
  id: string;
  accountId: string;
  appId: string;
  confirmed: boolean;
}

export interface FeedbackMessage {
  id: string;
  message: string;
  testerToAppId: string;
  appName: string;
  senderMail: string;
  developerId: string;
  dateSent: string;
  appId: string;
  senderId: string;
  isRead:boolean;
}
