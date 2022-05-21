let now = new Date();
let h2 = document.querySelector("h2");
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let hour = now.getHours();
let minute = now.getMinutes();
h2.innerHTML = `Today's Date: ${day} ${hour}:${minute}`;

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-city");
  let h4 = document.querySelector("h4");
  if (searchInput.value) {
    h4.innerHTML = `The city is ${searchInput.value}`;
  } else {
    h4.innerHTML = null;
    alert("Please type a city");
  }
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

function displayWeather(response) {
  console.log(response.data);
  document.querySelector("#current-city").innerHTML = response.data.name;
  document.querySelector("#temperature-today").innerHTML = `${Math.round(
    response.data.main.temp
  )}°C`;
  document.querySelector("#weather-today").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind-speed").innerHTML = Math.round(
    response.data.wind.speed
  );
}

function searchForCity(event) {
  event.preventDefault();
  let apiKey = "00a006d0f0de6b3a3c074d8ac7d952d7";
  let searchInput = document.querySelector("#search-text-input");
  let city = searchInput.value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeather);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchForCity);

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "00a006d0f0de6b3a3c074d8ac7d952d7";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

navigator.geolocation.getCurrentPosition(showPosition);
