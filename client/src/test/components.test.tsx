import React from "react";
import { render } from "@testing-library/react";
import {
  ApolloProvider,
  InMemoryCache,
  ApolloClient,
  HttpLink,
} from "@apollo/client";
import fetch from "cross-fetch";

import Account, { AccountProps } from "../components/Account";
import CustomerList from "@/components/CustomerList";
import Transaction, { TransactionProps } from "@/components/Transaction";

let client: any;

beforeAll(() => {
  client = new ApolloClient({
    link: new HttpLink({ uri: "http://localhost:4000", fetch }),
    cache: new InMemoryCache(),
  });
});

describe("component snapshot tests", () => {
  test("CustomerList", () => {
    const { container } = render(
      <ApolloProvider client={client}>
        <CustomerList />
      </ApolloProvider>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });
  test("Account", () => {
    const props: AccountProps = { accountId: 774823 };
    const { container } = render(
      <ApolloProvider client={client}>
        <Account {...props} />
      </ApolloProvider>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });
  test("Transaction", () => {
    const props: TransactionProps = {
      code: "buy",
      date: 1239309238,
      amount: 200.234234,
      price: 9.0924234,
      total: 99999,
    };
    const { container } = render(
      <ApolloProvider client={client}>
        <Transaction {...props} />
      </ApolloProvider>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
