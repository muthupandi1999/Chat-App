const User = require('../models/userSchema');

const router = require('express').Router();

const bcrypt = require('bcryptjs');

const path = require('path')

router.post('/register', async (req, res) => {

    const userExist = await User.findOne({ email: req.body.email });


    if (userExist) {
        res.status(400).json("User already exists")
    }

    const hashPassword = await bcrypt.hash(req.body.password, 10)
    const User_ = await new User({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword,
    })

    // console.log(path.dirname('/puplic', 'login.html'))

    // console.log(path.join(__filename + '/puplic/login.html'))

    await User_.save();

    return res.redirect('/login');

 
})


router.get('/register', (req, res) => {
    res.sendFile(__dirname + '/puplic/index.html')
})

module.exports = router;