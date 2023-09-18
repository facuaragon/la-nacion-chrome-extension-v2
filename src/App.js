/*global chrome*/
import "./App.css";
import { useState, useEffect } from "react";
import Nav from "./components/Nav/Nav";
import SearchBar from "./components/SearchBar/SearchBar";
import MostVisited from "./components/MostVisited/MostVisited";
import WeatherCard from "./components/WeatherCard/WeatherCard";
import Currencies from "./components/Currencies/Currencies";
import LatestNews from "./components/LatestNews/LatestNews";
const { parseString } = require("xml2js");

const API_WEATHER = process.env.REACT_APP_WEATHER_API_KEY;

function App() {
  const [weather, setWeather] = useState();
  const [currencies, setCurrencies] = useState();
  const [latestNews, setLatestNews] = useState();

  const fetchNews = async () => {
    try {
      const response = await fetch(
        "https://www.lanacion.com.ar/arc/outboundfeeds/rss/?outputType=xml"
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const xmlText = await response.text();
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlText, "text/xml");
      console.log(xmlDoc);
      setLatestNews(xmlDoc);
    } catch (error) {
      console.error(error);
    }
  };
  const fetchInfo = (lat, long) => {
    fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${API_WEATHER}&q=${lat},${long}&lang=es&days=1`
    )
      .then((response) => response.json())
      .then((weatherData) => {
        setWeather(weatherData);
        fetch(
          "https://especialess3.lanacion.com.ar/monitor-economia-real/data/cotizaciones_dolar_dia.json"
        )
          .then((response) => response.json())
          .then((currenciesData) => {
            setCurrencies(currenciesData);
            const expirationTime = currentTime + 900000; // 15 minutes in milisegundos

            chrome.storage?.local.set({
              myData: {
                weather: weatherData,
                currencies: currenciesData,
              },
              expirationTime: expirationTime,
            });
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));

    fetchNews();
  };

  useEffect(() => {
    chrome.storage?.local.get(["myData", "expirationTime"], (result) => {
      const currentTime = Date.now();
      // console.log(result.myData);
      if (
        !result.myData?.weather ||
        !result.myData?.currencies ||
        result.myData?.weather.error ||
        currentTime > result.expirationTime
      ) {
        navigator.geolocation.getCurrentPosition(function (position) {
          var latitude = position.coords.latitude;
          var longitude = position.coords.longitude;

          if (latitude && longitude) {
            fetchInfo(latitude, longitude);
            // fetch(
            //   `https://api.weatherapi.com/v1/forecast.json?key=${API_WEATHER}&q=${latitude},${longitude}&lang=es&days=1`
            // )
            //   .then((response) => response.json())
            //   .then((weatherData) => {
            //     setWeather(weatherData); // Update the state with weather data
            //     fetch(
            //       "https://especialess3.lanacion.com.ar/monitor-economia-real/data/cotizaciones_dolar_dia.json"
            //     )
            //       .then((response) => response.json())
            //       .then((currenciesData) => {
            //         setCurrencies(currenciesData); // Update the state with currencies data
            //         const expirationTime = currentTime + 900000; // 15 minutos en milisegundos
            //         // const expirationTime = currentTime + 10; // 15 minutos en milisegundos
            //         chrome.storage?.local.set({
            //           myData: {
            //             weather: weatherData,
            //             currencies: currenciesData,
            //           },
            //           expirationTime: expirationTime,
            //         });
            //         // console.log("weather: ", weatherData);
            //         // console.log("currencies: ", currenciesData);
            //       })
            //       .catch((error) => console.log(error));
            //   })
            //   .catch((error) => console.log(error));
          } else {
            fetchInfo(-34.586624, -58.4482816);
          }
        });
      } else {
        // console.log("myData:", result.myData);
        setWeather(result.myData.weather);
        setCurrencies(result.myData.currencies);
        fetchNews();
      }
      // const fetchNews = async () => {
      //   try {
      //     const response = await fetch(
      //       "https://www.lanacion.com.ar/arc/outboundfeeds/rss/?outputType=xml"
      //     );

      //     if (!response.ok) {
      //       throw new Error("Network response was not ok");
      //     }

      //     const xmlText = await response.text();
      //     const parser = new DOMParser();
      //     const xmlDoc = parser.parseFromString(xmlText, "text/xml");
      //     console.log(xmlDoc);
      //   } catch (error) {
      //     console.error(error);
      //   }
      // };

      // fetchNews();
    });
  }, []);

  return (
    <>
      <Nav />
      <SearchBar />
      <MostVisited />
      <div
        style={{
          width: "1032px",
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
        <LatestNews latestNews={latestNews} />
      </div>
    </>
  );
}

export default App;
