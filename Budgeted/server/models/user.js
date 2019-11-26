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
      let sql = "INSERT INTO budget (balance, daily_budget, savingPercentage) VALUES (0, 0, 0);"
      +"SET @budgetID = LAST_INSERT_ID();"
      +"INSERT into accounts (name, email, password, budgetID) VALUES(?,?,?, @budgetID); "
      +"INSERT INTO income (amount, budgetID) VALUES (0, @budgetID); "
      +"INSERT INTO expenses (amount, budgetID) VALUES (0, @budgetID)";
      db.query(sql, [user.name, user.email, user.password], err => {
        console.log(err);
        callback(err);
      });
    });
  });
};

module.exports.getIncomeById = function(user_id, callback){
  let sql = "SET @budgetID = (SELECT budgetID FROM accounts WHERE accountID = ?);"
  +"SELECT * FROM income WHERE budgetID = @budgetID";
  db.query(sql, [user_id], (err, incomes) => {
        console.log(err);
        console.log(incomes[1]);
    callback(err, incomes[1]);
  });

}

module.exports.getExpensesByID = function(user_id, callback){
  let sql = "SET @budgetID = (SELECT budgetID FROM accounts WHERE accountID = ?);"
  +"SELECT * FROM expenses WHERE budgetID = @budgetID";
  db.query(sql, [user_id], (err, expenses) => {
        console.log(err);
        console.log(expenses[1]);
    callback(err, expenses[1]);
  });

}

module.exports.deleteIncomeById = function(user_id,incomeID,incomeAmount, callback){
  let sql = "DELETE FROM income WHERE incomeID = ?;"
  +"SET @budgetID = (SELECT budgetID FROM accounts WHERE accountID = ?);"
  +"UPDATE budget SET daily_budget = daily_budget - ?/30 WHERE budgetID = @budgetID;"
  +"SELECT * FROM income WHERE budgetID = @budgetID";
  db.query(sql, [incomeID,user_id, incomeAmount], (err, incomes) => {
        console.log(err);
        console.log(incomes)
    callback(err, incomes[incomes.length-1]);
  });
}

module.exports.deleteExpenseById = function(user_id,expenseID,expenseAmount, callback){
  //console.log(expenseID)
  let sql = "DELETE FROM expenses WHERE expenseID = ?;"
  +"SET @budgetID = (SELECT budgetID FROM accounts WHERE accountID = ?);"
  +"UPDATE budget SET daily_budget = daily_budget + ?/30 WHERE budgetID = @budgetID;"
  +"SELECT * FROM expenses WHERE budgetID = @budgetID";
  db.query(sql, [expenseID,user_id, expenseAmount], (err, expenses) => {
        console.log(err);
        console.log(expenses[expenses.length-1])
    callback(err, expenses[expenses.length-1]);
  });
}

module.exports.comparePassword = function(candidatePassword, hash, callback) {
  bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
    if (err) throw err;
    callback(null, isMatch);
  });
};

module.exports.getTransactionsById = function(user_id, callback){
  let sql = "SELECT date, type, amount FROM "+
  "(SELECT * FROM transactions "+
    "NATURAL JOIN account_transactions " +
    "NATURAL JOIN accounts) as xd "+
    "WHERE accountID= ? " +
    "AND transactionID = transactions_transactionID "+
    "ORDER BY date";
  db.query(sql, [user_id], (err, transactions) => {
    console.log(transactions);
        console.log(err);
    callback(err, transactions);
  });

}
module.exports.getBudgetById = function(user_id, callback){
  let sql = "SET @budgetID = (SELECT budgetID FROM accounts WHERE accountID = ?);"
            +"SELECT daily_budget, savingPercentage , SUM(income.amount) AS total_income, SUM(expenses.amount) AS total_expenses "
             +"FROM budget JOIN expenses USING(budgetID) JOIN income USING(budgetID) WHERE budgetID = @budgetID;"
  db.query(sql, [user_id], (err, budget) => {
    console.log(budget[1][0]);
        console.log(err);
    callback(err, budget[1][0]);
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
     ("INSERT IGNORE INTO transactions (type, date, amount) VALUES (?,now(),?);"
     +"SET @transactionID = LAST_INSERT_ID();"
     +"INSERT INTO account_transactions (accounts_accountID,transactions_transactionID) VALUES(?, @transactionID);");
  db.query(
    sql,
    [newTransaction.category/*, newTransaction.date*/, newTransaction.amount, user_id],
    err => {
      console.log(err);
      callback(err);
    }
  );
};

module.exports.addIncome = function(user_id, newIncome, callback) {
  //
  console.log(newIncome);
  let sql =
  "SET @budgetID = (SELECT budgetID FROM accounts WHERE accountID = ?);"
  +"INSERT INTO income (budgetID, type, amount) VALUES (@budgetID, ?, ?);"
+"UPDATE budget SET daily_budget = daily_budget + ?/30 WHERE budgetID = @budgetID;"

  db.query(
    sql,
    [user_id,newIncome.type,newIncome.amount, newIncome.amount],
    err => {
      console.log(err);
      callback(err);
    }
  );
};

module.exports.addExpense = function(user_id, newExpense, callback) {
  //
  console.log(newExpense);
  let sql =
  "SET @budgetID = (SELECT budgetID FROM accounts WHERE accountID = ?);"
  +"INSERT INTO expenses (budgetID, type, amount) VALUES (@budgetID, ?, ?);"
+"UPDATE budget SET daily_budget = daily_budget - ?/30 WHERE budgetID = @budgetID;"

  db.query(
    sql,
    [user_id,newExpense.type,newExpense.amount, newExpense.amount],
    err => {
      console.log(err);
      callback(err);
    }
  );
};

module.exports.addSavings = function(user_id, saving, callback) {
  //
  console.log(saving);
  let sql =
  "SET @budgetID = (SELECT budgetID FROM accounts WHERE accountID = ?);"
+"UPDATE budget SET savingPercentage = ? WHERE budgetID = @budgetID;"

  db.query(
    sql,
    [user_id,saving.percent],
    err => {
      console.log(err);
      callback(err);
    }
  );
};

module.exports.getProfile = function(email, callback) {
  let sql =
    "SELECT accountId, email, password, name FROM accounts where email = ?";
  db.query(sql, [email], (err, user) => {
    callback(err, user);
  });
};
