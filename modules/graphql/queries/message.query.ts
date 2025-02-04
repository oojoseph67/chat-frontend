import { apolloClient } from "@/utils/configs/apollo-client";
import { useQuery as useReactQuery } from "@tanstack/react-query";
import { GET_MESSAGES_QUERY } from "./gql";
import { MessageResponse } from "../types/types.graphql";
import { useQueryClient } from "@tanstack/react-query";

export function useGetMessageQuery({ chatId }: { chatId: string }) {
  const queryClient = useQueryClient();
  
  return useReactQuery({
    queryKey: ["messages", chatId],
    queryFn: async () => {
      const response = await apolloClient.query({
        query: GET_MESSAGES_QUERY,
        variables: { chatId },
      });
      return response.data as MessageResponse;
    },
    enabled: !!chatId,
    refetchInterval: 5000,
  });
}
