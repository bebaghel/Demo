const mongoose = require('mongoose');

const DB = async () => {
    try {
        // const url = "mongodb://localhost:127.0.0.1:27017/chatDB"
        await mongoose.connect(process.env.MONGODB_URL);
        // await mongoose.connect(url,
        //     {
        //         useNewUrlParser: true
        //     }
        // );

        const connection = mongoose.connection

        connection.on("connected", () => {
            console.log("Connected to Mongo DB");
        })
        connection.on("error", (error) => {
            console.log("Something is wrong in MOngodb ", error);
        })
        
    } catch (error) {
        console.log("Something is wrong", error);
    }
}

module.exports = DB;