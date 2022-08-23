const jwt = require("jsonwebtoken");
const sign = process.env.SIGN;

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        verifiedTkn = jwt.verify(token, sign);
        const userId = verifiedTkn.userId;
        const isAdmin = verifiedTkn.isAdmin;

        req.auth = {
            userId: userId,
            isAdmin: isAdmin
        };
        next();
    } catch(error) {
        res.status(403).json({ error });
    }
};