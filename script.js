const apiKey = "API KEY"; // Replace with your OpenWeatherMap API key

document.getElementById("getWeatherBtn").addEventListener("click", () => {
  const cityInput = document.getElementById("cityInput").value;
  const weatherInfo = document.getElementById("weatherInfo");
  const loadingPopup = document.getElementById("loadingPopup");

  loadingPopup.style.display = "block";

  // Step 1: Fetch latitude and longitude using direct geocoding
  fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityInput}&limit=1&appid=${apiKey}`)
    .then(response => response.json())
    .then(data => {
      const { lat, lon } = data[0];

      // Step 2: Fetch weather data using latitude and longitude
      return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`);
    })
    .then(response => response.json())
    .then(data => {
      const { name: cityName, main: { temp }, weather } = data;

      document.getElementById("cityName").textContent = cityName;
      document.getElementById("temperature").textContent = temp;
      document.getElementById("weatherCondition").textContent = weather[0].main;

      changeBackground(weather[0].main);
    })
    .catch(() => {
      weatherInfo.style.display = "none";
      alert("City not found");
    })
    .finally(() => {
      loadingPopup.style.display = "none";
    });
});

function changeBackground(weatherCondition) {
  const body = document.body;
  switch (weatherCondition) {
    case "Clear":
      body.style.backgroundColor = "lightyellow";
      break;
    case "Clouds":
      body.style.backgroundColor = "lightgray";
      break;
    case "Rain":
      body.style.backgroundColor = "lightblue";
      break;
    default:
      body.style.backgroundColor = "white";
  }
}
