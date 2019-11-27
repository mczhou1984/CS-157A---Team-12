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
      let sql = "INSERT INTO budget (balance, daily_budget, savingPercentage, date) VALUES (0, 0, 0,curdate());"
      +"SET @budgetID = LAST_INSERT_ID();"
      +"INSERT into accounts (name, email, password, budgetID) VALUES(?,?,?, @budgetID); "
      +"SET @accountID = LAST_INSERT_ID();"
      +"INSERT INTO income (amount, budgetID) VALUES (0, @budgetID); "
      +"INSERT INTO expenses (amount, budgetID) VALUES (0, @budgetID);"
      +"INSERT IGNORE INTO transactions (type, trans_date, amount) VALUES ('',now(),0);"
      +"SET @transactionID = LAST_INSERT_ID();"
      +"SET @budgetID = (SELECT budgetID FROM accounts WHERE accountID = @accountID);"
      +"INSERT INTO account_transactions (accounts_accountID,transactions_transactionID) VALUES(@accountID, @transactionID);"
      +"INSERT INTO transactions_budget (budgetID, transactionID) VALUES (@budgetID,@transactionID);"
      db.query(sql, [user.name, user.email, user.password], err => {
        console.log(err);
        callback(err);
      });
    });
  });
};


function createInsertDates(currDate, dateDiff){
  let dates = []
  for(let i = 0; i < dateDiff; i++){
    let n = currDate.getUTCFullYear() + '-' +
       ('00' + (currDate.getUTCMonth()+1)).slice(-2) + '-' +
       ('00' + (currDate.getUTCDate()-i)).slice(-2)
       dates.push(n)
  }


return dates;


}

module.exports.getBalanceById = function(user_id, callback){


  let sql = "SET @budgetID = (SELECT budgetID FROM accounts WHERE accountID = ?);"
  +"SELECT date FROM budget WHERE budgetID = @budgetID"
  db.query(sql, [user_id], (err, date) => {
        let currDate = new Date()
        let qDate = new Date(date[1][0].date)
        console.log(currDate.getDate())
        console.log(qDate.getDate())

        if (currDate.getDate() != (qDate.getDate()+1)){
          console.log("BUDGET NEEDS TO BE UPDATED")

          let dateDiff = currDate.getDate()-(qDate.getDate()+1)
          console.log("Date DIFF: " + dateDiff)
          let missingDates = createInsertDates(currDate, dateDiff)

          for(let i = 0; i < missingDates.length; i++){
            console.log(missingDates[i])
            sql = "SET @budgetID = (SELECT budgetID FROM accounts WHERE accountID = ?);"
            +"INSERT INTO analysis (analysis_date, surplus) VALUES (?,(SELECT balance FROM budget WHERE budgetID = @budgetID))"
            db.query(sql, [user_id,missingDates[i]], err =>{
              console.log(err);
            })
          }
          sql = "SET @budgetID = (SELECT budgetID FROM accounts WHERE accountID = ?);"
          +"UPDATE budget SET date = curdate(), balance = balance + (daily_budget*?)*(1-savingPercentage);"
          +"SELECT SUM(amount) as trans_sum,daily_budget,balance, savingPercentage,date FROM budget JOIN transactions_budget USING(budgetID) JOIN transactions USING(transactionID) WHERE budgetID = @budgetID";
          db.query(sql, [user_id, dateDiff], (err, balance) => {
            callback(err, balance[balance.length-1][0]);
            console.log(err),
            console.log(balance[balance.length-1][0])
          });
        } else {
          sql = "SET @budgetID = (SELECT budgetID FROM accounts WHERE accountID = ?);"
          +"SELECT SUM(amount) as trans_sum,daily_budget,balance, savingPercentage,date FROM budget JOIN transactions_budget USING(budgetID) JOIN transactions USING(transactionID) WHERE budgetID = @budgetID";
          db.query(sql, [user_id], (err, balance) => {
                console.log(err);
                console.log(balance[1][0]);
            callback(err, balance[1][0]);
          });
        }
  });


}

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
  +"UPDATE budget SET daily_budget = daily_budget - ?/30, balance = balance - ?/30 WHERE budgetID = @budgetID;"
  +"SELECT * FROM income WHERE budgetID = @budgetID";
  db.query(sql, [incomeID,user_id, incomeAmount,incomeAmount], (err, incomes) => {
        console.log(err);
        console.log(incomes)
    callback(err, incomes[incomes.length-1]);
  });
}

