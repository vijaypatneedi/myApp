const express = require('express')
const uuid = require('uuid/v4')
const session = require('express-session')
const FileStore = require('session-file-store')(session)
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser')
const port = 3000;
console.log(`port : ${port}`);

dotenv.config();
const app = express()
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(session({
    genid: (req) => {
      console.log('Inside the session middleware')
      console.log(req.sessionID)
      return uuid() // use UUIDs for session IDs
    },
    store: new FileStore(),
    secret: 'secrett',
    resave: false,
    cookie: {maxAge: 5000},
    saveUninitialized: true
  }))


const user = require('./routes/user')
app.use('/user', user)

// app.get('/', (req, res) => res.status(200).json({success : 'Welcome to pizza app', cookies : req.cookies}));

app.get('/', (req, res) => {
    console.log('Inside the homepage callback function')
    console.log(req.sessionID)
    if(req.session.page_views){
        req.session.page_views++;
        let object = {};
        object.page_views = req.session.page_views;
        if(req.session.email){
            object.email = req.session.email;
        }
        res.status(200).json(object);
     } else {
        req.session.page_views = 1;
        res.send("Welcome to this page for the first time!");
     }
})






app.listen(port, () => console.log(`App listening at http://localhost:${port}`))










//Export the app
module.exports = app;
