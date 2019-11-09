const router = require('express').Router();
const User = require('../models/Users');
const { registerValidation, loginValidation } = require('../common/validation');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


/**
 * User Registration Endpoint
 * Parameters - name : string
 * email: string
 * password: string
 * */ 

router.post('/register', async (req, res) => {
    let { error } = registerValidation(req.body);
    let errorMsg = `${error}`;
    if (error) return res.status(400).send(errorMsg);

    // Checking if email already exist
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).send("Email already Exist in Database.");

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
    try {
        let savedUser = await user.save();
        res.send(JSON.stringify({"msg":"User Successfully Created","data":savedUser}));
    } catch (err) {
        res.status(400).send(err);
    }

})

/**
 * User login Endpoint
 * Parameters - 
 * email: string
 * password: string
 * */ 

router.post('/login', async (req, res) => {
    let { error } = loginValidation(req.body);
    let errorMsg = `${error}`;
    if (error) return res.status(400).send(errorMsg);

    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("Email or Password is wrong");

    // Password comparison
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send("Email or Password is wrong");

    // Create an token
    const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY, { expiresIn: '1h' });
    res.header('auth-token', token).send(JSON.stringify({"msg":"Successfully Loggedin.","auth-token":token}));

})

module.exports = router;