const mongoose = require('mongoose');


const usersSchema = new mongoose.Schema({

    username: {
        type: String,
        unique: true,
        require: true
    },
    password: {
        type: String,
        minlength: 5,
        require: true
    },
    created: {
        type: Date,
        default: Date.now
    },
    isdeleted: {
        type: Boolean,
        default: false
    }
});

const Users = module.exports = mongoose.model('User', usersSchema);
