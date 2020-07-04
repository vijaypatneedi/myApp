const express = require('express');
const router = express.Router()
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
          let user_id = results[0]['user_id'];
          const comparision = (password==results[0].password);
          console.log(password,comparision);
          console.log(results[0].password);
          if (comparision) {
            req.session.email = email;
            req.session.user_id = user_id;
            //req.session.cookie.expires = new Date(Date.now() + 500);
            req.session.cookie.maxAge = 1000000;
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

router.post('/logout', (req, res) => {
  const { email, password } = req.body;
  req.session.email = null;
  req.session.password = null;
  req.session.destroy();
  res.send({
    "code": 200,
    "success": "Sucessfully logged out"
  });
  //res.redirect('/');
});



module.exports = router



