import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import createApolloClient from "../apollo-client";
import { ApolloProvider } from "@apollo/client";

import CustomerList from "../components/CustomerList";

const inter = Inter({ subsets: ["latin"] });

interface Customer {
  username: string;
  name: string;
  address: string;
}

interface CustomerListProps {
  customers: Customer[];
}

export default function Home() {
  const client = createApolloClient();

  return (
    <>
      <Head>
        <title>Customers</title>
        <meta name="description" content="Customers" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <h1>Customer Database</h1>
        <div className={styles.description}>
          <ApolloProvider client={client}>
            <CustomerList> </CustomerList>
          </ApolloProvider>
        </div>
      </main>
    </>
  );
}
