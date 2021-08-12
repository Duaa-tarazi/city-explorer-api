'use strict';
const express = require('express');
const server = express();
const cors = require('cors');
const weatherData = require('./data/weather.json');
require('dotenv').config();
server.use(cors());
const PORT = process.env.PORT;

// class Forecast {
//   constructor(date, description) {
//     this.date = date;
//     this.description = description;
//   }
// }
// const CreateForcastObj = weatherObjList => {
//   const forcastObjList = [];
//   weatherObjList.data.map(item => {
//     const description = `Low of ${item.low_temp}, high of ${item.high_temp} with ${item.weather.description}`;
//     const date = item.datetime;
//     forcastObjList.push(new CreateForcastObj(date, description));
//   });
//   return forcastObjList;
// };
class weather1 {
  constructor(d) {
    this.date = d.valid_date;
    this.description = d.weather.description;
  }
}

server.get('/weather', (request, response) => {
  let a = request.query.searchQuery;
  let b = a.split(',');

  let loc = b[0];

  var data = weatherData.find((element) => {
    return element.city_name.toLowerCase() === loc.toLowerCase();
  });
  let status = data.data.map((e) => new weather1(e));
  console.log(status);
  response.send(status);
});




//http://localhost:3000/(/ ===root rout)
server.get('/', (req, res) => {
  res.send('hi from the root route');
});

// http://localhost:3000/weather?lat=31.95&lon=35.91&searchQuery=Amman
// server.get('/weather', (request, response) => {
//   let lat = request.query.lat;
//   let lon = request.query.lon;
//   let cityName = request.query.searchQuery;
//   //console.log(lat,lon,cityName,'duaa',weatherData[0].city_name);
//   const weather = weatherData.find(item => item.city_name.toLowerCase() === cityName.toLowerCase() ? item : '');
//   response.send(weather);
// });


//http://localhost:3000/getLonLat
server.get('/getLonLat', (request, response) => {
  let getLonLat = weatherData.map((item) => {
    return (item.Lon, item.lat);
  });
  let getLat = weatherData.map((item) => {
    return item.lat;
  });
  response.send(getLonLat);

});

//http://localhost:3000/getLat

server.get('/getLat', (request, response) => {
  let getLat = weatherData.map((item) => {
    return Number(item.lat);
  });
  response.send(getLat);

});

//http://localhost:3000/getweather

server.get('/getweather', (request, response) => {
  let getweather = weatherData.map((item) => {
    return item.weather.description;
  });
  response.send(getweather);

});



server.listen(process.env.PORT, () => {
  console.log(`I am listening on PORT=${process.env.PORT}`);

  server.get('*', (req, res) => {
    res.status(404).send('page not found');
  });

});