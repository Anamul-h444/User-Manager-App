var jwt = require('jsonwebtoken')
exports.TokenVerify = (req, res, next) => {
    var token = req.headers["token"];
    jwt.verify(token, "secretKey123", (err, decoded) => {
        console.log("From Verify Middleware", decoded)
        if (err) {
            res.status(401).send(err)
        } else {
            let email = decoded.user['email'];
            req.headers.email = email;
            let role = decoded.user['role']
            req.headers.role = role;
            next();

        }
    })

}

