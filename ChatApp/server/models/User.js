const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email:String,
    password:String,
    mobile: String,
    DOB:String,
    Age:String,
})

const User = mongoose.model("users", userSchema)

module.exports = User;