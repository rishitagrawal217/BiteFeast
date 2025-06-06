const mongoose = require('mongoose');

const mongoURI = "mongodb+srv://rishitagrawal217:Om7hHtOxO0g629EH@cluster0.h8fwenu.mongodb.net/BiteFeastMern?retryWrites=true&w=majority&appName=Cluster0";

const mongoDB = async () => {
    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to MongoDB");

        const foodItemsData = await mongoose.connection.db.collection("food_items").find({}).toArray();
        global.food_items = foodItemsData;

        const foodCategoryData = await mongoose.connection.db.collection("foodCategory").find({}).toArray();
        global.foodCategory = foodCategoryData;

        console.log("Loaded food_items and foodCategory into globals.");
    } catch (err) {
        console.error("MongoDB connection or fetch error:", err);
    }
};

module.exports = mongoDB;
