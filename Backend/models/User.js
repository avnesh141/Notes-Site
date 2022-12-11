const mongoose = require('mongoose');
const UserSchema = new Schema({
    name: {
        type: String,
        requireed: true
    },
    email: {
        type: String,
        required: true,
        unique:true
    },
    password: {
        type: String,
        required: true

    },
    date: {
        type: Date,
        required: true

    }

});
module.exports = mongoose.model('user', UserSchema);