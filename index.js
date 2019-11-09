// Dependecies

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();


//Connect to DB

mongoose.connect(process.env.PHONEBOOK_DB_URI,{ useNewUrlParser: true, useUnifiedTopology: true },()=>{
    console.log("DB Connected");
});
mongoose.Promise = global.Promise;

//middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Import Routes
const authRoute = require('./routes/auth');
const contactRoute = require('./routes/contacts');

//Route Middleware
app.use('/api/user',authRoute);
app.use('/api',contactRoute);



app.listen(3000,()=>console.log('Running on 3000'));