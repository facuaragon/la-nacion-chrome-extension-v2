import React from "react";

import ClearDay from "./clear-day";
import ClearNight from "./clear-night";
import Cloudy from "./cloudy";
import Fog from "./fog";
import PartlyCloudyDay from "./partly-cloudy-day";
import PartlyCloudyNight from "./partly-cloudy-night";
import Rain from "./rain";
import Snow from "./snow";
import Wind from "./wind";

// export const iconList = {
//   clearDay: <ClearDay />,
//   clearNight: <ClearNight />,
//   cloudy: <Cloudy />,
//   fog: <Fog />,
//   partlyCloudyDay: <PartlyCloudyDay />,
//   PartlyCloudyNight: <PartlyCloudyNight />,
//   rain: <Rain />,
//   snow: <Snow />,
//   wind: <Wind />,
// };

export const WeatherIcons = ({ name, width, height, fill }) => {
  let newName = name;
  const iconList = {
    clearDay: <ClearDay />,
    clearNight: <ClearNight />,
    cloudy: <Cloudy />,
    fog: <Fog />,
    partlyCloudyDay: <PartlyCloudyDay />,
    partlyCloudyNight: <PartlyCloudyNight />,
    rain: <Rain />,
    snow: <Snow />,
    wind: <Wind />,
  };
  if (newName === "partly-cloudy-day") {
    newName = "partlyCloudyDay";
  } else if (newName === "partly-cloudy-night") {
    newName = "partlyCloudyNight";
  } else if (newName === "clear-day") {
    newName = "clearDay";
  } else if (newName === "clear-night") {
    newName = "clearNight";
  }
  const iconComponent = iconList[newName];
  if (!iconComponent) {
    return null;
  } else {
    const selectedIcon = React.cloneElement(iconComponent, {
      width: width,
      height: height,
      fill: fill,
    });
    return selectedIcon;
  }
};
export default WeatherIcons;
