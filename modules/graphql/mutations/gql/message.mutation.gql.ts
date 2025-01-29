import { gql } from "@apollo/client";

export const createMessageGQLMutation = gql`
  mutation CreateMessage($message: CreateMessageDto!) {
    createMessage(createMessage: $message) {
      _id
      content
      createdAt
      userId
      chatId
    }
  }
`;
