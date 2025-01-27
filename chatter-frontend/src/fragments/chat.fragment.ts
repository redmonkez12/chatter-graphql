import { gql } from "@apollo/client";

export const ChatFragment = gql`
  fragment ChatFragment on Chat {
    _id
    userId
    isPrivate
    userIds
    name
  }
`;
