import { User as UserModel } from "../models/user.model";
import {
  useQueryClient,
  useMutation as useReactMutation,
} from "@tanstack/react-query";
import { apolloClient } from "@/utils/configs/apollo-client";
import axios from "axios";
import { BACKEND_URL } from "@/utils/index.utils";
import { useRouter } from "next/router";
import { CreateUserInterface, LoginInterface } from "../types/types.graphql";
import { createUserGQLMutation } from "../gql";

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

export function useLoginMutation() {
  const queryClient = useQueryClient();

  return useReactMutation({
    mutationFn: async ({ request }: { request: LoginInterface }) => {
      const response = await axios.post(
        `${BACKEND_URL}/auth/login`,
        {
          email: request.email,
          password: request.password,
        },
        {
          withCredentials: true,
        }
      );

      await apolloClient.refetchQueries({ include: "active" });

      await queryClient.invalidateQueries({
        queryKey: ["single-user"],
      });

      return response.data;
    },
    meta: {
      errorMessage: {
        description: "Error logging user",
      },
    },
  });
}

export function useLogOutMutation() {
  const router = useRouter();

  return useReactMutation({
    mutationFn: async () => {
      const response = await axios.post(
        `${BACKEND_URL}/auth/logout`,
        {},
        {
          withCredentials: true,
        }
      );

      await apolloClient.clearStore();
      router.push("/login");

      return response.data;
    },
    onError: (error: any) => {
      throw error;
    },
  });
}

// testpassworD@1234
