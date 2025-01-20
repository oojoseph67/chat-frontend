import { gql } from "@apollo/client";

export const GetAllChats = gql`
  query getAllChats {
    getAllChats {
      _id
      isPrivate
      userIds
      name
      chatCreatorId,
    }
  }
`;
