const express = require('express');

const mongoose = require('mongoose');

const Device = require('./models/device');

const app = express();

const port = process.env.PORT || 5000;

const bodyParser = require('body-parser'); 

app.use(function(req, res, next) { 
    res.header("Access-Control-Allow-Origin", "*"); 
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"); 
    next(); 
});


//Gaining access from middleware
app.use(bodyParser.urlencoded({ extended: false })) 
app.use(bodyParser.json())

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true, 
    useUnifiedTopology: true 
});

app.get('/api/devices', (req, res) => { 
    Device.find({}, (err, devices) => {
    return err
    ? res.send(err)
    : res.send(devices);
    }); 
});

//Add new device and save device
app.post('/api/devices', (req, res) => { 
    const { name, user, sensorData } = req.body; 
    const newDevice = new Device ({
    name,
    user,
    sensorData
});

newDevice.save(err => {
    return err
        ? res.send(err)
        : res.send('successfully added device and data');
    }); 
});

app.post('/api/send-command', (req, res) => {
    console.log(req.body);
});
    


app.listen(port, () => { 
    console.log(`listening on port ${port}`);
});