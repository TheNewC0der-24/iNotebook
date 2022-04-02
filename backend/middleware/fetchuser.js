var jwt = require('jsonwebtoken');
const JWT_SECRET = 'shhhhh';


const fetchuser = (req, res, next) => {

    //? Get the token from the header.
    const token = req.header('auth-token');

    //? Check if no token was provided.
    if (!token) {
        res.status(401).send({ error: 'No token, authorization denied' });
    }

    try {
        //? Verify the token.
        const decoded = jwt.verify(token, JWT_SECRET);

        //? Add the user from the decoded token to the request.
        req.user = decoded.user;
        next();
    } catch (error) {
        res.status(401).send({ error: 'Token is not valid' });
    }
}

module.exports = fetchuser;
