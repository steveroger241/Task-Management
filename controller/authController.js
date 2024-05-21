const authModel = require('../model/authModel.js');
const { hashPassword, comparePassword } = require('../helpers/hashPassword.js')
const jwt = require('jsonwebtoken');

async function signupController(req, res) {
    try {
        if (!req.body.email || !req.body.password) {
            return res.send({
                success: false,
                error: "All fields are required"
            });
        }

        const existinguser = await authModel.findOne({ email: req.body.email });
        if (existinguser) {
            return res.send({
                success: false,
                error: "Email already exist do login"
            });
        }

        const newpass = await hashPassword(req.body.password);

        const result = await authModel.create({
            email: req.body.email,
            password: newpass
        });

        const secretKey = 'conciouslygeneratedsecretkey';
        const token = jwt.sign({ _id: result._id }, secretKey, { expiresIn: "7d" });
        if (result) {
            return res.send({
                success: true,
                message: "Signup successfull",
                result: {
                    email: result.email,
                    token: token
                }
            });
        }
        else {
            return res.send({
                success: false,
                error: "Error while registering user"
            });
        }
    }
    catch (err) {
        console.log("Server error is: ", err);
        return res.send("Server error from signup");
    }
}

async function signinController(req, res) {
    try {
        if (!req.body.email || !req.body.password) {
            return res.send({
                success: false,
                error: "All fields are required"
            });
        }

        const result = await authModel.findOne({ email: req.body.email });
        if (!result) {
            return res.send({
                success: false,
                error: "Email doesn't exist do signup or register"
            });
        }

        const match = await comparePassword(req.body.password, result.password);
        if (!match) {
            return res.send({
                success: false,
                error: "Passwords don't match"
            })
        }

        const secretKey = 'conciouslygeneratedsecretkey';
        const token = jwt.sign({ _id: result._id }, secretKey, { expiresIn: "7d" });
        return res.send({
            success: true,
            message: "Login successfull",
            result: {
                email: result.email,
                token: token
            }
        })
    }
    catch (err) {
        console.log("Server error is: ", err);
        return res.send("Server error from signin");
    }
}

module.exports = { signupController, signinController };