import { apolloClient } from "@/utils/configs/apollo-client";
import {
  useQueryClient,
  useMutation as useReactMutation,
} from "@tanstack/react-query";
import { createMessageGQLMutation } from "./gql";
import {
  CreateMessageInterface,
  MessageResponse,
} from "../types/types.graphql";

interface CreateMessageResponse {
  createMessage: {
    _id: string;
    content: string;
    createdAt: string;
    userId: string;
    chatId: string;
  };
}

export function useCreateMessageMutation() {
  const queryClient = useQueryClient();
  
  return useReactMutation({
    mutationFn: async (variables: CreateMessageInterface) => {
      const response = await apolloClient.mutate<CreateMessageResponse>({
        mutation: createMessageGQLMutation,
        variables: { message: variables.message },
      });
      return response.data!;
    },
    onSuccess: (data, variables) => {
      // Optimistically update the messages list
      queryClient.setQueryData<MessageResponse>(
        ["messages", variables.message.chatId],
        (old) => ({
          messages: [...(old?.messages || []), data.createMessage]
        })
      );
    },
  });
}
