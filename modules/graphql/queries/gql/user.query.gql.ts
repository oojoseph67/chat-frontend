import { gql } from "@apollo/client";

export const GetAucthecicatedUser = gql`
  query Me {
    authenticatedUser {
      _id
      name
      email
    }
  }
`;
