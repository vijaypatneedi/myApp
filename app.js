const express = require('express')
const app = express()
const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT


app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))




const user = require('./routes/user')
app.use('/user', user)






//Export the app
module.exports = app;
