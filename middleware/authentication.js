const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { UnauthenticatedError } = require('../errors');

const auth = (req, res, next) => {
    // check header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new UnauthenticatedError('Authentication invalid');
    }

    const token = authHeader.split(' ')[1];

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        // attach the user to the job routes
        const testUser = payload.userId === '63b10c10236b5e46b2bb72e4';
        console.log('test user ' + testUser);
        req.user = { userId: payload.userId, testUser };
        next();
    } catch (err) {
        throw new UnauthenticatedError('Authentication invalid');
    }
};

module.exports = auth;
