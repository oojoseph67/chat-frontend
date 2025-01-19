import { gql } from "@apollo/client";

export const createUserGQLMutation = gql`
  mutation CreateUser($user: CreateUserDto!) {
    createUser(user: $user) {
      _id
      name
      email
    }
  }
`;
