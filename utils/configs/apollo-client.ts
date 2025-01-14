import { excludedRoutes } from "@/modules/components/auth/guard";
import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { onError } from "@apollo/client/link/error";

if (!process.env.NEXT_PUBLIC_GRAPHQL_URL) {
  throw new Error("Missing NEXT_PUBLIC_GRAPHQL_URL environment variable");
}

const logoutLink = onError((error) => {
  if (
    error.graphQLErrors?.length &&
    (error.graphQLErrors[0]?.extensions?.originalError as any)?.statusCode ===
      401
  ) {
    if (!excludedRoutes.includes(window.location.pathname)) {
      window.location.href = '/login'
      // const router = useRouter();
      // router.push("/login");

      apolloClient.resetStore();
    }
  }
});

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_URL,
  credentials: "include", // this is important for sending cookies
});

export const apolloClient = new ApolloClient({
  link: logoutLink.concat(httpLink), // httpLink occurs first before the logoutLink
  cache: new InMemoryCache(),
  defaultOptions: {
    query: {
      fetchPolicy: "network-only",
    },
  },
});
