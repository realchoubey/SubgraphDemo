// lib/apolloClient.ts
import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://api.studio.thegraph.com/query/69140/iitb-demo/version/latest", // Your GraphQL API endpoint
  cache: new InMemoryCache(),
});

export default client;
