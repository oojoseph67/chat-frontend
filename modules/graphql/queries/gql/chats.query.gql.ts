import { gql } from "@apollo/client";

export const GetAllChats = gql`
  query getAllChats {
    getAllChats {
      _id
      isPrivate
      userIds
      name
      chatCreatorId
    }
  }
`;

export const GetChatById = gql`
  query GetChatById($id: String!) {
    getChatById(id: $id) {
      _id
      chatCreatorId
      isPrivate
      userIds
      name
    }
  }
`;
