const express = require('express')
const bodyParser = require('body-parser')
const app = express();

const path = require('path');

const User = require('./models/userSchema');

const mongoose = require('mongoose');

const server = require('http').createServer(app);

const io = require('socket.io')(server)

// const io = require('socket.io')(server)

app.use(express.static(path.join(__dirname, "/public")));

app.use(bodyParser.urlencoded({ extended: true }))

app.set('view engine', 'ejs');

mongoose.set('strictQuery', false);

const uri = 'mongodb://localhost:27017/Chat-Html';

mongoose.connect(uri)
    .then(() => console.log('Connected to MongoDB'))
    .catch(error => console.error(error));


io.on('connection', function (socket) {
    socket.on('newuser', function (username) {
        socket.broadcast.emit('update', username + " Joined the conversation");
    })

    socket.on('exituser', function (username) {
        socket.broadcast.emit('update', username + " left the conversation");
    })

    socket.on('chat', function (message) {
        socket.broadcast.emit('chat', message)
    })
})

// app.post('/register', async (req, res) => {
//     const name = req.body.name;
//     const email = req.body.email;
//     const password = req.body.password;

//     const User_ = await new User({
//         name: name,
//         email: email,
//         password: password

//     })

//     await User_.save();
//     console.log(path.join(__dirname + '/public/login.html'))
//     res.sendFile(__dirname + '/puplic/login.html');
// })

app.use('/', require('./routes/register'))
app.use('/', require('./routes/login'))

app.listen(3500, () => {
    console.log('Server listening on port 3500')
})

