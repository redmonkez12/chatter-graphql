import { useMutation } from "@apollo/client";
import { gql } from "@apollo/client";
import { ChatFragment } from "../fragments/chat.fragment";

const createChatDocument = gql`
  mutation CreateChat($createChatInput: CreateChatInput!) {
    createChat(createChatInput: $createChatInput) {
      ...ChatFragment
    }
  }
  ${ChatFragment}
`;

const useCreateChat = () => {
  return useMutation(createChatDocument, {
    update(cache, { data }) {
      if (!data?.createChat) return; // Ensure data exists

      cache.modify({
        fields: {
          chats(existingChats = []) {
            const newChatRef = cache.writeFragment({
              data: data.createChat,
              fragment: ChatFragment,
            });
            return [...existingChats, newChatRef];
          },
        },
      });
    },
  });
};

export { useCreateChat };
