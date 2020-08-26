const mongoose = require('mongoose');

module.exports = mongoose.model('User', new mongoose.Schema({ 
    id: mongoose.Schema.Types.ObjectId,
    name: {type: String, required: true },
    password: {type: String, required: true },
    isAdmin: {type: Boolean, required: true }
}));