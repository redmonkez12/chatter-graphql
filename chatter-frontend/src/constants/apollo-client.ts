import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { API_URL } from "./urls";
import { excludedRoutes } from "./excluded-routes";
import { navigateTo } from "../router/router";
import { authenticatedVar } from "./authenticated";

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

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: logoutLink.concat(httpLink),
});

export default client;
