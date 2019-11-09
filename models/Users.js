const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const saltRounds = 10;
  
const UserSchema = new Schema({
    name: {
     type: String,
     trim: true,  
     min:6,
     max:255,
     required: true,
    },
    email: {
     type: String,
     trim: true,
     min:6,
     max:255,
     required: true
    },
    password: {
     type: String,
     trim: true,
     min: 7,
     max: 1024,
     required: true
    },
    date:{
        type: Date,
        default: Date.now
    }
   });
   
   // hash user password before saving into database
   UserSchema.pre('save', function(next){
   this.password = bcrypt.hashSync(this.password, saltRounds);
   next();
   });
   
   
module.exports = mongoose.model('User', UserSchema);
