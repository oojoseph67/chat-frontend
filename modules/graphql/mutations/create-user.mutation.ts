import { gql, useMutation } from "@apollo/client";
import { User as UserModel } from "../models/user.model";

interface CreateUserInterface {
  user: {
    name: string;
    email: string;
    password: string;
  };
}

export const createUserGQLMutation = gql`
  mutation CreateUser($user: CreateUserDto!) {
    createUser(user: $user) {
      _id
      name
      email
    }
  }
`;

export function useCreateUserMutation() {
  const [createUser, { loading, error }] = useMutation<
    UserModel,
    CreateUserInterface
  >(createUserGQLMutation);

  //   console.log({ createUser });
  //   console.log({ loading });
  //   console.log({ error });

  return {
    createUser,
    loading,
    error
  };
}

// testpassworD@1234
