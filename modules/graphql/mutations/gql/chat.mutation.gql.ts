import { gql } from "@apollo/client";

export const createChatGQLMutation = gql`
  mutation CreateChat($chat: CreateChatDto!) {
    createChat(chat: $chat) {
      _id
      isPrivate
      userIds
      name
      __typename
    }
  }
`;
