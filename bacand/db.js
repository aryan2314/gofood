const mongoose = require('mongoose');
const mongoURI = process.env.MONGOURI

const mongoDB = async () => {
    try {
        await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Connected to MongoDB");

        const fetched_data = await mongoose.connection.db.collection("food_item");
        const data = await fetched_data.find({}).toArray();

        const foodcategory = await mongoose.connection.db.collection("food_category");
        const catData = await foodcategory.find({}).toArray();

        global.food_item = data;
        global.food_category = catData;
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
};

module.exports = mongoDB;
