const router = require('express').Router();
const User = require('../models/User');
const { registerValidation , loginValidation } = require('../common/validation');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


router.post('/register',async (req,res)=>{
    let {error} = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    // Checking if email already exist
    const emailExist = await User.findOne({email:req.body.email});
    if(emailExist) return res.status(400).send({"data":null,"msg":"This Email already Exist. Please try One more"});

       const user = new User({
           name:req.body.name,
           email:req.body.email,
           password:req.body.password
       });
       try{

        const savedUser =   await user.save();
        res.send(savedUser);
       }catch(err){
           res.status(400).send(err);
       }

})


router.post('/login',async (req,res)=>{
    let {error} = loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const user = await User.findOne({email:req.body.email});
    if(!user) return res.status(400).send({"data":null,"msg":"This Email or Password is wrong"});

    // Password is Correct
    const validPass = await bcrypt.compare(req.body.password,user.password);
    if(!validPass) return res.status(400).send({"data":null,"msg":"This Email or Password is wrong"});

    // Create an token
    const token = jwt.sign({_id:user._id},process.env.SECRET_KEY,{ expiresIn: '1m' });
     res.header('auth-token',token).send(token);

})

module.exports = router;