const mysql = require('mysql');
const config = require('../config/database');
const db = mysql.createConnection(config);
const bcrypt = require('bcrypt');

module.exports.addUser = function(user, callback) {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) throw err;
      user.password = hash;
      let sql = 'INSERT into accounts (name, email, password) VALUES(?,?,?)';
      db.query(sql, [user.name, user.email, user.password], (err) => {
        callback(err);
      });
    });
  });
}


module.exports.comparePassword = function(candidatePassword, hash, callback){
  bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
    if(err) throw err;
    callback(null, isMatch);
  });
}


module.exports.getUserByEmail = function(email, callback){
  let sql = 'SELECT accountId, email, password, name FROM accounts where email = ?';
  db.query(sql, [email], (err, user) => {
    callback(err, user);
  });
}

module.exports.getProfile = function(email, callback){
  let sql = 'SELECT accountId, email, password, name FROM accounts where email = ?';
  db.query(sql, [email], (err, user) => {
    callback(err, user);
  });
}
