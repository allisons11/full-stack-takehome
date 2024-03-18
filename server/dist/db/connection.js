import { MongoClient, ServerApiVersion } from 'mongodb';
const uri = "mongodb+srv://compass_home_test:GWrOXoHlDedBphNX@recruitment.fagsjqo.mongodb.net/sample_analytics?retryWrites=true&w=majority.";
// console.log(uri)
export const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});
async function run() {
    try {
        // Connect the client to the server (optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    }
    catch {
        // Ensures that the client will close when you finish/error
        console.log('exiting');
        await client.close();
    }
}
run().catch(console.dir);
