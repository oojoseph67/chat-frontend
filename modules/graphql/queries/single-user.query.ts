import { apolloClient } from "@/utils/configs/apollo-client";
import { gql } from "@apollo/client";
import { useQuery as useReactQuery } from "@tanstack/react-query";
import { User } from "../models/user.model";

const GET_ME = gql`
  query Me {
    authenticatedUser {
      _id
      name
      email
    }
  }
`;

export function useSingleUserQuery() {
  return useReactQuery({
    queryKey: ["single-user"],
    queryFn: async () => {
      const response = await apolloClient.query({
        query: GET_ME,
      });

      console.log({ response });

      return response.data.authenticatedUser as User;
    },
  });
}
