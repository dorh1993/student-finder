const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');

app.use(express.json({
    type: ['application/json', 'text/plain']
  }))
  
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

var markers = [ {
        "location" : {
            "lat": 32.016510,
            "lng" : 34.771410
          }

    },{
        "location" : {
            "lat": 32.0171363,
            "lng" : 34.7697293
          }
    }
];

app.get('/hello', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.send(markers)
    next();
})

app.post('/save-user', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    console.log('here we has request-body', req.body);
    res.sendStatus(200);
    next();
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

const publicIp = require('public-ip');
 
(async () => {
    console.log(await publicIp.v4());
    //=> '46.5.21.123'
 
    console.log(await publicIp.v6());
    //=> 'fe80::200:f8ff:fe21:67cf'
})();