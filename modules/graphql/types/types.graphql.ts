export interface CreateUserInterface {
  user: {
    name: string;
    email: string;
    password: string;
  };
}

export interface LoginInterface {
  email: string;
  password: string;
}

export interface CreateChatInterface {
  chat: {
    isPrivate: boolean;
    name: string;
    userIds: string[];
  };
}

export interface ChatResponse {
  _id: string;
  isPrivate: boolean;
  userIds: string[];
  name: string;
  chatCreatorId: string
}
