const cityInputEl = document.querySelector('#city-input');
const searchHistoryEl = document.querySelector('#history-list');
const currentWeatherEl = document.querySelector('#current-weather-info');
const forecastEl = document.querySelector('#forecast-container');
const cityNameEl = document.querySelector('#city-input');
const cityFormEl = document.querySelector('#city-form');
const currentCityWeatherEl = document.querySelector('.city-name');
const currentCityDateEl = document.querySelector('.date');
const currentCityWeatherIconEl = document.querySelector('.weather-icon');
const currentCityTemperatureEl = document.querySelector('.temperature');
const currentCityHumidityEl = document.querySelector('.humidity');
const currentCityWindSpeedEl = document.querySelector('.wind-speed');
let weekForecast = {};
let formSubmitHandler = function (event) {
	event.preventDefault();

	let cityName = cityNameEl.value.trim();
	console.log(cityName);
	JSON.stringify(localStorage.setItem('city', cityName));
	if (cityName) {
		apiCall(cityName);
		searchHistory();
		cityNameEl.textContent = '';
	} else {
		alert('Please enter a valid city');
	}
};

function apiCall(cityName) {
	let apiKey = 'cc20c2bbfb885577a8885d75622aaae4';
	let geoUrl =
		'http://api.openweathermap.org/geo/1.0/direct?q=' +
		cityName +
		'&limit=2&appid=' +
		apiKey;

	fetch(geoUrl)
		.then(function (response) {
			return response.json();
		})
		.then(function (data) {
			getWeather(data, apiKey);
		});
}
function searchHistory() {
	let searchedCities = Array.of(localStorage.getItem('city')) || [];
	let cities = []
  cities.push(searchedCities)
  
  let cityHistory = Array.of(searchedCities)
  console.log(cities);
	searchHistoryEl.innerHTML = '';
	for (let i = 0; i < searchedCities.length; i++) {
		const list = document.createElement('li');
		const city = searchedCities[i];
		let searchHistorybtn = document.createElement('button');
		searchHistorybtn.textContent = city;
		searchHistorybtn.classList.add('search-history-button');
		list.appendChild(searchHistorybtn);
		searchHistorybtn.addEventListener('click', function () {
			apiCall(city);
		});
		searchHistoryEl.appendChild(list);
	}
	// cityName.forEach(searchedCities => {
	//  let searchHistorybtn = document.createElement('button');
	//  searchHistorybtn.innerHTML = cityName
	//  searchHistoryEl.appendChild(searchHistorybtn)
	// });
}
function getWeather(data, apiKey) {
	let lat = data[0].lat;
	let lon = data[0].lon;
	let apiUrl =
		'http://api.openweathermap.org/data/2.5/forecast?lat=' +
		lat +
		'&lon=' +
		lon +
		'&appid=' +
		apiKey +
		'&units=imperial';
	fetch(apiUrl)
		.then(function (response) {
			return response.json();
		})
		.then(function (data) {
			getForecast(data);
			getWeekForecast(data);
		});
}
function getForecast(data) {
	console.log(data);
	let forecast = data.list;
	let currentForecast = forecast[0];
	let icon = currentForecast.weather[0].icon;
	let iconUrl = 'https://openweathermap.org/img/w/' + icon + '.png';
	document.querySelector('.weather-icon').src = iconUrl;
	currentCityWeatherEl.textContent = data.city.name;
	currentCityDateEl.textContent = currentForecast.dt_txt;
	currentCityTemperatureEl.textContent =
		'Temperature:' + currentForecast.main.temp + '°F';
	currentCityHumidityEl.textContent =
		'Humidity: ' + currentForecast.main.humidity + '%';
	currentCityWindSpeedEl.textContent =
		'wind:' + currentForecast.wind.speed + 'mph';
	// currentCityWeatherIconEl.appendChild()
	console.log(forecast);
	console.log(currentForecast.wind.speed);
	// console.log(forecast)
}

function getWeekForecast(data) {
	console.log(data);
	forecastEl.innerHTML = '';
	let forecast = data.list;
	for (let i = 0; i < forecast.length; i += 8) {
		const element = forecast[i];
		console.log(element);
		let icon = element.weather[0].icon;
		let iconUrl = 'https://openweathermap.org/img/w/' + icon + '.png';
		let weekForecast = document.createElement('div');
		weekForecast.innerHTML = `<div class="forecast-card">
    <img class="weather-icon" src="${iconUrl}" alt="Weather icon">
                    <h3 class="date">${element.dt_txt}</h3>
                    <h3 class="temperature">Temp: ${element.main.temp}°F</h3>
                    <h3 class="humidity">Humidty: ${element.main.humidity}</h3>
                </div>`;
		weekForecast.setAttribute('class', 'forecast-day');
		forecastEl.appendChild(weekForecast);
		// todo
	}
}

cityFormEl.addEventListener('submit', formSubmitHandler);
