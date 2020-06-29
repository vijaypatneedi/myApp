const express = require('express');
const router = express.Router()

// const cors = require('cors');
// const dotenv = require('dotenv');
// dotenv.config();

const dbService = require('.././database/dbservice');

// app.use(cors());
router.use(express.json());
// app.use(express.urlencoded({ extended : false }));





// define the about route
router.get('/signup', (req, res)=> {
    //res.send('Check your details in console')
    const { email,phone,username,password,address } = req.body;

    console.log(email,phone,username,password,address);

    const db = dbService.getDbServiceInstance();
    
    db.insertNewUser(email,phone,username,password,address).then(data => {
      console.log('Data : ', data);
      res.status(200).json({output : data});
    })
    .catch(err => {

      res.status(500).json({Error : err});

    });
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
