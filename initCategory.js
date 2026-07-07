const mongoose = require("mongoose");
const Listing = require("./models/listing");

// Database connect
main()
.then(() => console.log("Database Connected"))
.catch(err => console.log(err));

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}

// Update old listings
async function updateCategories() {
    const result = await Listing.updateMany(
        { category: { $exists: false } }, // jinki category nahi hai
        { $set: { category: "Trending" } } // unhe Trending bana do
    );

    console.log(result);
    console.log("✅ All old listings updated!");
    mongoose.connection.close();
}

updateCategories();