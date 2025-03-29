const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const User = require('./models/User'); // Ensure User model is defined
const DB = require('./DB');
const app = express();

// Load environment variables
require('dotenv').config();

// Connect to MongoDB
DB();

// Middleware
app.use(cors({
    origin: process.env.FRONTEND_URL, // Ensure this matches your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true // Allow credentials to be sent
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'uploads')));

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Routes
app.get('/', (req, res) => {
    res.render('index');
});

app.post('/register', async (req, res) => {
    try {
        const user = new User(req.body);
        const result = await user.save();
        const userObject = result.toObject();
        delete userObject.password; // Remove password from response
        res.status(201).send(userObject);
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (email && password) {
            const user = await User.findOne({ email, password }).select("-password");
            if (user) {
                res.send(user);
            } else {
                res.status(404).send("No User Found");
            }
        } else {
            res.status(400).send("Email and password are required");
        }
    } catch (error) {
        console.error("Error logging in:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.post('/user', async (req, res) => {
    try {
        const user = new User(req.body);
        const result = await user.save();
        res.status(201).send(result);
    } catch (error) {
        console.error("Error saving user:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.get('/user', async (req, res) => {
    try {
        const users = await User.find();
        if (users.length > 0) {
            res.send(users);
        } else {
            res.status(404).send({ error: "No Users found" });
        }
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.delete('/user/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const deletedUser = await User.deleteOne({ _id: userId });
        if (deletedUser.deletedCount === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(204).send(); // Send 204 (No Content) upon successful deletion
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).send("Internal Server Error");
    }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server Running at port ${PORT}`);
});
