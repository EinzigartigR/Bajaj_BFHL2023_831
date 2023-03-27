const User = require('../models/user.model');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var otp = '';
const client = require('twilio')(process.env.accountSid, process.env.authToken);
require('dotenv').config();

exports.signUp = async function (req, res) {
    const user = await new User({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
    })
    user.save(err => {
        if (err) {
            res.status(500).send({ message: err });
        }
        res.send({ message: "User was registered successfully!" });
    });
}

exports.signIn = (req, res) => {
    var token = jwt.sign({ id: req.body.username }, process.env.secret, {
        expiresIn: 86400 //24hr
    })
    res.status(200).send({
        user: req.body.username, access_token: token
    });

}

function OTP() {
    const digits = '0123456789';
    let otp = '';
    for (let i = 0; i < 6; i++) {
        otp += digits[Math.floor(Math.random() * digits.length)];
    }
    return otp;
}

exports.generateOTP = (req, res) => {
    otp = OTP();
    client.messages
        .create({
            body: 'Your OTP for verification is : ' + otp,
            from: process.env.twilioNumber, // Twilio number
            to: req.body.phoneNumber // Mobile number
        })
        .then(message =>
            res.status(200).send({
                message
            })
        );
}

exports.validateOTP = (req, res) => {
    if (!otp) {
        code = 401;
        message = "Please call the generateOTP API first"
    }
    else if (req.body.otp == otp && !otp) {
        code = 200;
        message = "User mobile has been verified"
    }
    else {
        code = 400;
        message = "You may have entered the wrong OTP"
    }
    res.status(code).send(message);
}
