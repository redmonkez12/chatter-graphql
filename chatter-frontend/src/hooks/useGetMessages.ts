import { gql, useQuery } from "@apollo/client";
import { MessagesQueryVariables } from "../gql/graphql";

const getMessagesDocument = gql`
  query Messages($chatId: String!) {
    messages(chatId: $chatId) {
      ...MessageFragment
    }
  }
`;

const useGetMessages = (variables: MessagesQueryVariables) => {
  return useQuery(getMessagesDocument, { variables });
};
export { useGetMessages, getMessagesDocument };
