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
