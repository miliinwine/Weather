const API_KEY_OPENWEATHER = "08921998095a538cc8c7bd56e350dfef";
const API_KEY_GEOIPIFY = "at_shYjk5pzobvCPVthoXt0OuhfE5gFd";
const API_URL_OPENWEATHER = `https://api.openweathermap.org/data/2.5/weather?&appid=${API_KEY_OPENWEATHER}&units=metric&q=`;

let geolocation = document.querySelector(".geolocation");
let geoTemp = document.querySelector(".geolocation__temperature");
let geoCity = document.querySelector(".geolocation__city");
let geoBtn = document.querySelector(".geolocation__button");
let selectCity = document.querySelector(".select__city");
let input = document.querySelector(".input");
let button = document.querySelector(".button");
let error = document.querySelector(".error");
let errBtn = document.querySelector(".error__button")
let form = document.querySelector(".form")
// Функция для получения запроса о местоположении
function findLocation() {
  if (!navigator.geolocation) {
  } else {
    navigator.geolocation.getCurrentPosition(success, error);
  }
  async function success(position) {
    showGeolocation();
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const API_URL_OPENWEATHER = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY_OPENWEATHER}&units=metric`;
    let response = await fetch(API_URL_OPENWEATHER);
    let data = await response.json();

    geoCity.textContent = data.weather[0].main + " in " + data.name;
    geoTemp.textContent = Math.round(data.main.temp) + "°C";
    console.log(data);
  }
  function error() {
    showError();
  }
}
findLocation();
// Функция отображающая температуру в других городах
async function checkWeather(city) {
  showGeolocation();
  let response = await fetch(API_URL_OPENWEATHER + city)
  let data = await response.json();
  
  geoCity.textContent = data.weather[0].main + " in " + data.name;
  geoTemp.textContent = Math.round(data.main.temp) + "°C";

  console.log(data);
}
// События
geoBtn.addEventListener("click", showSelectCity);
form.addEventListener("submit", (event) => {
  event.preventDefault()
  checkWeather(input.value)
})
errBtn.addEventListener("click", showSelectCity)
// Темперавтура и город
function showGeolocation() {
  geolocation.style.display = "block";
  selectCity.style.display = "none";
  error.style.display = "none";
}
// Ошибка
function showError() {
  geolocation.style.display = "none";
  selectCity.style.display = "none";
  error.style.display = "block";
}
// Input
function showSelectCity() {
  geolocation.style.display = "none";
  selectCity.style.display = "block";
  error.style.display = "none";
  input.value = "";
}

