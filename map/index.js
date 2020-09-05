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
        "name": "Eliran",
        "email": "eliran@gmail.com",
        "phone": "052-987-1234",
        "location" : {
            "lat": 32.0170737,
            "lng" : 34.7681623
          }

    },{
        "name": "Eden",
        "email": "eden@gmail.com",
        "phone": "052-987-1234",
        "location" : {
            "lat": 32.0154278,
            "lng" : 34.7705851
          }
    }
];

var user = {
    "name": "Dor Haim",
    "email": "Dor@gmail.com",
    "phone": "052-987-6542",   
    "location" : {
        "lat": 32.016510,
        "lng" : 34.771410
      }
}

app.get('/user', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.send(user)
    next();
})


app.get('/markers', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.send(markers)
    next();
})

app.post('/save-user', (req, res, next) => {
    res.header('Accept','application/json');
    res.header('Content-Type', 'application/json');
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