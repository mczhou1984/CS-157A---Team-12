const express = require('express');
const router = express.Router();
const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password:'password',
  database: 'budgeteddb'
});


router.get('/profile', (req, res) => {
  let sql = 'SELECT accountId,name, email FROM accounts';
  db.query(sql, (err, result) =>{
    if (err) throw err;
    res.json(result);
  })

})


router.post('/register', (req, res) => {
  const user = req.body;
  let sql = 'INSERT into accounts (name, email, password) VALUES(?,?,?)';
  db.query(sql, [user.name, user.email, user.password],(err, result) =>{
    if(err){
      res.json({success: false, msg:'Failed to register user'});
    } else {
      res.json({success: true, msg:'User registered'});
}
  })


})


module.exports = router;
