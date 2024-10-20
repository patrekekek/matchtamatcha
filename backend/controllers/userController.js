const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '2d' });
}


//loggin in
const loginUser = async (req, res) => {
    const {email, password} = req.body;

    try {
        const user = await User.login(email, password);
        const role = user.role;
        //creating token
        const token = createToken(user._id);
        const id = user._id;
        
        res.status(200).json({email, token, role, id});
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

//signing up
const signupUser = async (req, res) => {
    const {email, password, firstName, lastName, address, role = 'user'} = req.body;


    
    try {
        const user = await User.signup(email, password, firstName, lastName, address, role);

        //creating token
        const token = createToken(user._id);
        const id = user._id;
        
        res.status(200).json({email, token, role, id});
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = { loginUser, signupUser };