const mongoose = require('mongoose');
const mongoURI = 'mongodb://ak7739169024:%23Aryan123@ac-6v6l33l-shard-00-00.ujmyrpk.mongodb.net:27017,ac-6v6l33l-shard-00-01.ujmyrpk.mongodb.net:27017,ac-6v6l33l-shard-00-02.ujmyrpk.mongodb.net:27017/GoFoodmern?ssl=true&replicaSet=atlas-4nza69-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0';

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
