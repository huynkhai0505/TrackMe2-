const express = require('express');

const mongoose = require('mongoose');

const Device = require('./models/device');

const app = express();

const port = 5000;

mongoose.connect('mongodb+srv://huynhkhai0105:Quynhanh0505@cluster0.uv2sk.mongodb.net', {
    useNewUrlParser: true, 
    useUnifiedTopology: true 
});

app.get('/api/test', (req, res) => { 
    res.send('The API is working!');
});

app.get('/api/devices', (req, res) => { Device.find({}, (err, devices) => {
    return err
    ? res.send(err)
    : res.send(devices);
    }); 
});
    


app.listen(port, () => { 
    console.log(`listening on port ${port}`);
});