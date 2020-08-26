const express = require('express');

const mongoose = require('mongoose');

const Device = require('./models/device');

const User = require('./models/user');

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

//connect to MongoDB
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

//Get data by Id 
app.get('/api/devices/:deviceId/device-history', (req, res) => { 
    const id = req.params.deviceId;
    Device.findById({_id: id})
    .exec()
    .then(result => {
        res.json({result});
    })
    .catch(err => {error: err});
});

//send command
app.post('/api/send-command', (req, res) => {
    console.log(req.body);
});

app.post('/api/authenticate', (req, res) => {
    const { name, password } = req.body; 
    User.findOne({name})
    .exec()
    .then(user => {
        if (!user) {
            return res.json ({
                success: false,
                message: "User Not Found"
            });
        } 
        if (user.password !== req.body.password) {
                return res.json({
                    success: false,
                    message: 'Password does not correct'
                });
        } else {
                return res.json({
                    success: true,
                    message: 'Authenticated successfully', 
                    isAdmin: found.isAdmin
                    });
            }
    })
    .catch(error => res.send(error));
});

//Registration
app.post('/api/registration', (req, res) => {
    const { name, password, isAdmon } = req.body;
    User.findOne({name})
    .exec()
    .then(user => {
        if (user) {
           return res.status(200).json({
                success: false,
                message: " User has already existed"
            });
        } else {
            const newUser = new User({
                name: req.body,name,
                password: req.body.password,
                isAdmin: req.body.isAdmin
              });
              newUser.save(err => { 
                  return err
                ? res.send(err) 
                : res.json({
                      success: true,
                      message: 'Created new user'
                    });
                });
        }
    })
    .catch(err => res.status(500).json({ error: err }));
});
    


app.listen(port, () => { 
    console.log(`listening on port ${port}`);
});