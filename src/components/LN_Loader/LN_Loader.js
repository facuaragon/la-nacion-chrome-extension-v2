import "./ln_Loader.css";
import React, { useEffect } from "react";
import { Spinner } from "spin.js";

const LN_Loader = () => {
  useEffect(() => {
    var opts = {
      lines: 40,
      length: 2,
      width: 1,
      radius: 25,
      corners: 0.5,
      rotate: 1,
      color: "#006998",
      speed: 1,
      trail: 60,
      shadow: false,
      hwaccel: false,
      className: "spinner",
      zIndex: 2000000000,
      top: 0,
      left: 0,
    };

    var target = document.getElementById("loader");
    var spinner = new Spinner(opts).spin(target);

    return () => {
      spinner.stop();
    };
  }, []);

  return (
    <div className="container-loader">
      <div id="loader"></div>
    </div>
  );
};

export default LN_Loader;
