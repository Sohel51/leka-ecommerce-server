const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username: {
        required: true,
        type: 'string',
    },
    role: {
        type: 'string',
        default: 'customer',
    },
    email: {
        required: true,
        type: 'string',
    },
    phone: {
        default: '',
        type: 'string',
    },
    password: {
        default: '',
        type: 'string',
    }
})

const userModel = mongoose.model('userModel', userSchema);
module.exports = userModel;