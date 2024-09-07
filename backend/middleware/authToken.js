const jwt = require('jsonwebtoken');

async function authToken(req, res, next) {
    try {
        const token = req.cookies?.token;
        
        console.log("Token received:", token);

        if (!token) {
            return res.status(401).json({
                message: "Please Login...!",
                error: true,
                success: false
            });
        }

        jwt.verify(token, process.env.TOKEN_SECRET_KEY, (err, decoded) => {
            if (err) {
                console.log("Error verifying token:", err);
                return res.status(401).json({
                    message: "Invalid or expired token",
                    error: true,
                    success: false
                });
            }

            console.log("Decoded token:", decoded);
            req.userId = decoded?._id; // Attach user ID to request

            next();
        });

    } catch (err) {
        console.error("Middleware error:", err);
        res.status(400).json({
            message: err.message || 'An error occurred',
            data: [],
            error: true,
            success: false
        });
    }
}

module.exports = authToken;
