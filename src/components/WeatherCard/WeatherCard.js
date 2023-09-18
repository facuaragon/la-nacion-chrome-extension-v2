import React, { useEffect } from "react";
import "./weatherCard.css";
// import WeatherIcons from "../WeatherIcons/WeatherIcons";
// import LN_Loader from "../LN_Loader/LN_Loader";

export default function WeatherCard({ weather }) {
  useEffect(() => {
    function fitText(maxW, maxH, maxSize, className) {
      var c = document.getElementsByClassName(className);
      var d = document.createElement("span");
      d.style.fontSize = maxSize + "px";

      for (var i = 0; i < c.length; i++) {
        d.innerHTML = c[i].innerHTML;
        document.body.appendChild(d);
        var w = d.offsetWidth;
        var h = d.offsetHeight;
        document.body.removeChild(d);
        var x = w > maxW ? maxW / w : 1;
        var y = h > maxH ? maxH / h : 1;
        var r = Math.min(x, y) * maxSize;
        c[i].style.fontSize = r + "px";
      }
    }

    fitText(115.25, 27, 24.8, "currentCondition");
    fitText(148, 21.6, 17.87, "temperatures");
  }, []);
  // console.log("current weather", weather);
  // console.log("extended weather", globalweather);
  return (
    <>
      <div className="container-weather">
        {weather && (
          <>
            <div className="icon">
              <img
                src={`https:${weather.current.condition.icon}`}
                alt={weather.current.condition.text}
              />
            </div>
            <div className="weather-title">CLIMA</div>

            <div className="group">
              <div className="temp">
                {`${weather.current?.temp_c}`}
                <span>°</span>
              </div>
              <div className="weatherLine">
                <div className="currentCondition">
                  {weather.current.condition.text} •
                </div>
                <div className="temperatures">
                  &nbsp;MÁX:{" "}
                  {Math.round(weather.forecast?.forecastday[0].day.maxtemp_c)}°
                  MÍN:{" "}
                  {Math.round(weather.forecast?.forecastday[0].day.mintemp_c)}°
                </div>
              </div>
              <div className="location">
                {weather.location.name}, {weather.location?.region}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
