const dotenv = require("dotenv")
dotenv.config()
const mongoose = require('mongoose');
//Create your own .env file in backend and then write Uri="your uri link" and save it
const uri = process.env.Uri 
const mongoDB = async () => {
    await mongoose.connect(uri).then(async () => {
        console.log('Connected Database')
        const fetched_data = await mongoose.connection.db.collection("fooditems");
        const fetched_data2 = await mongoose.connection.db.collection("foodCategory");
        global.fooditems = await fetched_data.find({}).toArray();
        // console.log(fooditems)
        global.foodCategory = await fetched_data2.find({}).toArray();
        // console.log(catData)
    }).catch((error) => {
        console.log("MongoDb Connection Error: ", error.message);
    })
}

module.exports = mongoDB;