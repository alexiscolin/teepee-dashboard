import { provide } from "vue";
import { useCookies } from "vue3-cookies";
import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client/core";
import { DefaultApolloClient } from "@vue/apollo-composable";
import { setContext } from "@apollo/client/link/context";

const getHeaders = () => {
  const headers = {};

  const { cookies } = useCookies();

  const token = cookies.get("token");
  if (token) {
    headers.authorization = `Bearer ${token}`;
  }
  return headers;
};

const authLink = setContext((_, { headers }) => {
  // run every query/mutation
  // get the authentication token from local storage if it exists
  const { cookies } = useCookies();
  const token = cookies.get("token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

// HTTP connection to the API
const httpLink = createHttpLink({
  // You should use an absolute URL here
  uri: "http://localhost:3000/graphql",
  //headers: getHeaders(),
});

// Cache implementation
const cache = new InMemoryCache();

// Create the apollo client
export const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
});

// export provide composable for setup the main.js
export const apiSetup = () => {
  return provide(DefaultApolloClient, apolloClient);
};
