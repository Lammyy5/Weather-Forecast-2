const cityInputEl = document.querySelector('#city-input');
const searchHistoryEl = document.querySelector('#history-list');
const currentWeatherEl = document.querySelector('#current-weather-info');
const forecastEl = document.querySelector('#forecast-container');
const cityNameEl = document.querySelector('#city-input');
const cityFormEl = document.querySelector('#city-form')

let formSubmitHandler = function (event) {
  event.preventDefault();

  let cityName = cityNameEl.value.trim();
  console.log(typeof cityName)
  if (cityName) {
    apiCall(cityName);

    cityNameEl.textContent = '';

  } else {
    alert('Please enter a GitHub username');
  }
};
function apiCall(cityName) {
  let apiKey = 'cc20c2bbfb885577a8885d75622aaae4'
  let geoUrl =
    'http://api.openweathermap.org/geo/1.0/direct?q=' +
    cityName +
    '&limit=2&appid=' + apiKey;
  // let apiUrl =
// 	'api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=' + apiKey;
  // console.log(cityName)
  fetch(geoUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data[0].lat)
      getWeather(data,apiKey)
    })
}
function getWeather(data,apiKey){
let lat = data[0].lat
let lon = data[0].lon
let apiUrl =
	'http://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=' + apiKey + '&units=imperial';
  fetch(apiUrl)
  .then(function (response){
    return response.json();
  })
  .then(function(data){
    console.log(data)
    return data
  })
}

cityFormEl.addEventListener('submit', formSubmitHandler)