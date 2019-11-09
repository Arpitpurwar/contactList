const router = require('express').Router();
const User = require('../models/User');
const ensureAuth = require('./VerifyToken');


router.get('/getData',ensureAuth, async (req,res)=>{
    console.log(req.user)
        res.status(200).send("hello");
})



module.exports = router