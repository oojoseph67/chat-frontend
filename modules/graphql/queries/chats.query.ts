import { apolloClient } from "@/utils/configs/apollo-client";
import { useQuery as useReactQuery } from "@tanstack/react-query";
import { GetAllChats } from "./gql";
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
  });
}
