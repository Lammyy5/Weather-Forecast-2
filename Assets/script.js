const cityInputEl = document.querySelector('#city-input');
const searchHistoryEl = document.querySelector('#history-list');
const currentWeatherEl = document.querySelector('#current-weather-info');
const forecastEl = document.querySelector('#forecast-container');
const cityNameEl = document.querySelector('#city-input');
const cityFormEl = document.querySelector('#city-form')
// let apiCity = cityName + '&limit=2&appid=' + apiKey;
let geoUrl =
	'http://api.openweathermap.org/geo/1.0/direct?q=' +
	cityNameEl +
	'&limit=2&appid=cc20c2bbfb885577a8885d75622aaae4';
let apiKey = 'cc20c2bbfb885577a8885d75622aaae4'
// let apiUrl =
// 	'api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=' + apiKey;
let formSubmitHandler = function (event) {
  event.preventDefault();

  let cityName = cityNameEl.value.trim();
console.log(typeof cityName)
  if (cityName) {
    // apiCall(cityName);

    cityNameEl.textContent = '';

  } else {
    alert('Please enter a GitHub username');
  }
};
function apiCall(){

// let 
// console.log(cityName)
    fetch(geoUrl)
    .then(function (response){
        return response.json();
    })
    .then(function (data){
        console.log(data)
    })}

cityFormEl.addEventListener('submit', formSubmitHandler)