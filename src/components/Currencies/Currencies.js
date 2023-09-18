import React from "react";
import "./currencies.css";

export default function Currencies({ currencies }) {
  // console.log(currencies);
  const dolarOficial = {
    name: "DÓLAR OFICIAL",
    value: currencies["dolar_minorista"]?.venta.split(",")[0],
  };
  const dolarBlue = {
    name: "DÓLAR BLUE",
    value: currencies["dolar_blue"]?.venta.split(",")[0],
  };
  // console.log(dolarOficial);
  // console.log(dolarBlue);
  return (
    <>
      <div className="container-currencies">
        <div className="currencies-title">COTIZACIÓN</div>
        <div>
          <div>
            <div className="currency-exchange">
              $<span>{dolarOficial.value}</span>
            </div>
            <div className="currency-name">{dolarOficial.name}</div>
          </div>
          <div>
            <div className="currency-exchange2">
              $<span>{dolarBlue.value}</span>
            </div>
            <div className="currency-name2">{dolarBlue.name}</div>
          </div>
        </div>
      </div>
    </>
  );
}
