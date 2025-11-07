import React, { useState } from "react";
import WeatherBackground from "./components/WeatherBackground";

const App = () => {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("");
  const [suggestion, setSuggestion] = useState([]);

  const API_KEY = "eac64df6e3cb857ffe0ca197ac0a8679";

  // Function to fetch weather by city name
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!city) return;

    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      const data = await res.json();
      if (data.cod === 200) {
        setWeather(data);
      } else {
        alert("City not found!");
      }
    } catch (error) {
      console.error("Error fetching weather:", error);
    }
  };

  const getWeatherCondition = () =>
    weather && {
      main: weather.weather[0].main,
      isDay:
        Date.now() / 1000 > weather.sys.sunrise &&
        Date.now() / 1000 < weather.sys.sunset,
    };

  return (
    <div className="min-h-screen relative">
      <WeatherBackground condition={getWeatherCondition()} />

      <div className="flex items-center justify-center p-6 min-h-screen relative z-10">
        <div className="bg-transparent backdrop-blur-md rounded-xl shadow-2xl p-8 max-w-md text-white w-full border border-white/30">
          <h1 className="text-4xl font-extrabold text-center mb-6">
            Weather App
          </h1>

          {!weather ? (
            <form
              onSubmit={handleSearch}
              className="flex flex-col relative space-y-4"
            >
              <input
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter city or country"
                className="p-3 rounded border border-white bg-transparent text-white placeholder-white focus:outline-none focus:border-blue-300 transition"
                type="text"
              />

              <button
                type="submit"
                className="bg-purple-600 text-white hover:bg-blue-700 font-semibold py-2 px-4 rounded transition-colors"
              >
                Get Weather
              </button>
            </form>
          ) : (
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">
                {weather.name}, {weather.sys.country}
              </h2>
              <p className="text-lg">{weather.weather[0].description}</p>
              <p className="text-5xl font-semibold mt-4">
                {Math.round(weather.main.temp)}°C
              </p>

              <button
                onClick={() => {
                  setWeather(null);
                  setCity("");
                }}
                className="mt-6 bg-purple-900 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition-colors"
              >
                Search Again
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
