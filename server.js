'use strict';
const express = require('express');
const server = express();
const cors = require('cors');
const weatherData = require('./data/weather.json');
require('dotenv').config();
server.use(cors());
const PORT = process.env.PORTف

class Forecast{
  constructor(date,description){
    this.date=date;
    this.description=description;
  }
} 
const createForcastObj = weatherObjList =>{
  const forcastObjList = [];
  weatherObjList.data.map( item => {
      const description = `Low of ${item.low_temp}, high of ${item.high_temp} with ${item.weather.description}`;
      const date = item.datetime;
      forcastObjList.push(new Forcast(date, description));
  });
  return forcastObjList;
};

//http://localhost:3000/(/ ===root rout)
server.get('/', (req, res) => {
  res.send('hi from the root route');
});

// http://localhost:3000/weather?lat=31.95&lon=35.91&searchQuery=Amman
server.get('/weather',(request, response) => { 
  let lat=request.query.lat;
  let lon=request.query.lon;
  let cityName=request.query.searchQuery;
  console.log(lat,lon,cityName,'duaa',weatherData[0].city_name);
  const weather=weatherData.find(item => item.city_name.toLowerCase() ===cityName.toLowerCase() ? item:'');
  console.log(weather,'duaa2');
  response.send(weather);
});
//http://localhost:3000/getLonLat
server.get('/getLonLat', (request, response) => {
  let getLonLat= weatherData.map((item) => {
    return (item.Lon,item.lat);
  });
  let getLat=weatherData.map((item) => {
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
  let getweather= weatherData.map((item) => {
    return item.weather.description;
  });
  response.send(getweather);

});


class Forcast {
  constructor(date = '', description =''){
    this.date = date;
    this.description = description;
  }
}

const createForcastObj = weatherObjList =>{
  const forcastObjList = [];
  weatherObjList.data.map( item => {
      const description = `Low of ${item.low_temp}, high of ${item.high_temp} with ${item.weather.description}`;
      const date = item.datetime;
      forcastObjList.push(new Forcast(date, description));
  });
  return forcastObjList;
};


server.listen(PORT, () => {
  console.log(`I am listening on PORT=${PORT}`);

  server.get('*', (req, res) => {
    res.status(404).send('page not found');
  });

});