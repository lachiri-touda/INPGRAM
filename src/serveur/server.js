const express = require('express')
var cors = require('cors');

const app = express()
const https = require('httpolyglot')
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

const userapi = require('./routes/userapi');
const jwt = require('jsonwebtoken');

dotenv.config();



app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Connnection to Database
mongoose.connect(process.env.DB_URL,
    { useUnifiedTopology: true },
    () => console.log('Connected to DB!')
    );
    
//Middleware
app.use(express.json());
app.use('/',cors());


app.use('/',userapi);


app.get('/', function (req, res) {
    res.send('Hello World!')
  })

app.listen(3000, function () {
    console.log('Listening on port 3000...')
  })