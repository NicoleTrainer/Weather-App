const API_KEY = "471ab8a6856e8a67cab3059709d9c348";

async function fetchWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const errorMsg = document.getElementById("errorMsg");
  const result = document.getElementById("weatherResult");

  // Don't do anything if the input is empty
  if (!city) {
    errorMsg.textContent = "Please enter a city name.";
    return;
  }

  errorMsg.textContent = "";

  try {
    // Call the API
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );

    // If the city doesn't exist, the API returns an error status
    if (!response.ok) {
      throw new Error("City not found. Check the spelling and try again.");
    }

    // Convert the response to a JavaScript object
    const data = await response.json();
    const pressure = data.main.pressure;

    let pressureLabel = "";

    if (pressure > 1020) {
      pressureLabel = "high";
    } else if (pressure < 1005) {
      pressureLabel = "low";
    } else {
      pressureLabel = "normal";
    }

    // Plug the data into the HTML elements
    document.getElementById("cityName").textContent    = `${data.name}, ${data.sys.country}`;
    document.getElementById("temp").textContent        = `${Math.round(data.main.temp)}°C`;
    document.getElementById("description").textContent = data.weather[0].description;
    document.getElementById("humidity").textContent    = `Humidity: ${data.main.humidity}%`;
    document.getElementById("wind").textContent        = `Wind: ${Math.round(data.wind.speed * 3.6)} km/h`;
    document.getElementById("visibility").textContent  = `Visibility: ${(data.visibility / 1000).toFixed(1)} km`;
    document.getElementById("pressure").textContent    = `Pressure: ${pressure} hPa (${pressureLabel})`;
    document.getElementById("weatherIcon").src         = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    // Show the results section
    result.classList.remove("hidden");

  } catch (error) {
    // Show the error message and hide the results
    errorMsg.textContent = error.message;
    result.classList.add("hidden");
  }
}

// Let the user press Enter instead of clicking the button
document.getElementById("cityInput").addEventListener("keydown", function(e) {
  if (e.key === "Enter") fetchWeather();
});