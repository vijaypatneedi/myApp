const express = require('express');
const router = express.Router()
const session = require('express-session');
const mysql = require('mysql');

// const cors = require('cors');
// const dotenv = require('dotenv');
// dotenv.config();

const dbService = require('../database/dbservice');

// app.use(cors());
router.use(express.json());
// app.use(express.urlencoded({ extended : false }));

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'pizza_app',
  port: '3306'
});


// define the about route
router.post('/signup', (req, res) => {

  const { email, phone, username, password, address } = req.body;

  console.log(email, phone, username, password, address);

  const db = dbService.getDbServiceInstance();

  db.insertNewUser(email, phone, username, password, address).then((isInserted, data) => {
    console.log('Data : ', data);
    if (isInserted) {
      res.status(200).json({ success: isInserted, data: data });
    } else {
      res.status(200).json({ success: isInserted, data: data });
    }

  })
    .catch(err => {

      res.status(500).json({ Error: err });

    });
})

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  const db = dbService.getDbServiceInstance();
  if (email && password) {
    connection.query('SELECT * FROM `pizza_app`.`users` WHERE email = ? ', [email], function (error, results, fields) {
      console.log(email, password, results);
      if (error) {
        res.send({
          "code": 400,
          "failed": "error ocurred"
        })
      } else {
        if (results.length > 0) {
          const comparision = (password==results[0].password);
          console.log(password,comparision);
          console.log(results[0].password);
          if (comparision) {
            res.send({
              "code": 200,
              "success": "login sucessful"
            })
          }
          else {
            res.send({
              "code": 204,
              "success": "Email and password does not match"
            })
          }
        }
        else {
          res.send({
            "code": 206,
            "success": "Email does not exists, please Signup first"
          });
        }
      }
    });

  }

});




module.exports = router



