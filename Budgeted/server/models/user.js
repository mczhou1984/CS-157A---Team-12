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
      +"INSERT INTO account_transactions (accountID,transactionID) VALUES(@accountID, @transactionID);"
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
    currDate.setDate(currDate.getDate()-1)
    let n = currDate.getUTCFullYear() + '-' +
       ('00' + (currDate.getUTCMonth()+1)).slice(-2) + '-' +
       ('00' + (currDate.getUTCDate())).slice(-2)
       dates.push(n)

    console.log(n);
  }


return dates;


}

module.exports.getAnalysisByID = function(user_id, callback){
  let sql = "SET @budgetID = (SELECT budgetID FROM accounts WHERE accountID = ?);"
  +"SELECT surplus, analysis_date FROM budget NATURAL JOIN budget_analysis NATURAL JOIN analysis WHERE budgetID = @budgetID "
  +"ORDER BY analysis_date LIMIT 7"

  db.query(sql, [user_id], (err, analysis) =>{
      console.log(err)
      callback(err,analysis[1])

  })
}


module.exports.getFrequentExpensesByID = function(user_id, callback){
  let sql = "SELECT type, count(type) as count FROM frequent_expenses WHERE accountID = ? GROUP BY type ORDER BY count(type) DESC;"
  db.query(sql, [user_id], (err, expenses) =>{
    console.log(err)
    callback(err,expenses)
  })
}

