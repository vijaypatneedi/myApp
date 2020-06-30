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
router.post('/signup', (req, res)=> {
    //res.send('Check your details in console')
    const { email,phone,username,password,address } = req.body;

    console.log(email,phone,username,password,address);

    const db = dbService.getDbServiceInstance();
    
    db.insertNewUser(email,phone,username,password,address).then((isInserted, data) => {
      console.log('Data : ', data);
      if(isInserted){
        res.status(200).json({ success : isInserted, data : data});
      }else{
        res.status(200).json({ success : isInserted, data : data});
      }
       
    })
    .catch(err => {

      res.status(500).json({Error : err});

    });
})




module.exports = router



