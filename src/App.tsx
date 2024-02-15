import { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import "./App.css";

import Map from "./map/Map";

export interface WeatherData {
  coord: { lon: number; lat: number };
  weather: { id: number; main: string; description: string; icon: string }[];
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  visibility: number;
  wind: { speed: number; deg: number };
  clouds: { all: number };
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

function convertTo12Hour(unixTimestamp: number | undefined) {
  if (!unixTimestamp) return "";

  const date = new Date(unixTimestamp * 1000);
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const meridiem = hours >= 12 ? "pm" : "am";

  hours = hours % 12 || 12;

  return `${hours}:${minutes < 10 ? "0" : ""}${minutes} ${meridiem}`;
}

function App() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [city, setCity] = useState("");
  const apiKey = "11b815acfff49b556d18c1a5f87e4450";
  const apiUrl = "https://api.openweathermap.org/data/2.5/weather";

  useEffect(() => {
    async function fetchWeatherData() {
      try {
        const response = await fetch(
          `${apiUrl}?q=${city}&appid=${apiKey}&units=imperial`
        );
        const data = await response.json();
        setWeatherData(data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    }

    if (city !== "") {
      fetchWeatherData();
    }
  }, [city]);

  const handleSearch = () => {
    const input = document.querySelector(".search input") as HTMLInputElement;
    if (input) {
      setCity(input.value);
    }
  };

  return (
    <div className="card">
      <div className="search">
        <input
          type="text"
          placeholder="Search City or Zip Code"
          spellCheck="false"
        />
        <img src="src/assets/Search.svg" onClick={handleSearch} alt="Search" />
      </div>

      <div className="weather">
        {weatherData && (
          <div className="mainDetails">
            <div className="colWeather">
              <img
                src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
                alt="Weather Icon"
                className="weather-icon"
              />
              <h1 className="city">{weatherData.name}</h1>
              <h2 className="temp">{Math.round(weatherData.main.temp)}°F</h2>
            </div>
            <div className="colWeather">
              <h3>{weatherData.weather[0].main}</h3>
              <h4 className="feels-like">
                Feels like {Math.round(weatherData.main.feels_like)}°
              </h4>
            </div>
          </div>
        )}

        <div className="weatherConditions">
          <div className="col">
            <img src="src/assets/Wind.svg" alt="Wind" />
            <div>
              <p className="description">Wind</p>
              <p className="wind">{weatherData?.wind?.speed} mph</p>
            </div>
          </div>
          <div className="col">
            <img src="src/assets/Humidity.svg" alt="Humidity" />
            <div>
              <p className="description">Humidity</p>
              <p className="humidity">{weatherData?.main?.humidity}%</p>
            </div>
          </div>

          <div className="col">
            <img src="src/assets/Visibility.svg" alt="Visibility" />
            <div>
              <p className="description">Visibility</p>
              <p className="visibility">{weatherData?.visibility} m</p>
            </div>
          </div>

          <div className="col">
            <img src="src/assets/Pressure.svg" alt="Pressure" />
            <div>
              <p className="description">Pressure</p>
              <p className="visibility">{weatherData?.main?.pressure} hPa</p>
            </div>
          </div>
        </div>

        <div className="weatherConditions">
          <div className="col">
            <div>
              <img src="src/assets/Sunrise.svg" className="imageAdjust"></img>
              <p className="sunDescription">Sunrise</p>
              <hr></hr>
              <p className="sun">
                {convertTo12Hour(weatherData?.sys?.sunrise)}
              </p>
            </div>
          </div>

          <div className="col">
            <div>
              <img src="src/assets/Sunset.svg" className="imageAdjust"></img>
              <p className="sunDescription">Sunset</p>
              <hr></hr>
              <p className="sun">{convertTo12Hour(weatherData?.sys?.sunset)}</p>
            </div>
          </div>
        </div>

        <div className="mapContainer">
          <div className="App">
            <p className="sunDescription">Radar and Maps</p>
            <section className="map-container">
              <Map
                lon={weatherData?.coord?.lon}
                lat={weatherData?.coord?.lat}
                name={weatherData?.name}
              />
            </section>
          </div>
        </div>

        {/* Implement a 4-day Weather Forecast */}
      </div>
    </div>
  );
}

export default App;
