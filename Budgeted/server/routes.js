const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const config = require('./config/database');
const User = require('./models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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


router.post('/authenticate', (req, res) => {
const email = req.body.email;
const password = req.body.password;

User.getUserByEmail(email, (err, user) => {
  if(err) throw err;

  if(!user){
    res.json({success: false, msg: 'User not found'});
  }
    User.comparePassword(password, user[0].password, (err, isMatch) => {
      if(err) throw err;
      if(isMatch){
        const token = jwt.sign({data:user}, config.secret, {
          expiresIn: 604800 // 1 week
        });


        console.log(user);
        res.json({
          success: true,
          token: 'JWT '+token,
          user: {
            id: user[0].accountId,
            name: user[0].name,
            username: user[0].username
          }
        })
      } else {
        res.json({success: false, msg: 'Wrong password'});
      }
    })


})

})

module.exports = router;
