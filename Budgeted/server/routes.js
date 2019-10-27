const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const config = require('./config/database');
const User = require('./models/user');
const bcrypt = require('bcrypt');

const db = mysql.createConnection(config);


router.get('/profile', (req, res) => {
  let sql = 'SELECT accountId,name, email FROM accounts';
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  })

})


router.post('/register', (req, res) => {
  const user = req.body;
  User.addUser(user, (err) => {
  if(err){
    res.json({success: false, msg:'Failed to register user'});
  } else {
    res.json({success: true, msg:'User registered'});
  }
})




})


module.exports = router;
