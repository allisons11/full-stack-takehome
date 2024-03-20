import Head from "next/head";
import styles from "@/styles/Home.module.css";
// import createApolloClient from "../apollo-client";
// import { ApolloProvider } from "@apollo/client";

import CustomerList from "../components/CustomerList";

export default function Home() {
  // const client = createApolloClient();

  return (
    <>
      <Head>
        <title>Customers</title>
        <meta name="description" content="Customers" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main}`}>
        <h1>Customer Database</h1>
        <div className={styles.description}>
          {/* <ApolloProvider client={client}> */}
          <CustomerList />
          {/* </ApolloProvider> */}
        </div>
      </main>
    </>
  );
}
