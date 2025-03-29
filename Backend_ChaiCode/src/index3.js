import mongoose from 'mongoose';
import dotenv from 'dotenv';
// import connectDB from './db/db.js';
import express from 'express';

const app = express(); // Initialize Express app
import cors from 'cors';

app.use(express.json())
app.use(cors());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

dotenv.config({ path: './.env' });

// Database connection function
const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGO_URI}`)
        console.log(`\n MONGO DB CONNECTED SUCCESS !! DB HOST : ${connectionInstance.connection.host}`)

    } catch (error) {
        console.log(`MONGO DB CONNECTION ERROR`)
    }
}


connectDB(); // Establish DB connection




app.get('/', (req, res) => {
    console.log("GET request received");
    res.json({ message: "API is working properly" });
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
