const mongoose = require('mongoose');
const uri = "mongodb+srv://Anurag:iamasinger@cluster0.kfq24bw.mongodb.net/gofoodmern?retryWrites=true&w=majority&appName=Cluster0"
const mongoDB = async () => {
    await mongoose.connect(uri).then(async () => {
        console.log('Connected Database')
        const fetched_data = await mongoose.connection.db.collection("fooditems");
        const fetched_data2 = await mongoose.connection.db.collection("foodCategory");
        global.fooditems = await fetched_data.find({}).toArray();
        // console.log(fooditems)
        global.foodCategory = await fetched_data2.find({}).toArray();
        // console.log(catData)
    }).catch((err) => {
        console.log(err);
    })
}

module.exports = mongoDB;