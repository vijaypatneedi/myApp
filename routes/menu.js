const express = require('express');
const menu = express.Router();
//const mysql = require('mysql');
const dbService = require('../database/dbservice');


menu.get('/', (req,res) => {

    const db = dbService.getDbServiceInstance();

    db.getMenu().then((data) => {
    if (data) {
      res.status(200).json({ data: data });
    } else {
    console.log("this is executed");
      res.status(500);
    }

  })
  
  });

  
module.exports = menu
   

  