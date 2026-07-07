const mongoose = require("mongoose");
const Listing = require("../models/listing");
const sampleListings = require("./data.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then(() => console.log("DB connected"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  await Listing.deleteMany({}); // purana data clear karega
  console.log("Old data deleted");

  await Listing.insertMany(sampleListings.data); // new data insert
  console.log("New sample data inserted");
};

initDB().then(() => {
  mongoose.connection.close();
  console.log("Connection closed");
});