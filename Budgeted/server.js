const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 5000;


//db connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password:'password',
  database: 'budgeteddb'
});

db.connect((err)=> {
  if(err){
    throw err;
  }
  console.log("MySQL connected");
});

app.listen(port, () => console.log(`Server started on port ${port}`));

app.get('/user/profile', (req, res) => {
  let sql = 'SELECT accountId,name, email FROM accounts';
  db.query(sql, (err, result) =>{
    if (err) throw err;
    res.json(result);
  })

})
