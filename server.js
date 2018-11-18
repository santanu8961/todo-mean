const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express()

const index = require('./routes/index');
const todos = require('./routes/todos');
var dbConfig = require('./db');

const mongoose = require('mongoose');
// Connect to DB
mongoose.connect(dbConfig.url);

// view Engine Setup
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');
app.engine('html',require('ejs').renderFile);

// client setup 
app.use(express.static(path.join(__dirname,'client')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use('/',index);
app.use('/api/v1',todos);

var port = 3000;
app.listen(port,()=>{
    console.log(`server started on ${port} ... `);
});
