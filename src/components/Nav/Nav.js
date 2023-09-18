import React from "react";
import "./nav.css";
import LaNacion from "../icons/Lanacion";
export default function Nav() {
  return (
    <>
      <div className="nav">
        <a href="https://www.lanacion.com.ar/">
          <LaNacion />
        </a>
      </div>
    </>
  );
}
