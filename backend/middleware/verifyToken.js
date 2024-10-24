const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const verifyToken = async (req, res, next) => {

    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({error: 'Authorization token required'});
    }

    const token = authorization.split(' ')[1];

    try {
        const {_id} = jwt.verify(token, process.env.SECRET);
        
        req.user = await User.findOne({_id});
        
        next();
    } catch (error) {
        res.status(400).json({ message: 'Invalid token'})
    }
};

module.exports = verifyToken;