'use strict';
const express = require('express');
const server = express();
const cors = require('cors');
const weatherData = require('./data/weather.json');
require('dotenv').config();
server.use(cors());
const PORT = process.env.PORT;



//http://localhost:3000/(/ ===root rout)
server.get('/', (req, res) => {
  res.send('hi from the root route');
});

//http://localhost:3000/getcityNames(/test===route)
server.get('/getcityNames', (request, response) => {
  let cityNames = weatherData.map((item) => {
    return item.city_name;
  });
  response.send(cityNames);

});
//http://localhost:3000/getLon
server.get('/getLon, (request, response') => {
  let getLon = weatherData.map((item) => {
    return item.lon;
  });
  response.send(getLon);
});
//http://localhost:3000/getLot

srver.get('/getLot', (request, response) => {
    let getLot = weatherData.map((item) => {
      return item.getLot;
    });
    response.send(getLot);
  
  });


//http://localhost:3000/(/getweather)
server.listen(PORT, () => {
  console.log(`I am listening on PORT=${PORT}`);

  server.get('*',(req,res)=>{
    res.status(404).send('page not found');
  });

});
