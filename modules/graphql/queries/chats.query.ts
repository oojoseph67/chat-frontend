import { apolloClient } from "@/utils/configs/apollo-client";
import { useQuery as useReactQuery } from "@tanstack/react-query";
import { GetAllChats, GetChatById } from "./gql";
import { ChatResponse } from "../types/types.graphql";

export function useGetAllChatsQuery() {
  return useReactQuery({
    queryKey: ["all-chat"],
    queryFn: async () => {
      const response = await apolloClient.query({
        query: GetAllChats,
      });

      const data = response.data.getAllChats as ChatResponse[];

      return data;
    },
    refetchInterval: 50000,
  });
}

export function useGetChatByIdQuery({ chatId }: { chatId: string }) {
  return useReactQuery({
    queryKey: ["chat-by-id"],
    queryFn: async () => {
      const response = await apolloClient.query({
        query: GetChatById,
        variables: {
          // id: "678de759d0bed772fc5878d2",
          id: chatId,
        },
      });

      const data = response.data.getChatById as ChatResponse;

      return data;
    },
    enabled: !!chatId,
    refetchInterval: 5000,
  });
}
