import { gql } from "@apollo/client";

export const GET_MESSAGES_QUERY = gql`
  query GetMessages($chatId: String!) {
    messages(chatId: $chatId) {
      _id
      content
      createdAt
      userId
      chatId
    }
  }
`;