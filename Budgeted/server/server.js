const express = require('express');
const app = express();
const port = 5000;
const router = require('./routes');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');


//db connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password:'password',
  database: 'budgeteddb'
});


app.use(cors());
app.use(bodyParser.json());
app.use('/user',router);


db.connect((err)=> {
  if(err){
    throw err;
  }
  console.log("MySQL connected");
});

app.listen(port, () => console.log(`Server started on port ${port}`));