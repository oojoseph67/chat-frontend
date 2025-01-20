import { apolloClient } from "@/utils/configs/apollo-client";
import {
  useQueryClient,
  useMutation as useReactMutation,
} from "@tanstack/react-query";
import { ChatResponse, CreateChatInterface } from "../types/types.graphql";
import { createChatGQLMutation } from "../gql";

export function useCreateChatMutation() {
  return useReactMutation({
    mutationFn: async (variables: CreateChatInterface) => {
      const response = await apolloClient.mutate<ChatResponse>({
        mutation: createChatGQLMutation,
        variables: {
          chat: variables.chat,
        },
      });

      console.log({ createChat: response.data });

      return response.data;
    },
    onSuccess(data, variables, context) {},
    onError(error, variables, context) {},
    meta: {
      successMessage: {
        description: "Chat created successfully ",
      },
      errorMessage: {
        description: "Error creating chat",
      },
    },
  });
}
