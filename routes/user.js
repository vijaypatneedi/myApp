const express = require('express');
const router = express.Router()

// const cors = require('cors');
// const dotenv = require('dotenv');
// dotenv.config();

const dbService = require('./dbService');

// app.use(cors());
router.use(express.json());
// app.use(express.urlencoded({ extended : false }));

// middleware that is specific to this router



// define the about route
router.get('/signup', (req, res)=> {
    res.send('Check your details in console')
    const { email,phone,username,password,address } = req.body;
    console.log(email,phone,username,password,address);
})
  
module.exports = router


/*/create new user 
app.post('/register', (request, response) => {
    const { email,phone,username,password,address } = request.body;
    console.log(email,phone,username,password,address);

    //const db = dbService.getDbServiceInstance();
    
    //const result = db.insertNewUser(email,phone,username,password,address);
    // result
    // .then(data => response.json({ data: data}))
    // .catch(err => console.log(err));
});
*/
