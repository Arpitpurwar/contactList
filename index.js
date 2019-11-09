// Dependecies

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();


//DB Connection

mongoose.connect(process.env.PHONEBOOK_DB_URI,{ useNewUrlParser: true, useUnifiedTopology: true },()=>{
    console.log("DB Connected");
});
mongoose.Promise = global.Promise;

//Application Middleware

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Import Routes
const authRoute = require('./routes/auth');
const contactRoute = require('./routes/contacts');

// Register api routes
app.use('/api/user',authRoute);
app.use('/api',contactRoute);


// Port setup 
let port = process.env.PORT || 3000;
app.listen(port,()=>console.log(`listening on port ${port}`));