module.exports.getBalanceById = function(user_id, callback){


  let sql = "SET @budgetID = (SELECT budgetID FROM accounts WHERE accountID = ?);"
  +"SELECT date FROM budget WHERE budgetID = @budgetID"
  db.query(sql, [user_id], (err, date) => {
        let currDate = new Date()
        let qDate = new Date(date[1][0].date)
        qDate.setDate(qDate.getDate()+1)
        let timeDiff = currDate.getTime() - qDate.getTime();
        let dateDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
        console.log("DATE DIFFERENCE: " + dateDiff)
        console.log(currDate.getDate())
        console.log(qDate.getDate())
        if(dateDiff === "0" && currDate.getDate() != qDate.getDate()){
          dateDiff = currDate.getDate() - qDate.getDate()
        }

        if (dateDiff > 0){
          let missingDates = createInsertDates(currDate, dateDiff)

          for(let i = 0; i < missingDates.length; i++){
            console.log(missingDates[i])
            sql = "SET @budgetID = (SELECT budgetID FROM accounts WHERE accountID = ?);"
            +"INSERT INTO analysis (analysis_date, surplus) VALUES (?,(SELECT balance FROM budget WHERE budgetID = @budgetID));"
            +"SET @analysisID = LAST_INSERT_ID();"
            +"INSERT INTO budget_analysis (budgetID, analysisID) VALUES (@budgetID, @analysisID);"
            +"INSERT IGNORE INTO transactions (type, trans_date, amount) VALUES ('Daily Budget',?,(SELECT (daily_budget*(1-savingPercentage)) FROM budget WHERE budgetID = @budgetID));"
            +"SET @transactionID = LAST_INSERT_ID();"
            +"INSERT INTO account_transactions (accountID,transactionID) VALUES(?, @transactionID);"
            +"INSERT INTO transactions_budget (budgetID, transactionID) VALUES (@budgetID,@transactionID);"
            db.query(sql, [user_id,missingDates[i],missingDates[i], user_id], err =>{
              console.log(err);
            })
          }
          sql = "SET @budgetID = (SELECT budgetID FROM accounts WHERE accountID = ?);"
          +"INSERT INTO analysis (analysis_date, surplus) VALUES (curdate(),(SELECT balance FROM budget WHERE budgetID = @budgetID));"
          +"SET @analysisID = LAST_INSERT_ID();"
          +"INSERT INTO budget_analysis (budgetID, analysisID) VALUES (@budgetID, @analysisID);"
          +"UPDATE budget SET date = curdate(), balance = balance + (daily_budget*?)*(1-savingPercentage) WHERE budgetID = @budgetID;"
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
  +"UPDATE budget SET balance = balance - daily_budget*(1-savingPercentage),daily_budget = daily_budget - ?/30, balance = balance + daily_budget WHERE budgetID = @budgetID;"
  +"UPDATE transactions SET amount = (SELECT (daily_budget*(1-savingPercentage)) FROM budget WHERE budgetID = @budgetID) WHERE type = 'Daily Budget';"
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
  +"UPDATE budget SET balance = balance - daily_budget*(1-savingPercentage), daily_budget = daily_budget + ?/30, balance = balance + daily_budget WHERE budgetID = @budgetID;"
  +"UPDATE transactions SET amount = (SELECT (daily_budget*(1-savingPercentage)) FROM budget WHERE budgetID = @budgetID) WHERE type = 'Daily Budget';"
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
  if(newTransaction.amount < 0){
    let sql = "INSERT INTO frequent_expenses (type, accountID) values (?,?)"
    db.query(sql, [newTransaction.category, user_id], err => {
      console.log(err)
    })
  }
  let sql =
     "INSERT IGNORE INTO transactions (type, trans_date, amount) VALUES (?,now(),?);"
     +"SET @transactionID = LAST_INSERT_ID();"
     +"SET @budgetID = (SELECT budgetID FROM accounts WHERE accountID = ?);"
     +"INSERT INTO account_transactions (accountID,transactionID) VALUES(?, @transactionID);"
     +"INSERT INTO transactions_budget (budgetID, transactionID) VALUES (@budgetID,@transactionID);"
     +"UPDATE budget SET balance = balance + ? WHERE budgetID = @budgetID;"
     +"UPDATE analysis SET surplus = surplus + ? WHERE analysisID IN (SELECT analysisID FROM (SELECT analysisID FROM budget NATURAL JOIN budget_analysis NATURAL JOIN analysis WHERE budgetID = @budgetID AND analysis_date = curdate()) AS tmp);"
  db.query(
    sql,
    [newTransaction.category, newTransaction.amount, user_id,user_id, newTransaction.amount,newTransaction.amount],
    err => {
      console.log(err);
      callback(err);
    }
  );
};
module.exports.getTransactionsById = function(user_id, callback){
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

  let sql =   "SET @budgetID = (SELECT budgetID FROM accounts WHERE accountID = ?);"
  +"SELECT * FROM transactions NATURAL JOIN transactions_budget NATURAL JOIN budget WHERE budgetID = @budgetID AND type = 'Daily Budget' AND amount > 0;"
  db.query(
    sql,
    [user_id],
    (err,results) => {
        console.log(err);
        console.log("RESULTS:------------")
        console.log(results[1])
        if (results[1].length === 0){
          console.log("DAILY BUDGET DOES NOT EXIST")
          sql =
          "SET @budgetID = (SELECT budgetID FROM accounts WHERE accountID = ?);"
          +"INSERT INTO income (budgetID, type, amount) VALUES (@budgetID, ?, ?);"
          +"UPDATE budget SET balance = balance - daily_budget*(1-savingPercentage), daily_budget = (daily_budget + ?/30), balance = balance + daily_budget WHERE budgetID = @budgetID;"
          +"INSERT IGNORE INTO transactions (type, trans_date, amount) VALUES ('Daily Budget',curdate(),(SELECT (daily_budget*(1-savingPercentage)) FROM budget WHERE budgetID = @budgetID));"
          +"SET @transactionID = LAST_INSERT_ID();"
          +"INSERT INTO account_transactions (accountID,transactionID) VALUES(?, @transactionID);"
          +"INSERT INTO transactions_budget (budgetID, transactionID) VALUES (@budgetID,@transactionID);"
          db.query(
            sql,
            [user_id,newIncome.type,newIncome.amount, newIncome.amount, newIncome.amount, user_id],
            err => {
              console.log(err);
              callback(err);
            }
          );
        } else {
          console.log("DAILY BUDGET ALREADY EXSIST")
          sql =
          "SET @budgetID = (SELECT budgetID FROM accounts WHERE accountID = ?);"
          +"INSERT INTO income (budgetID, type, amount) VALUES (@budgetID, ?, ?);"
          +"UPDATE budget SET balance = balance - daily_budget*(1-savingPercentage), daily_budget = (daily_budget + ?/30), balance = balance + daily_budget WHERE budgetID = @budgetID;"
          +"UPDATE transactions SET amount = (SELECT (daily_budget*(1-savingPercentage)) FROM budget WHERE budgetID = @budgetID) WHERE type = 'Daily Budget'"

          db.query(
            sql,
            [user_id,newIncome.type,newIncome.amount, newIncome.amount, newIncome.amount],
            err => {
              console.log(err);
              callback(err);
            }
          );
        }
    }
  );

};

module.exports.addExpense = function(user_id, newExpense, callback) {
  //
  console.log(newExpense);
  let date = new Date();
  let day = date.getDate();

  let sql =   "SET @budgetID = (SELECT budgetID FROM accounts WHERE accountID = ?);"
  +"SELECT * FROM transactions NATURAL JOIN transactions_budget NATURAL JOIN budget WHERE budgetID = @budgetID AND type = 'Daily Budget' AND amount > 0;"
  db.query(
    sql,
    [user_id],
    (err,results) => {
        console.log(err);
        console.log("RESULTS: " + results)
        if (results[1].length === 0){
          sql =
          "SET @budgetID = (SELECT budgetID FROM accounts WHERE accountID = ?);"
          +"INSERT INTO expenses (budgetID, type, amount) VALUES (@budgetID, ?, ?);"
          +"UPDATE budget SET  balance = balance - daily_budget*(1-savingPercentage),daily_budget = (daily_budget - ?/30), balance = balance + daily_budget WHERE budgetID = @budgetID;"
          +"INSERT IGNORE INTO transactions (type, trans_date, amount) VALUES ('Daily Budget',curdate(),(SELECT (daily_budget*(1-savingPercentage)) FROM budget WHERE budgetID = @budgetID));"
          +"SET @transactionID = LAST_INSERT_ID();"
          +"INSERT INTO account_transactions (accountID,transactionID) VALUES(?, @transactionID);"
          +"INSERT INTO transactions_budget (budgetID, transactionID) VALUES (@budgetID,@transactionID);"
          db.query(
            sql,
            [user_id,newExpense.type,newExpense.amount, newExpense.amount, newExpense.amount, user_id],
            err => {
              console.log(err);
              callback(err);
            }
          );
        } else {
          sql =
          "SET @budgetID = (SELECT budgetID FROM accounts WHERE accountID = ?);"
          +"INSERT INTO expenses (budgetID, type, amount) VALUES (@budgetID, ?, ?);"
          +"UPDATE budget SET balance = balance - daily_budget*(1-savingPercentage), daily_budget = (daily_budget - ?/30), balance = balance + daily_budget WHERE budgetID = @budgetID;"
          +"UPDATE transactions SET amount = (SELECT (daily_budget*(1-savingPercentage)) FROM budget WHERE budgetID = @budgetID) WHERE type = 'Daily Budget'"

          db.query(
            sql,
            [user_id,newExpense.type,newExpense.amount, newExpense.amount, newExpense.amount],
            err => {
              console.log(err);
              callback(err);
            }
          );
        }
    }
  );
}
module.exports.addSavings = function(user_id, saving, callback) {
  //
  console.log(saving);
  let sql =
  "SET @budgetID = (SELECT budgetID FROM accounts WHERE accountID = ?);"
+"UPDATE budget SET savingPercentage = ?, balance = balance*(1-savingPercentage) WHERE budgetID = @budgetID;"
+"UPDATE transactions SET amount = (SELECT (daily_budget*(1-savingPercentage)) FROM budget WHERE budgetID = @budgetID) WHERE type = 'Daily Budget'"

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
