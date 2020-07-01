const express = require('express')
const app = express()
const dotenv = require('dotenv');
dotenv.config();
var cookieParser = require('cookie-parser')
const port = process.env.PORT
app.use(cookieParser())


const user = require('./routes/user')
app.use('/user', user)

app.get('/', (req, res) => res.status(200).json({success : 'Welcome to pizza app', cookies : req.cookies}));

app.listen(port, () => console.log(`App listening at http://localhost:${port}`))










//Export the app
module.exports = app;
