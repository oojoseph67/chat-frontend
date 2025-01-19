import { apolloClient } from "@/utils/configs/apollo-client";
import { useQuery as useReactQuery } from "@tanstack/react-query";
import { User } from "../models/user.model";
import { GetAucthecicatedUser } from "./gql";

export function useSingleUserQuery() {
  return useReactQuery({
    queryKey: ["single-user"],
    queryFn: async () => {
      const response = await apolloClient.query({
        query: GetAucthecicatedUser,
      });

      console.log({ response });

      return response.data.authenticatedUser as User;
    },
  });
}
