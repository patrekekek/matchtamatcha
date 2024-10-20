const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true,
    }, 
    lastName: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['user', 'admin', 'owner'],
        default: 'user',
        required: true
    }
})


//static signup method
userSchema.statics.signup = async function(email, password, firstName, lastName, address, role = 'user') {

    //validation
    if (!email || !password || !firstName || !lastName || !address) {
        throw Error('All fields must be complete');
    }
    if (!validator.isEmail(email)) {
        throw Error('Email is not valid');
    }
    if (!validator.isStrongPassword(password)) {
        throw Error('Password is not strong enough');
    }
    if (!['user', 'admin', 'owner'].includes(role)) {
        throw Error('Invalid Role');
    }

    const exists = await this.findOne({ email });

    if (exists) {
        throw Error('Email is already in use');
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await this.create({ email, password: hash, firstName, lastName, address, role });

    return user;
}


//static login method
userSchema.statics.login = async function(email, password) {

    //validation
    if (!email || !password) {
        throw Error('All fields must be complete');
    }

    const user = await this.findOne({ email });

    if (!user) {
        throw Error('User does not exist');
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
        throw Error('Password incorrect');
    }
        
    return user;
}

module.exports = mongoose.model('User', userSchema);