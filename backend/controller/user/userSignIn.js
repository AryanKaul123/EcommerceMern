const bcrypt = require('bcryptjs');
const userModel = require('../../models/userModel');
const jwt = require('jsonwebtoken');

async function userSignInController(req, res) {
    try {
        const { email, password } = req.body;

        if (!email) {
            throw new Error("Please provide email");
        }
        if (!password) {
            throw new Error("Please provide password");
        }

        const user = await userModel.findOne({ email });

        if (!user) {
            throw new Error("User not found");
        }

        const checkPassword = await bcrypt.compare(password, user.password);

        console.log("Password check result:", checkPassword);

        if (checkPassword) {
            const tokenData = {
                _id: user._id,
                email: user.email
            };
            const token = jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, { expiresIn: '8h' });

            const tokenOptions = {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production', // Secure only in production
                sameSite: 'None' // Adjust as necessary
            };

            res.cookie("token", token, tokenOptions).status(200).json({
                message: "Login successfully",
                data: token,
                success: true,
                error: false
            });

        } else {
            throw new Error("Invalid password");
        }

    } catch (err) {
        console.error("Sign-in error:", err);
        res.status(400).json({
            message: err.message || 'An error occurred',
            error: true,
            success: false
        });
    }
}

module.exports = userSignInController;
