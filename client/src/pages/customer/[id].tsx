// import { ApolloProvider } from "@apollo/client";
// import createApolloClient from "@/apollo-client";
import CustomerDetailedView from "@/components/CustomerDetailedView";

export default function CustomerPage() {
  // const client = createApolloClient();

  return (
    <main>
      {/* <ApolloProvider client={client}> */}
      <CustomerDetailedView></CustomerDetailedView>
      {/* </ApolloProvider> */}
    </main>
  );
}
