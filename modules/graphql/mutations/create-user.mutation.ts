import { gql } from "@apollo/client";
import { User, User as UserModel } from "../models/user.model";
import { useMutation as useReactMutation } from "@tanstack/react-query";
import { apolloClient } from "@/utils/configs/apollo-client";

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

// export function useCreateUserMutation() {
//   const [createUser, { loading, error }] = useMutation<
//     UserModel,
//     CreateUserInterface
//   >(createUserGQLMutation);

//   return {
//     createUser,
//     loading,
//     error
//   };
// }

export function useCreateUserMutation() {
  return useReactMutation({
    mutationFn: async (variables: CreateUserInterface) => {
      const response = await apolloClient.mutate({
        mutation: createUserGQLMutation,
        variables: {
          user: variables.user,
        },
      });

      return response.data as UserModel;
    },
    onSuccess(data, variables, context) {
      apolloClient.refetchQueries({ include: "active" });
    },
    onError(error, variables, context) {
      console.log("create user", { error });
    },
    meta: {
      errorMessage: {
        description: "Error creating user",
      },
    },
  });
}

// testpassworD@1234
