const mongoose = require('mongoose');

const URI = process.env.MONGO_URI;

const connectDb = async () => {
    try {
        await mongoose.connect(URI);
        console.log("Database Connected..");
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectDb;
