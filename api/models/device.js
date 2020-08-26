const mongoose = require('mongoose');

module.exports = mongoose.model('Device', new mongoose.Schema({ 
    id: mongoose.Schema.Types.ObjectId,
    name: String,
    user: String,
    sensorData: Array
}));

