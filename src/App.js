/*global chrome*/

import "./App.css";
import { useState, useEffect } from "react";
import Nav from "./components/Nav/Nav";
import SearchBar from "./components/SearchBar/SearchBar";
import MostVisited from "./components/MostVisited/MostVisited";
import WeatherCard from "./components/WeatherCard/WeatherCard";
import Currencies from "./components/Currencies/Currencies";
import LatestNews from "./components/LatestNews/LatestNews";

import LnLoader from "./components/LN_Loader/LnLoader";
// import { parseString } from "xml2js";
const API_WEATHER = process.env.REACT_APP_WEATHER_API_KEY;
const DEFAULT_LATITUDE = -34.586624;
const DEFAULT_LONGITUDE = -58.4482816;

function App() {
  const [weather, setWeather] = useState();
  const [currencies, setCurrencies] = useState();
  const [latestNews, setLatestNews] = useState();

  const fetchWeather = async (lat, long) => {
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${API_WEATHER}&q=${lat},${long}&lang=es&days=1`
      );
      const weatherData = await response.json();
      return weatherData;
    } catch (error) {
      console.error("Error fetching weather data: ", error);
      return null;
    }
  };
  const fetchCurrencies = async () => {
    try {
      const response = await fetch(
        "https://especialess3.lanacion.com.ar/monitor-economia-real/data/cotizaciones_dolar_dia.json"
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching currency data: ", error);
      return null;
    }
  };

  const fetchNews = async () => {
    try {
      const [economiaResponse, politicaResponse, espectaculosResponse] =
        await Promise.all([
          fetch(
            "https://www.lanacion.com.ar/api/v1/notas/bySection/economia/params=size:50;page:1/?_website=la-nacion-ar&outputType=json"
          ),
          fetch(
            "https://www.lanacion.com.ar/api/v1/notas/bySection/politica/params=size:50;page:1/?_website=la-nacion-ar&outputType=json"
          ),
          fetch(
            "https://www.lanacion.com.ar/api/v1/notas/bySection/espectaculos/params=size:50;page:1/?_website=la-nacion-ar&outputType=json"
          ),
        ]);

      const [economiaData, politicaData, espectaculosData] = await Promise.all([
        economiaResponse.json(),
        politicaResponse.json(),
        espectaculosResponse.json(),
      ]);

      const updatedNews = {
        economia: economiaData.notas[0],
        politica: politicaData.notas[0],
        espectaculos: espectaculosData.notas[0],
      };

      return updatedNews;
    } catch (error) {
      console.error("Error fetching news data: ", error);
      return null;
    }
  };

  useEffect(() => {
    // Check local storage for existing data
    chrome.storage?.local.get(["myData", "expirationTime"], (result) => {
      const currentTime = Date.now();
      if (
        result.myData &&
        result.myData.weather &&
        result.myData.currencies &&
        result.myData.latestNews &&
        currentTime <= result.expirationTime
      ) {
        // Data exists in local storage and is not expired
        setWeather(result.myData.weather);
        setCurrencies(result.myData.currencies);
        setLatestNews(result.myData.latestNews);
      } else {
        // Data not found in local storage or is expired
        Promise.all([
          new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(
              (position) => {
                resolve(position);
              },
              (error) => {
                console.error("Error getting geolocation: ", error);
                resolve(null);
              }
            );
          }),
          fetchCurrencies(),
          fetchNews(),
        ]).then(([geolocation, currencyData, newsData]) => {
          if (geolocation !== null) {
            const { latitude, longitude } = geolocation.coords;
            fetchWeather(latitude, longitude).then((weatherData) => {
              setWeather(weatherData);
              const expirationTime = currentTime + 900000; // 15 minutes
              chrome.storage?.local.set({
                myData: {
                  weather: weatherData,
                  currencies: currencyData,
                  latestNews: newsData,
                },
                expirationTime: expirationTime,
              });
              setCurrencies(currencyData);
              setLatestNews(newsData);
            });
          } else {
            // Handle the case where geolocation is not available (shows Buenos Aires)
            fetchWeather(DEFAULT_LATITUDE, DEFAULT_LONGITUDE).then(
              (weatherData) => {
                setWeather(weatherData);
                const expirationTime = currentTime + 900000; // 15 minutes
                chrome.storage?.local.set({
                  myData: {
                    weather: weatherData,
                    currencies: currencyData,
                    latestNews: newsData,
                  },
                  expirationTime: expirationTime,
                });
                setCurrencies(currencyData);
                setLatestNews(newsData);
              }
            );
          }
        });
      }
      console.log(result.myData);
    });
  }, []);
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
      }}
    >
      <div
        style={{
          alignSelf: "flex-start",
          height: "8.36%",
          width: "100%",
          maxHeight: "77px",
        }}
      >
        <Nav />
      </div>
      <div
        style={{
          height: "91.64%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <div className="searchMost">
          <SearchBar />
          <MostVisited />
        </div>
        {!(weather || currencies || latestNews) ? (
          <LnLoader />
        ) : (
          <div
            className="showingCards"
            style={{
              width: "1032px",
              minWidth: "1032px",
              minHeight: "565px",
              height: "565px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: "0px auto",
            }}
          >
            <div
              style={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                marginRight: "19px",
              }}
            >
              {weather && <WeatherCard weather={weather} />}
              {currencies && <Currencies currencies={currencies} />}
            </div>
            {latestNews ? (
              <LatestNews latestNews={latestNews} />
            ) : (
              <div
                style={{
                  minWidth: "724px",
                  minHeight: "565px",
                  border: "1px solid #D9D9D9",
                  borderRadius: "12px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <LnLoader />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
