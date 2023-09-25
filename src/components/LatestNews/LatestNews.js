import "./latestNews.css";

export default function LatestNews({ latestNews }) {
  return (
    <>
      <div className="news-container">
        <a href={`https://www.lanacion.com.ar/${latestNews.politica.url}`}>
          <div className="first-news">
            <p className="first-news-title">
              <span className="latest-description">
                {latestNews.politica.titulo.split(":")[0].trim()}.
              </span>
              <span>
                &nbsp;
                {latestNews.politica.titulo.split(":")[1]?.trim()}
              </span>
            </p>
            <div
              className="first-news-image"
              style={{
                backgroundImage: `url(${latestNews.politica.imagen.absoluteUrl})`,
              }}
            ></div>
          </div>
        </a>
        <div className="last-news">
          <div className="second-news">
            <a
              href={`https://www.lanacion.com.ar/${latestNews.espectaculos.url}`}
            >
              <div
                className="last-news-image"
                style={{
                  backgroundImage: `url(${latestNews.espectaculos.imagen.absoluteUrl})`,
                }}
              ></div>
              <p>
                <span className="latest-description">
                  {latestNews.espectaculos.titulo.split(":")[0]?.trim()}.
                </span>
                <span>
                  &nbsp;
                  {latestNews.espectaculos.titulo.split(":")[1]?.trim()}
                </span>
              </p>
            </a>
          </div>
          <div className="third-news">
            <a href={`https://www.lanacion.com.ar/${latestNews.economia.url}`}>
              <div
                className="last-news-image"
                style={{
                  backgroundImage: `url(${latestNews.economia.imagen.absoluteUrl})`,
                }}
              ></div>
              <p>
                <span className="latest-description">
                  {latestNews.economia.titulo.split(":")[0]?.trim()}.
                </span>
                &nbsp;
                <span>{latestNews.economia.titulo.split(":")[1]?.trim()}</span>
              </p>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
