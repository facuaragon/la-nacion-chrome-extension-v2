import React from "react";

const Fog = ({ width, height, fill, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 16.002 16.002"
    {...props}
  >
    <path
      fill={fill}
      d="M8.642.668C6.484.67 4.65 1.999 3.774 3.9l-.061.13-.139.01C1.58 4.184.002 5.91.002 8.008c0 .727.201 1.403.531 1.992h1.201a3.057 3.057 0 0 1-.732-1.992c0-1.597 1.184-2.866 2.644-2.973l.723-.05.31-.663v-.004c.729-1.58 2.213-2.649 3.961-2.65 2.368.002 4.292 1.952 4.405 4.447v.01l.05.776.704.296a1.944 1.944 0 0 1 1.195 1.815c.01 1.114-.846 1.988-1.871 1.988H0v1h13.122c1.591 0 2.877-1.35 2.877-2.988a2.958 2.958 0 0 0-1.805-2.735l-.137-.058-.01-.149C13.912 3.077 11.561.67 8.643.668zM.002 13v1h16v-1zm0 2v1h16v-1z"
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
  </svg>
);

export default Fog;