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

export function useCreateMessageMutation() {
  const queryClient = useQueryClient();

  return useReactMutation({
    mutationFn: async (variables: CreateMessageInterface) => {

        console.log({variables})

      const response = await apolloClient.mutate<{
        createMessage: MessageResponse;
      }>({
        mutation: createMessageGQLMutation,
        variables: {
          message: variables.message,
        },
      });

      return response.data;
    },
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries({
        queryKey: ["chat-message"],
      });
    },
    onError(error, variables, context) {},
    meta: {
      successMessage: {
        description: "Message sent successfully ",
      },
      errorMessage: {
        description: "Error sending message",
      },
    },
  });
}
