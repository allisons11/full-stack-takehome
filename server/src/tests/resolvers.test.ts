import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { ObjectId } from "mongodb";
import axios from "axios";
import typeDefs from "../typeDefs";
import resolvers from "../resolvers";
import { client, run } from "../db/connection";

// types
interface Customer {
  id: ObjectId;
  name: string;
  username: string;
  address: string;
}

interface CustomerFull extends Customer {
  email: string;
  accounts: Number[];
  tierAndDetails: Tier[];
}

interface Transaction {
  code: String;
  date: Number;
  amount: Number;
  price: Number;
  total: Number;
}

interface Tier {
  tier: String;
  benefits: String[];
  active: Boolean;
}

let server;

beforeAll(async () => {
  const port = process.env.port ? Number(process.env.PORT) : 4000;
  // start db connection
  await run().catch(console.dir);
  // start the server before running tests
  server = new ApolloServer({ typeDefs, resolvers });
  await startStandaloneServer(server, {
    listen: { port },
  });
});

afterAll(async () => {
  // close the server & db after tests have finished
  await client.close();
  await server.stop();
});

describe("Resolver tests", () => {
  test("Customers Query", async () => {
    const query = `
      query {
        Customers {
          id
          username
          name
          address
        }
      }
    `;

    try {
      const response = await axios.post("http://localhost:4000", { query });

      const { data } = response;

      expect(data).toBeDefined();

      const { Customers } = data.data;
      expect(Customers).toBeDefined();
      expect(Array.isArray(Customers)).toBe(true);
      expect(Customers.length).toBe(500);

      const customer: Customer = Customers[0];
      expect(typeof customer.id).toBe("string");
      expect(ObjectId.isValid(customer.id)).toBe(true);
      expect(typeof customer.name).toBe("string");
      expect(typeof customer.address).toBe("string");
      expect(typeof customer.username).toBe("string");
    } catch (error) {
      console.error("Error:", error.message);
    }
  });

  test("Customer Query", async () => {
    const query = `
    query {
      Customer(id: "5ca4bbcea2dd94ee58162ad9") {
          id
          username
          name
          address
          email
          accounts
          tierAndDetails {
              tier
              benefits
              active
          }
        }
      }
    `;

    try {
      const response = await axios.post("http://localhost:4000", { query });

      const { data } = response;

      expect(data).toBeDefined();
      const customer: CustomerFull = data.data.Customer;
      expect(customer).toBeDefined();
      expect(customer.id).toBe("5ca4bbcea2dd94ee58162ad9");
      expect(ObjectId.isValid(customer.id)).toBe(true);
      expect(customer.name).toBe("Jacqueline Davis");
      expect(customer.username).toBe("waterskatherine");
      expect(customer.address).toBe(
        "578 Fisher Heights\nNew Victoria, MT 91129",
      );
      expect(customer.email).toBe("yleon@yahoo.com");
      expect(customer.accounts.length).toBe(5);
      const { tierAndDetails } = customer;
      expect(tierAndDetails[0].tier).toBe("Platinum");
      expect(tierAndDetails[0].benefits.length).toBe(2);
      expect(tierAndDetails[0].active).toBe(true);
    } catch (error) {
      console.error("Error:", error.message);
    }
  });

  test("TransactionsPerAccount Query", async () => {
    const query = `
    query {
      TransactionsPerAccount(accountId: 774823) {
        date
        amount
        code
        symbol
        price
        total
      }
    }
  `;

    try {
      const response = await axios.post("http://localhost:4000", { query });

      const { data } = response;

      expect(data).toBeDefined();
      const { TransactionsPerAccount } = data.data;
      expect(Array.isArray(TransactionsPerAccount)).toBe(true);
      expect(TransactionsPerAccount.length).toBe(98);
      const transaction: Transaction = TransactionsPerAccount[0];
      expect(transaction.date).toBe(1177372800000);
      expect(transaction.amount).toBe(1504);
      expect(transaction.code).toBe("buy");
      expect(transaction.price).toBe(20.01042445515025);
      expect(transaction.total).toBe(30095.678380545978);
    } catch (error) {
      console.error("Error:", error.message);
    }
  });
});
