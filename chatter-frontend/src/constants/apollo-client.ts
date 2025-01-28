import { ApolloClient, HttpLink, InMemoryCache, split } from "@apollo/client";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { onError } from "@apollo/client/link/error";
import { API_URL, WS_URL } from "./urls";
import { excludedRoutes } from "./excluded-routes";
import { navigateTo } from "../router/router";
import { authenticatedVar } from "./authenticated";
import { getMainDefinition } from "@apollo/client/utilities";

const logoutLink = onError((error) => {
  if (
    error.graphQLErrors?.length &&
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (error.graphQLErrors[0]?.extensions?.originalError as any).statusCode ===
      401
  ) {
    if (!excludedRoutes.includes(window.location.pathname)) {
      authenticatedVar(false);
      navigateTo("/login");
      client.resetStore();
    }
  }
});

const httpLink = new HttpLink({
  uri: `${API_URL}/graphql`,
  credentials: "include",
});

const wsLink = new GraphQLWsLink(createClient({
    url: `ws://${WS_URL}/graphql`,
}));

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink,
);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: logoutLink.concat(splitLink),
});

export default client;
