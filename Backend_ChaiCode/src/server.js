const express = require('express')

const DBConnetion = require('./db/db')
const path = require('path')
const app = express();
DBConnetion();
const port = 3000;
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

// API routes
const data = require('./routes/index')
app.use('/', data)


app.listen(port, () => {
    console.log(`Server is running on ${port}`)
})