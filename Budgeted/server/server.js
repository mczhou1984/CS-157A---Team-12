const express = require('express');
const app = express();
const port = 5000;
const router = require('./routes');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('./config/database');
const passport = require('passport');
const passportFunct = require('./config/passport');

passportFunct(passport);

//db connection
const db = mysql.createConnection(config);

// Passport Middleware



app.use(cors());
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());
app.use('/user',router);


db.connect((err)=> {
  if(err){
    throw err;
  }
  console.log("MySQL connected");
});

app.listen(port, () => console.log(`Server started on port ${port}`));
