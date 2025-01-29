import { apolloClient } from "@/utils/configs/apollo-client";
import {
  useQueryClient,
  useMutation as useReactMutation,
} from "@tanstack/react-query";
import { ChatResponse, CreateChatInterface } from "../types/types.graphql";
import { createChatGQLMutation } from "./gql";
import { gql } from "@apollo/client";

export const ChatFragment = gql`
  fragment ChatFragment on getAllChats {
    _id
    isPrivate
    userIds
    name
    chatCreatorId
  }
`;

export function useCreateChatMutation() {
  const queryClient = useQueryClient();

  return useReactMutation({
    mutationFn: async (variables: CreateChatInterface) => {
      const response = await apolloClient.mutate<{ createChat: ChatResponse }>({
        mutation: createChatGQLMutation,
        variables: {
          chat: variables.chat,
        },
        update: (cache, { data }) => {
          cache.modify({
            fields: {
              getAllChats(existingChat = []) {
                const newChatRef = cache.writeFragment({
                  id: cache.identify(
                    data?.createChat as unknown as Record<string, any>
                  ),
                  fragment: ChatFragment,
                  data: data?.createChat,
                });

                return [...existingChat, newChatRef];
              },
            },
          });
        },
      });

      return response.data;
    },
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries({
        queryKey: ["all-chat"],
      });
    },
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
