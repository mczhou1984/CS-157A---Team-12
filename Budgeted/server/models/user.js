const mysql = require("mysql");
const config = require("../config/database");
const db = mysql.createConnection(config);
const bcrypt = require("bcrypt");

module.exports.addUser = function(user, callback) {
  console.log(user);
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) throw err;
      user.password = hash;
      let sql = "INSERT into accounts (name, email, password) VALUES(?,?,?)";
      db.query(sql, [user.name, user.email, user.password], err => {
        console.log(err);
        callback(err);
      });
    });
  });
};

module.exports.comparePassword = function(candidatePassword, hash, callback) {
  bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
    if (err) throw err;
    callback(null, isMatch);
  });
};

module.exports.getTransactionsById = function(user_id, callback){
  let sql = "SELECT date, type, amount FROM (SELECT * FROM transactions NATURAL JOIN account_transactions NATURAL JOIN accounts) as xd WHERE accountID= ?  AND transactionID = transactions_transactionID ORDER BY date";
  db.query(sql, [user_id], (err, transactions) => {
    callback(err, transactions);
  });


}

module.exports.getUserByEmail = function(email, callback) {
  let sql =
    "SELECT accountId, email, password, name FROM accounts where email = ?";
  db.query(sql, [email], (err, user) => {
    callback(err, user);
  });
};

module.exports.addTransaction = function(user_id, newTransaction, callback) {
  //
  console.log(newTransaction);
  let sql =
     ("INSERT IGNORE INTO transactions (type, date, amount) VALUES (?,?,?);"
     +"SET @transactionID = LAST_INSERT_ID();"
     +"INSERT INTO account_transactions (accounts_accountID,transactions_transactionID) VALUES(?, @transactionID);");
  db.query(
    sql,
    [newTransaction.category, newTransaction.date, newTransaction.amount, 1],
    err => {
      console.log(err);
      callback(err);
    }
  );
//   sql = "SET @transactionID = LAST_INSERT_ID()";
//   db.query(sql, err => {
//     callback(err);
//   });
//   sql =
//     "INSERT INTO account_transactions (accounts_accountId,transactions_transactionID) VALUES(?, @transactionID);";
//     db.query(sql,[user_id], err => {
//       callback(err);
//     });
};

module.exports.getProfile = function(email, callback) {
  let sql =
    "SELECT accountId, email, password, name FROM accounts where email = ?";
  db.query(sql, [email], (err, user) => {
    callback(err, user);
  });
};