module.exports.deleteExpenseById = function(user_id,expenseID,expenseAmount, callback){
  //console.log(expenseID)
  let sql = "DELETE FROM expenses WHERE expenseID = ?;"
  +"SET @budgetID = (SELECT budgetID FROM accounts WHERE accountID = ?);"
  +"UPDATE budget SET daily_budget = daily_budget + ?/30, balance = balance + ?/30 WHERE budgetID = @budgetID;"
  +"SELECT * FROM expenses WHERE budgetID = @budgetID";
  db.query(sql, [expenseID,user_id, expenseAmount, expenseAmount], (err, expenses) => {
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


module.exports.getBudgetById = function(user_id, callback){
  let sql = "SET @budgetID = (SELECT budgetID FROM accounts WHERE accountID = ?);"
  +"SELECT DISTINCT daily_budget, savingPercentage , "
   +"(SELECT SUM(amount) FROM income WHERE budgetID = @budgetID) AS total_income, "
   +"(SELECT SUM(amount) FROM expenses WHERE budgetID = @budgetID) AS total_expenses "
   +"FROM budget,income,expenses WHERE budget.budgetID = @budgetID;"

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
     "INSERT IGNORE INTO transactions (type, trans_date, amount) VALUES (?,now(),?);"
     +"SET @transactionID = LAST_INSERT_ID();"
     +"SET @budgetID = (SELECT budgetID FROM accounts WHERE accountID = ?);"
     +"INSERT INTO account_transactions (accounts_accountID,transactions_transactionID) VALUES(?, @transactionID);"
     +"INSERT INTO transactions_budget (budgetID, transactionID) VALUES (@budgetID,@transactionID);"
      +"UPDATE budget SET balance = balance + ? WHERE budgetID = @budgetID;"
  db.query(
    sql,
    [newTransaction.category, newTransaction.amount, user_id,user_id, newTransaction.amount],
    err => {
      console.log(err);
      callback(err);
    }
  );
};
module.exports.getTransactionsById = function(user_id, callback){
  // let sql = "SELECT date, type, amount FROM "+
  // "(SELECT * FROM transactions "+
  //   "NATURAL JOIN account_transactions " +
  //   "NATURAL JOIN accounts) as xd "+
  //   "WHERE accountID= ? " +
  //   "AND transactionID = transactions_transactionID "+
  //   "ORDER BY date";
  let sql = "SET @budgetID = (SELECT budgetID FROM accounts WHERE accountID = ?);"
  +"SELECT trans_date, type, amount, daily_budget, savingPercentage, transactionID FROM"
  +"(SELECT * FROM budget JOIN transactions_budget USING(budgetID) JOIN transactions USING(transactionID)) as xd "
  +"WHERE budgetID = @budgetID AND amount <> 0;"
  db.query(sql, [user_id], (err, transactions) => {
    console.log(transactions[1]);
        console.log(err);
    callback(err, transactions[1]);
  });





}
module.exports.addIncome = function(user_id, newIncome, callback) {
  //
  console.log(newIncome);
  let date = new Date();
  let day = date.getDate();
  let sql =
  "SET @budgetID = (SELECT budgetID FROM accounts WHERE accountID = ?);"
  +"INSERT INTO income (budgetID, type, amount) VALUES (@budgetID, ?, ?);"
+"UPDATE budget SET daily_budget = (daily_budget + ?/30), balance = (balance + ?/30)*(1-savingPercentage) WHERE budgetID = @budgetID;"

  db.query(
    sql,
    [user_id,newIncome.type,newIncome.amount, newIncome.amount, newIncome.amount],
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
+"UPDATE budget SET daily_budget = daily_budget - ?/30, balance = (balance - ?/30)*(1-savingPercentage) WHERE budgetID = @budgetID;"

  db.query(
    sql,
    [user_id,newExpense.type,newExpense.amount, newExpense.amount,newExpense.amount],
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
+"UPDATE budget SET savingPercentage = ?, balance = balance*(1-savingPercentage) WHERE budgetID = @budgetID;"

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
