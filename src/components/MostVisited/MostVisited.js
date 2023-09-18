/*global chrome*/
import "./mostVisited.css";
import React, { useEffect, useState } from "react";

import VisitedCard from "../VisitedCard/VisitedCard";

function MostVisited() {
  const [mostVisitedURLs, setMostVisitedURLs] = useState([]);

  useEffect(() => {
    async function fetchMostVisitedURLs() {
      const topSites = await chrome.topSites.get();
      setMostVisitedURLs(topSites);
      // console.log(topSites);
    }
    // console.log(chrome.i18n.getUILanguage());
    fetchMostVisitedURLs();
  }, []);

  return (
    <>
      <div id="mostVisited_div">
        {mostVisitedURLs.slice(0, 5).map((url, index) => (
          <VisitedCard key={index} visited={url} />
        ))}
      </div>
    </>
  );
}

export default MostVisited;
