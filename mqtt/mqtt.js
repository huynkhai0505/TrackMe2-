const mqtt = require('mqtt');

const express = require('express');

const bodyParser = require('body-parser'); 

const app = express();

const port = process.env.PORT || 5001;

app.use(express.static('public'));

app.use(function(req, res, next) { 
    res.header("Access-Control-Allow-Origin", "*"); 
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"); 
    next(); 
});

//Using body-parser
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({
  extended: true
}));

const client = mqtt.connect("mqtt://broker.hivemq.com:1883");

client.on('connect', () => { 
    console.log('connected');
});

const topic = '/6crICZGEGb/test/hello/'; 
const msg = 'Hello MQTT world!'; 
    client.publish(topic, msg, () => {
    console.log('message sent...'); 
});

app.post('/send-command', (req, res) => { 
    const { deviceId, command } = req.body; 
    const topic = `/6crICZGEGb/command/${deviceId}`; 
    client.publish(topic, command, () => {
        res.send('published new message'); 
    });
});

app.listen(port, () => { 
    console.log(`listening on port ${port}`);
});