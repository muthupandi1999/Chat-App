const User = require('../models/userSchema');

const router = require('express').Router();

const bcrypt = require('bcryptjs')

const jwt = require('jsonwebtoken')


router.post('/login', async (req, res, next) => {

    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        return res.status(403).json("Invalid username and password")
    } else {



        const passwordValid = await bcrypt.compareSync(req.body.password, user.password);

        if (!passwordValid) {
            return res.status(400).json("Invalid username and password")
        } else {
            const token = jwt.sign({ id: user._id, email: user.email }, "pandi", { expiresIn: '2d' });

            res.cookie('token', token, { expiresIn: '2d' })

            return res.redirect('/home');

            
        }

    }



})

router.get('/home', (req, res) => {
    res.sendFile(__dirname + '/puplic/homepage.html')
})


router.get('/login', (req, res) => {
    res.sendFile(__dirname + '/puplic/login.html')
})
module.exports = router;