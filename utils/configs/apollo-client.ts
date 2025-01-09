import { ApolloClient, ApolloCache, InMemoryCache } from "@apollo/client";

if (!process.env.NEXT_PUBLIC_GRAPHQL_URL) {
  throw new Error("Missing NEXT_PUBLIC_GRAPHQL_URL environment variable");
}

export const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  uri: process.env.NEXT_PUBLIC_GRAPHQL_URL,
});
