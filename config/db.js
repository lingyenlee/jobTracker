const mongoose = require("mongoose")
const config = require("config")
const db = config.get("mongoURI")

//connect to MongoDB

const connectDB = async () => {

    try {
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        })
        console.log("MongoDB connected...")
    } catch (error) {
        console.log(error.message);
        process.exit(1) //exit with failure
    }
}

module.exports = connectDB