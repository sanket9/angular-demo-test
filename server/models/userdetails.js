const mongoose = require('mongoose');


const usersDetailsSchema = new mongoose.Schema({

    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    name: {
        type: String
    },
    father_name: {
        type: String
    },
    email: {
        type: String
    },
    phone: {
        type: Number
    },
    address : {
        street: {
            type: String
        },
        city: {
            type: String
        },
        country: {
            type: String
        }
    }
    
})

const UsersDetails = module.exports = mongoose.model('UsersDetails', usersDetailsSchema);
