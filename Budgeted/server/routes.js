const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const config = require("./config/database");
const User = require("./models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require("passport");
// require('./config/passport')(passport);

const db = mysql.createConnection(config);

router.get("/profile", (req, res) => {
  let sql = "SELECT accountId,name, email FROM accounts";
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});
router.post("/register", (req, res) => {
  const user = req.body;
  User.addUser(user, err => {
    if (err) {
      res.json({success: false, msg: "Failed to register user"});
    } else {
      res.json({success: true, msg: "User registered"});
    }
  });
});

router.get(
  "/dashboard",
  passport.authenticate("jwt", {session: false}),
  (req, res, next) => {
    res.json({user: req.user});
  }
);

router.post("/transaction", verifyToken, (req, res) => {
  jwt.verify(req.token, "yoursecret", (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      let id = authData.data[0].accountId;
      let newTransaction = {
        category: req.body.category,
        amount: req.body.amount,
        date: new Date()
          .toJSON()
          .slice(0, 10)
          .replace(/-/g, "/")
      };
      console.log(newTransaction.date)
      //console.log(newTransaction);
      User.addTransaction(id, newTransaction, err => {
        if (err) {
          res.json({success: false, msg: "Failed to add transaction"});
        } else {
          return res.json({success: true, msg: "Transaction added!"});
        }
      });
    }
  });
});

router.post("/budget/income", verifyToken, (req, res) => {
  jwt.verify(req.token, "yoursecret", (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      let id = authData.data[0].accountId;
      let newIncome = {
        type: req.body.type,
        amount: req.body.amount
      };
      console.log(newIncome)
      User.addIncome(id, newIncome, err => {
        if (err) {
          res.json({success: false, msg: "Failed to add income"});
        } else {
          return res.json({success: true, msg: "income added!"});
        }
      });
    }
  });
});

router.get(
  "/budget/income",
  passport.authenticate("jwt", {session: false}),
  (req, res, next) => {
    console.log(req.user[0].accountId);
    let user_id = req.user[0].accountId;
    User.getIncomeById(user_id, (err, income) =>{
      if (err){
        res.json({
          success:false,
          msg:"Failed to get income data"
        })
      } else {
        res.json({
          success:true,
          income:income
        })
      }
    });

  }
);

router.get(
  "/budget/expense",
  passport.authenticate("jwt", {session: false}),
  (req, res, next) => {
    console.log(req.user[0].accountId);
    let user_id = req.user[0].accountId;
    User.getExpensesByID(user_id, (err, expense) =>{
      if (err){
        res.json({
          success:false,
          msg:"Failed to get expense data"
        })
      } else {
        res.json({
          success:true,
          expense:expense
        })
      }
    });

  }
);


router.post("/budget/deleteincome", verifyToken, (req, res) => {
  jwt.verify(req.token, "yoursecret", (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      let id = authData.data[0].accountId;
      let incomeID = req.body.incomeID;
      let incomeAmount = req.body.amount;

      //console.log(incomeAmount)
      User.deleteIncomeById(id, incomeID,incomeAmount, (err,income) => {
        if (err) {
          res.json({success: false, msg: "Failed to delete income"});
        } else {
          return res.json({
            success: true,
            msg: "income delete!",
            income:income
        });
        }
      });
    }
  });
});

router.post("/budget/deleteexpense", verifyToken, (req, res) => {
  jwt.verify(req.token, "yoursecret", (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      let id = authData.data[0].accountId;
      let expenseID = req.body.expenseID;
      let expenseAmount = req.body.amount;
      console.log(req.body)
      //console.log(incomeAmount)
      User.deleteExpenseById(id, expenseID,expenseAmount, (err,expense) => {
        if (err) {
          res.json({success: false, msg: "Failed to delete expense"});
        } else {
          return res.json({
            success: true,
            msg: "expense deleted!",
            expense:expense
        });
        }
      });
    }
  });
});


router.post("/budget/expense", verifyToken, (req, res) => {
  jwt.verify(req.token, "yoursecret", (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      let id = authData.data[0].accountId;
      let newExpense = {
        type: req.body.type,
        amount: req.body.amount
      };
      console.log(newExpense)
      User.addExpense(id, newExpense, err => {
        if (err) {
          res.json({success: false, msg: "Failed to add expense"});
        } else {
          return res.json({success: true, msg: "expense added!"});
        }
      });
    }
  });
});
router.post("/budget/savings", verifyToken, (req, res) => {
  jwt.verify(req.token, "yoursecret", (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      let id = authData.data[0].accountId;
      let newSavings = {
        percent:req.body.percent
      };
      console.log(newSavings)
      User.addSavings(id, newSavings, err => {
        if (err) {
          res.json({success: false, msg: "Failed to add saving"});
        } else {
          return res.json({success: true, msg: "saving added!"});
        }
      });
    }
  });
});

router.get(
  "/budget",
  passport.authenticate("jwt", {session: false}),
  (req, res, next) => {
    console.log(req.user[0].accountId);
    let user_id = req.user[0].accountId;
    User.getBudgetById(user_id, (err, budget) =>{
      if (err){
        res.json({
          success:false,
          msg:"Failed to get budget data"
        })
      } else {
        res.json({
          success:true,
          budget:budget
        })
      }
    });

  }
);

router.get(
  "/transactions",
  passport.authenticate("jwt", {session: false}),
  (req, res, next) => {
    console.log(req.user[0].accountId);
    let user_id = req.user[0].accountId;
    User.getTransactionsById(user_id, (err, transactions) =>{
      if (err){
        res.json({
          success:false,
          msg:"Failed to get Transaction history"
        })
      } else {
        res.json({
          success:true,
          transactions:transactions
        })
      }
    });

  }
);

// Verify Token
function verifyToken(req, res, next) {
  // Get auth header value
  const bearerHeader = req.headers["authorization"];
  // Check if bearer is undefined
  if (typeof bearerHeader !== "undefined") {
    // Split at the space
    const bearer = bearerHeader.split(" ");
    // Get token from array
    const bearerToken = bearer[1];
    // Set the token
    req.token = bearerToken;
    // Next middleware
    next();
  } else {
    // Forbidden
    res.sendStatus(403);
  }
}

router.post("/authenticate", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  User.getUserByEmail(email, (err, user) => {
    if (err) throw err;
    if (user === undefined || user.length == 0) {
      res.json({success: false, msg: "User not found"});
    } else {
      User.comparePassword(password, user[0].password, (err, isMatch) => {
        if (err) throw err;
        if (isMatch) {
          const token = jwt.sign({data: user}, config.secret, {
            expiresIn: 604800 // 1 week
          });

          res.json({
            success: true,
            token: "Bearer " + token,
            user: {
              id: user[0].accountId,
              name: user[0].name,
              username: user[0].username
            }
          });
        } else {
          res.json({success: false, msg: "Wrong password"});
        }
      });
    }
  });
});

module.exports = router;
