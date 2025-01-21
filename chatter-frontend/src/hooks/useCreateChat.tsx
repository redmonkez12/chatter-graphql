import { useMutation } from "@apollo/client";
import { graphql } from "../gql";
import { ChatFragment } from "../fragments/chat.fragment";

const createChatDocument = graphql(`
    mutation CreateChat($createChatInput: CreateChatInput!) {
      createChat(createChatInput: $createChatInput) {
        ...ChatFragment
      }
    }
  `);
  
  const useCreateChat = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return useMutation(createChatDocument as any, {
      update(cache, { data }) {
        cache.modify({
          fields: {
            chats(existingChats = []) {
              const newChatRef = cache.writeFragment({
                data: data?.createChat,
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