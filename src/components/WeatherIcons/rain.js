import React from "react";

const Rain = ({ width, height, fill, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 16 16"
    {...props}
  >
    <g fill={fill} color="#000">
      <path
        d="M8.56.084C6.672.085 5.068 1.249 4.301 2.912l-.055.113-.121.01C2.38 3.162 1 4.672 1 6.508 1 8.427 2.5 10 4.357 10h8.125C13.874 10 15 8.818 15 7.385c0-1.087-.653-2-1.578-2.393l-.121-.05-.01-.13C13.172 2.194 11.115.086 8.562.084zm0 1c2.004.001 3.635 1.652 3.731 3.773v.016l.06.748.677.291v.002c.57.242.973.785.973 1.47 0 .91-.692 1.616-1.518 1.616H4.36C3.069 9 2 7.905 2 6.508c0-1.334.988-2.388 2.198-2.477l.705-.049.305-.648v-.002c.618-1.343 1.872-2.247 3.351-2.248z"
        fontFamily="sans-serif"
        fontWeight={400}
        overflow="visible"
        style={{
          lineHeight: "normal",
          InkscapeFontSpecification: "sans-serif",
          textIndent: 0,
          textAlign: "start",
          textDecorationLine: "none",
          textTransform: "none",
          marker: "none",
        }}
      />
      <path
        d="M8.003 16a1.501 1.501 0 0 1-1.424-1.972c0-.015.01-.03.014-.045.038-.127.598-1.965 1.412-3.614v.002a27.871 27.871 0 0 1 1.42 3.657A1.501 1.501 0 0 1 8 16zM12 14a1 1 0 0 1-.95-1.314c0-.01.01-.02.01-.03.025-.085.4-1.31.941-2.41v.001c.58 1.201.948 2.438 .948 2.438a1 1 0 0 1-.95 1.314zm-8 0a1 1 0 0 1-.95-1.314c0-.01.01-.02.01-.03.025-.085.4-1.31 .941-2.41v.001a18.52 18.52 0 0 1 .948 2.439A1 1 0 0 1 3.999 14z"
        overflow="visible"
        style={{
          marker: "none",
        }}
      />
    </g>
  </svg>
);

export default Rain;
