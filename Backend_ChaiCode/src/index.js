// require('dotenv').config({path: './env'})

// import mongoose from 'mongoose';
// import { DB_NAME } from './constants.js';
import dotenv from 'dotenv';
import connectDB from './db/db.mjs';
dotenv.config({ path: './env' })
import {app} from './app.mjs'
connectDB()
    .then(() => {
        app.listen(process.env.PORT || 8000, () => {
            console.log(`Server running at port ${process.env.PORT}`);
        });
    })
    .catch((err) => {
        console.log("Mongo DB Connection failed", err);
    })


// app.get('/', (req, res) => {
//     res.send("Hello saten baghel")
// })
// app.post('/login', (req, res) => {
//     res.send("This is login page")
// })

// const port = 5000;
// app.listen(port, () => {
//     console.log("Server is running .... ", port)
// })


// const startServer = async () => {
//     try {
//         // await connectDB();  // Wait for DB connection before starting the server
//         app.listen(process.env.PORT || 8000, () => {
//             console.log(`Server is running on port ${process.env.PORT || 8000}`);
//         });
//         app.on("error", (error) => {
//             console.log("ERROR :", error)
//             throw error
//         })
//     } catch (error) {
//         console.log('MongoDB connection failed:', error);
//         process.exit(1);  // Exit process if DB connection fails
//     }
// };
// startServer();

// import express from 'express';
// const app = express();
// ;( async () => {
//     try {
//         mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}, `)
//     app.on("error", (error) => {
//         console.log("ERROR :", error)
//          throw error
// })

//     app.listen(process.env.PORT, () => {
//         console.log(`App is running on port ${PORT}`)
//     })
//     } catch (error) {
//         console.error('error', error)
//         throw err
//     }
// })()

// IIFE
// ;( async () => {
//     console.log("Hello I'm IIFE")
// })()

