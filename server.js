// 'use strict';
// const express = require('express');
// const server = express();
// const axios =require('axios');
// const cors = require('cors');
// const weatherData = require('./data/weather.json');
// require('dotenv').config();
// server.use(cors());
// const PORT = process.env.PORT;

// // class Forecast {
// //   constructor(date, description) {
// //     this.date = date;
// //     this.description = description;
// //   }
// // }
// // const CreateForcastObj = weatherObjList => {
// //   const forcastObjList = [];
// //   weatherObjList.data.map(item => {
// //     const description = `Low of ${item.low_temp}, high of ${item.high_temp} with ${item.weather.description}`;
// //     const date = item.datetime;
// //     forcastObjList.push(new CreateForcastObj(date, description));
// //   });
// //   return forcastObjList;
// // };


// class Weather1 {
//   constructor(d) {
//     this.date = d.valid_date;
//     this.description = d.weather.description;
//   }
// }
// // http://localhost:3010/weather?lat=31.95&lon=35.91&searchQuery=Amman
// server.get('/weather',getWeather);
// async function getWeather (request, response) {
//   let searchQuery = request.query.searchQuery;
//   let lon=request.query.lon;
//   let lat=request.query.lat;
//   let url=`http://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&city=${searchQuery}&key=${process.env.WEATHER_API_Key}`;

//   axios.get(url)
//     .then(result =>{
//       let weatherArr=result.data;
//       response.send(gittingWeatherArr(weatherArr));
//       console.log('iam inside the axios');

//     })
//     .catch (error =>{
//       response.send('error');
//       console.log('ioam outside the axios');
//     });
//   // let b = a.split(',');


//   // let loc = b[0];

//   // var data = weatherData.find((element) => {
//   //   return element.city_name.toLowerCase() === loc.toLowerCase();
//   // });
//   // let status = data.data.map((e) => new Weather1(e));
//   // console.log(status);
//   // response.send(status);
// }
// function gittingWeatherArr(wetherobj)
// {
// let forcastArr=[];
// weatherObj.map(element => {
//   const description = `Low of ${element.low_temp}, high of ${element.max_temp} with ${element.weather.description}`;
//   const date = `${element.datetime};`

//   forcastArr.push(new WeatherObject(description, date));

//   console.log(forcastArr);
// });
// return forcastArr;}

// class WeatherObject {

//   constructor(description, date) {

//     this.description = description;
//     this.date = date;

//   }

// }


// //http://localhost:3010/(/ ===root rout)
// server.get('/', (req, res) => {
//   res.send('hi from the root route');
// });

// // http://localhost:3000/weather?lat=31.95&lon=35.91&searchQuery=Amman
// // server.get('/weather', (request, response) => {
// //   let lat = request.query.lat;
// //   let lon = request.query.lon;
// //   let cityName = request.query.searchQuery;
// //   //console.log(lat,lon,cityName,'duaa',weatherData[0].city_name);
// //   const weather = weatherData.find(item => item.city_name.toLowerCase() === cityName.toLowerCase() ? item : '');
// //   response.send(weather);
// // });


// //http://localhost:3000/getLonLat
// server.get('/getLonLat', (request, response) => {
//   let getLonLat = weatherData.map((item) => {
//     return (item.Lon, item.lat);
//   });
//   let getLat = weatherData.map((item) => {
//     return item.lat;
//   });
//   response.send(getLonLat);

// });

// //http://localhost:3000/getLat

// server.get('/getLat', (request, response) => {
//   let getLat = weatherData.map((item) => {
//     return Number(item.lat);
//   });
//   response.send(getLat);

// });

// //http://localhost:3000/getweather

// server.get('/getweather', (request, response) => {
//   let getweather = weatherData.map((item) => {
//     return item.weather.description;
//   });
//   response.send(getweather);

// });



// server.listen(process.env.PORT, () => {
//   console.log(`I am listening on PORT=${process.env.PORT}`);

//   server.get('*', (req, res) => {
//     res.status(404).send('page not found');
//   });

// });
'use strict';


require('dotenv').config();
const express = require('express');
const cors = require('cors');
// const weather = require( './data/weather.json' );
const axios = require('axios');
const app = express();
app.use(cors());

const PORT =process.env.PORT;

//http://localhost:3002/weather?city=amman
app.get('/weather', getWeather);

//our url route will be http://localhost:3002/test
app.get('/test', (request, response) => {
  let smth = 'hello from the test route'; //<< testing a route
  response.send(smth);
});


// let weatherArr = [];


function getWeather(request, response) {
  let city = request.query.city;
  let lon = request.query.lon;
  let lat = request.query.lat;
  const URL = `http://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&city=${city}&key=${process.env.WEATHER_API_Key}`;
  axios
    .get(URL)
    .then(result => {
      let weatherArr = result.data.data

      response.send(gettingWeatherData(weatherArr));
      console.log('i am inside the promise');


    })

    .catch(err => {
      response.send(err);
      console.log('outside promise');
    });

}


function gettingWeatherData(weatherObj) {

  let forCastObejct = [];

  weatherObj.map(element => {
    const description = `Low of ${element.low_temp}, high of ${element.max_temp} with ${element.weather.description}`;
    const date = `${element.datetime}`;

    forCastObejct.push(new WeatherObject(description, date));

    console.log(forCastObejct);
  });
  return forCastObejct;

}


class WeatherObject {

  constructor(description, date) {

    this.description = description;
    this.date = date;

  }

}

//http://localhost:3002/movies?cityname=Amman
app.get('/movies', getMoviesHandler);

function getMoviesHandler(req, res) {
  const city = req.query.cityname;

  const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIES_API_KEY}&query=${city}`;


  axios
    .get(url)
    .then(result => {
      console.log('inside promise');

      let moviesArray = result.data.results;

      res.send(moviesobjectFunction(moviesArray));
    })
    .catch(err => {
      res.send(err);
    })
  console.log('outside promise');
}

const moviesobjectFunction = (moviesobj) => {

  const movieslistObj = [];

  moviesobj.map(element => {

    const title = element.title;


    const overview = element.overview


    const average_votes = element.vote_average

    const total_votes = element.vote_count


    const image_url = process.env.imgurl + element.poster_path


    const popularity = element.popularity


    const released_on = element.release_date


    movieslistObj.push(new Movies(title, overview, average_votes, total_votes, image_url, popularity, released_on));

    console.log(movieslistObj);

  });

  return movieslistObj;

};


class Movies {

  constructor(title, overview, average_votes, total_votes, image_url, popularity, released_on) {

    this.title = title;
    this.overview = overview;
    this.average_votes = average_votes;
    this.total_votes = total_votes;
    this.image_url = image_url;
    this.popularity = popularity;
    this.released_on = released_on;
  }
}


app.use('*', (request, response) => response.status(404).send('page not found'));

app.listen(PORT, () => {
  console.log(`I am Listening on port: ${PORT}`);
});