const jwt = require('jwt');

export async function verifyToken(req, res, next) {
    try {
        const secretKey = 'conciouslygeneratedsecretkey';
        if (req.headers.authorization) {
            const decode = jwt.verify(req.headers.authorization, secretKey);
            req.sameName = decode;
            next();
        }
        else {
            return;
        }
    }
    catch (err) {
        return res.send("Internal server error");
    }
}