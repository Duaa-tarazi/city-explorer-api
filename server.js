'use strict';
const express = require('express');
const srver = express();
const weatherData = require('./data/weather.json');
const PORT = 3000;


//http://localhost:3000/(/ ===root rout)
srver.get('/', (req, res) => {
    res.send('hi from the root route');
});

//http://localhost:3000/test(/test===route)
srver.get('/test', (request, response) => {
    let str = 'hello from the server side';
    response.send(str);
});

//http://localhost:3000/(/getweather)
srver.listen(PORT, () => {
    console.log(`I am listening on PORT=${PORT}`);

    let cityNames = weatherData.map((item) => {
        return item.city_name;
        // console.log(item.city_name);
    })
    res.send(cityNames);

});
