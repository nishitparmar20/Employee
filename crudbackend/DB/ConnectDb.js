const { MongoClient } = require("mongodb");

let client;
let db;

async function ConnectDb() {
  try {
    if (db) {
      return db;
    }

    const url = process.env.URL;

    client = new MongoClient(url);

    await client.connect();

    console.log("✅ Connected to MongoDB");

    db = client.db("Emp");

    return db;

  } catch (err) {
    console.error("❌ MongoDB Connection Error:", err);
    throw err;
  }
}

module.exports = {
  ConnectDb,
};