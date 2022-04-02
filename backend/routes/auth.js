const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = 'shhhhh';

//~ Create a User using POST "/api/auth/createuser".
//~ Dosn't need to be authenticated.

// ROUTE: 1 /api/auth/createuser 
router.post('/createuser', [
    body('name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 5 chracters').isLength({ min: 5 }),
], async (req, res) => {
    let success = false;
    //? If there are errors, return 400 (Bad) status code and errors. 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }
    try {
        //?  Check if the user already exists with this email.
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ success, errors: [{ msg: 'User already exists' }] });
        }
        //? Hash the password. await because it is a promise.
        const salt = await bcrypt.genSaltSync(10);
        secPassword = await bcrypt.hash(req.body.password, salt);
        //? Create a new user
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPassword,
        });

        //? Return the user.
        const data = {
            user: {
                id: user.id
            }
        }

        //? Create a token.
        const authToken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({ success, authToken });

        // res.json(user);

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});



//~ Authenticate a user. 
// ROUTE: 2 /api/auth/login
router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Enter the Correct Password').exists(),
], async (req, res) => {
    let success = false;
    //? If there are errors, return 400 (Bad) status code and errors.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "Sorry, user does not exist" });
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            success = false;
            return res.status(400).json({ success, error: "Sorry, password is incorrect" });
        }

        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({ success, authToken });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

// ROUTE: 3 /api/auth/getuser
//~ Login required.
router.post('/getuser', fetchuser, async (req, res) => {
    try {
        userId = req.user.id;
        const user = await User.findById(userId).select('password');
        res.send(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;