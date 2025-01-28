import { gql, useMutation } from "@apollo/client";
import { updateMessages } from "../cache/messages";

const createMessageDocument = gql`
  mutation CreateMessage($createMessageInput: CreateMessageInput!) {
    createMessage(createMessageInput: $createMessageInput) {
      ...MessageFragment,
    }
  }
`;

const useCreateMessage = () => {
  return useMutation(createMessageDocument, {
    update(cache, { data }) {
      if (data?.createMessage) {
        updateMessages(cache, data.createMessage);
      }
    },
  });
};

export { useCreateMessage };
