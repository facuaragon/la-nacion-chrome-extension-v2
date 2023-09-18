import react, { useEffect, useState } from "react";
import { news } from "./news";
import "./latestNews.css";

export default function LatestNews() {
  //   const [xmlData, setXmlData] = useState(news);
  //   const [jsonData, setJsonData] = useState(news);
  //   console.log(jsonData);
  const [latestNews, setLatestNews] = useState(
    news.rss.channel.item.slice(0, 3)
  );
  //   useEffect(() => {
  //     const fetchNews = async () => {
  //       if (!xmlData) {
  //         try {
  //           const response = await fetch(
  //             "https://www.lanacion.com.ar/arc/outboundfeeds/rss/?outputType=xml"
  //           );
  //           if (response.ok) {
  //             const xmlText = await response.text();
  //             setXmlData(xmlText);
  //             if (xmlText) {
  //               const convertXmlToJson = () => {
  //                 if (xmlData) {
  //                   xml2js.parseString(xmlData, (err, result) => {
  //                     if (err) {
  //                       console.error("Error parsing XML:", err);
  //                     } else {
  //                       // Set the JSON data in the component's state
  //                       setJsonData(JSON.stringify(result, null, 2));
  //                     }
  //                   });
  //                 }
  //               };
  //               convertXmlToJson();
  //             }
  //           } else throw new Error("No se encontraron noticias");
  //         } catch (error) {
  //           console.log(error);
  //         }
  //       }
  //     };
  //     fetchNews();
  //   }, [xmlData]);

  //   if (xmlData) {
  //     const convertXmlToJson = () => {
  //       if (xmlData) {
  //         xml2js.parseString(xmlData, (err, result) => {
  //           if (err) {
  //             console.error("Error parsing XML:", err);
  //           } else {
  //             // Set the JSON data in the component's state
  //             setJsonData(JSON.stringify(result, null, 2));
  //           }
  //         });
  //       }
  //     };
  //     convertXmlToJson();
  //   }
  //   useEffect(() => {
  //     if (!latestNews) {
  //       setLatestNews(news.rss.channel.item.slice(0, 3));
  //       //   const fechaActual = new Date();
  //       //   for (const objeto of jsonData.rss.channel.item) {
  //       //     // Parsea la fecha de la propiedad "pubDate" del objeto
  //       //     const fechaObjeto = new Date(objeto.pubDate);

  //       //     // Compara las fechas
  //       //     if (fechaObjeto < fechaActual) {
  //       //       latestNews.push(objeto);
  //       //     }

  //       //     if (latestNews.length === 3) {
  //       //       break; // Rompe el bucle cuando latestNews tiene longitud 3
  //       //     }
  //       //   }
  //     }
  //   }, [news]);
  console.log(latestNews);

  return (
    <>
      <div className="news-container">
        <a href={latestNews[0].link}>
          <div className="first-news">
            <p className="first-news-title">
              <strong>
                {latestNews[0].title["#cdata-section"].split(":")[0].trim()}.
              </strong>
              <span>
                &nbsp;
                {latestNews[0].title["#cdata-section"].split(":")[1]?.trim()}
              </span>
            </p>
            <div
              className="first-news-image"
              style={{
                backgroundImage: `url(${latestNews[0]["media:content"]["-url"]})`,
              }}
            ></div>
          </div>
        </a>
        <div className="last-news">
          <div className="second-news">
            <a href={latestNews[1].link}>
              <div
                className="last-news-image"
                style={{
                  backgroundImage: `url(${latestNews[1]["media:content"]["-url"]})`,
                }}
              ></div>
              <p>
                <strong>
                  {latestNews[1].title["#cdata-section"].split(":")[0]?.trim()}.
                </strong>
                <span>
                  &nbsp;
                  {latestNews[1].title["#cdata-section"].split(":")[1]?.trim()}
                </span>
              </p>
            </a>
          </div>
          <div className="third-news">
            <a href={latestNews[2].link}>
              <div
                className="last-news-image"
                style={{
                  backgroundImage: `url(${latestNews[2]["media:content"]["-url"]})`,
                }}
              ></div>
              <p>
                <strong>
                  {latestNews[2].title["#cdata-section"].split(":")[0]?.trim()}.
                </strong>
                &nbsp;
                <span>
                  {latestNews[2].title["#cdata-section"].split(":")[1]?.trim()}
                </span>
              </p>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
