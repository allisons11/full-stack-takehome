import { MongoClient, ServerApiVersion } from "mongodb";

const uri =
  "mongodb+srv://compass_home_test:GWrOXoHlDedBphNX@recruitment.fagsjqo.mongodb.net/sample_analytics?retryWrites=true&w=majority.";

export const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!",
    );
  } catch {
    await client.close();
  }
}
