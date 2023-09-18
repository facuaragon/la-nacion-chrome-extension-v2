/*global chrome*/
import React from "react";
import "./visitedCard.css";
import { useEffect, useState } from "react";

export default function VisitedCard({ visited }) {
  const [title, setTitle] = useState(visited.title);

  useEffect(() => {
    const rename = () => {
      const split = title.split(" ");
      if (title.length > 11) {
        const substring = title.substring(0, 13);
        setTitle(`${substring}...`);
      }
      // else {
      //   const last = split[0].slice(-1);
      //   if (!/[A-Za-z]$/.test(last)) {
      //     setTitle(split[0].slice(0, -1));
      //   } else {
      //     setTitle(split[0]);
      //   }
      // }
      // console.log(title);
    };
    rename();
  }, []);

  function faviconURL(u) {
    const url = new URL(chrome.runtime.getURL("/_favicon/"));
    url.searchParams.set("pageUrl", u); // this encodes the URL as well
    url.searchParams.set("size", "32");
    // console.log(url.toString());
    return url.toString();
  }

  return (
    <a className="string" href={visited.url}>
      <div className="card">
        <div
          className="img"
          style={{ backgroundImage: `url(${faviconURL(visited.url)})` }}
        >
          {/* <img src={faviconURL(visited.url)} alt={visited.title} /> */}
        </div>
        <div className="link">
          {/* <a className="string" href={visited.url} onClick={onAnchorClick}> */}
          {title}
          {/* </a> */}
        </div>
      </div>
    </a>
  );
}
