import { ChatFragment } from "../fragments/chat.fragment";
import { gql, useQuery } from '@apollo/client';

const getChatDocument = gql`
  query GetChat($id: String!) {
    chat(id: $id) {
      ...ChatFragment
    }
  }
  ${ChatFragment}
`;

const useGetChat = (variables: { _id: string }) => {
    return useQuery(getChatDocument, { variables });
}

export { useGetChat };
