function formatedDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return `${days[day]} ${hours}:${minutes}`;
}

function showWeatherCondition(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector(
    "#pressure"
  ).innerHTML = `${response.data.main.pressure}`;
  document.querySelector(
    "#humidity"
  ).innerHTML = `${response.data.main.humidity}%`;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
}
function searchCity(city) {
  let apiKey = "203fa770242fcd2b9555d832a88ea567";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showWeatherCondition);
}
function cityName(event) {
  event.preventDefault();
  let city = document.querySelector("#cityInput").value;
  searchCity(city);
}
function searchLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${units}&appid=${apiKey}`;

  axios.get(apiUrl).then(showWeatherCondition);
}

function showCurrentWeather(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentDate = document.querySelector("#date");
let now = new Date();
let searchForm = document.querySelector("#TypeCityName");
searchForm.addEventListener("submit", cityName);

currentDate.innerHTML = formatedDate(now);

let currentLocation = document.querySelector("#current-location-button");
currentLocation.addEventListener("click", showCurrentWeather);

searchCity("New York");
