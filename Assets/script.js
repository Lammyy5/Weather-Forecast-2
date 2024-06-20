const cityInputEl = document.querySelector('#city-input');
const searchHistoryEl = document.querySelector('#history-list');
const currentWeatherEl = document.querySelector('#current-weather-info');
const forecastEl = document.querySelector('#forecast-container');
const cityNameEl = document.querySelector('#city-input');
const cityFormEl = document.querySelector('#city-form')
const currentCityWeatherEl = document.querySelector('.city-name')
const currentCityDateEl = document.querySelector('.date');
const currentCityWeatherIconEl = document.querySelector('.weather-icon');
const currentCityTemperatureEl = document.querySelector('.temperature');
const currentCityHumidityEl = document.querySelector('.humidity');
const currentCityWindSpeedEl = document.querySelector('.wind-speed');
let formSubmitHandler = function (event) {
  event.preventDefault();

  let cityName = cityNameEl.value.trim();
  console.log(cityName)
  if (cityName) {
    apiCall(cityName);
    cityNameEl.textContent = '';
  } else {
    alert('Please enter a valid city');
  }
};
function apiCall(cityName) {
  let apiKey = 'cc20c2bbfb885577a8885d75622aaae4'
  let geoUrl =
    'http://api.openweathermap.org/geo/1.0/direct?q=' +
    cityName +
    '&limit=2&appid=' + apiKey;
  
  fetch(geoUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {

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
    getForecast(data)
  })

  
}
function getForecast(data){
console.log(data)
let forecast = data.list
let currentForecast = forecast[0]
console.log(currentForecast)
console.log(forecast)
for (let i = 0; i < forecast.length; i+= 8) {
  const element = forecast[i];
  console.log(element)
}
}


cityFormEl.addEventListener('submit', formSubmitHandler)