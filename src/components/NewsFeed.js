import { useState, useRef } from "react";
import useSWR from "swr";
import { truncateString, fetchHandler, generateImgSrc } from "../utils";
import { useLayoutEffect, useEffect } from "react";
import LazyImage from "./LazyImage";
import { useSearchParams } from "../utils/hooks";
import { Link } from "react-router-dom";
import PublishedAt from "./PublishedAt";
import Toast from "./Toast";

function NewsFeed({
  fetchLimit = 8,
  thumbnailQuality = 70,
  thumbnailWidth = 480,
}) {
  const [hasNextPage, setHasNextPage] = useState(true);
  const [hasPrevPage, setHasPrevPage] = useState(true);
  const ref = useRef();

  const { page } = useSearchParams();
  const [currentPageIndex, setCurrentPageIndex] = useState(page || 0);

  const { data, error, isValidating } = useSWR(
    [
      `https://www.heise.de/extras/frontend/news?limit=${fetchLimit}&offset=${currentPageIndex}`,
      {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          "X-Heise-Token": "zcJulkgE",
        },
      },
    ],
    fetchHandler,
    {
      revalidateOnFocus: false,
      revalidateIfStale: false,
    }
  );

  useLayoutEffect(() => {
    // erste Seite des Feeds
    if (currentPageIndex === 0) {
      setHasNextPage(true);
      setHasPrevPage(false);
    } // letzte Seite
    else if (parseInt(currentPageIndex) > 100 - fetchLimit) {
      setHasPrevPage(true);
      setHasNextPage(false);
    } else {
      setHasPrevPage(true);
      setHasNextPage(true);
    }
  }, [currentPageIndex, setHasNextPage, setHasPrevPage]);

  useEffect(() => {
    if (typeof window == undefined) return;
    const reload = () => window.location.reload();

    window.addEventListener("popstate", reload);
    return () => {
      window.removeEventListener("popstate", reload);
    };
  }, []);

  const updateFeedPage = (type) => {
    const offset = currentPageIndex;
    let newPageIndex =
      type === "increment"
        ? parseInt(offset) + 1 + (fetchLimit - 1)
        : parseInt(offset) - 1 - (fetchLimit - 1);

    setCurrentPageIndex(newPageIndex);
    const newUrl = `/?offset=${newPageIndex}&limit=${fetchLimit}`;

    window.history.pushState({}, null, newUrl);
    ref.current.scrollIntoView();
    return false;
  };

  return (
    <section ref={ref} className="scaffold">
      {error && <Toast text="Der Newsfeed konnte nicht geladen werden." />}
      <h2>Aktuelle News</h2>
      <div
        id="news-feed"
        className="news-feed"
        data-error={!!error}
        data-is-loading={isValidating}
      >
        {error && (
          <p className="error-text">
            Die Newsartikel konnten nicht abgerufen werden.
          </p>
        )}
        {data?.map((news) => {
          let newImgSrc = generateImgSrc(
            news.image.src,
            thumbnailQuality,
            thumbnailWidth
          );

          return (
            <article key={news.id} className="news-feed-item">
              <Link to={`/artikel/${news.id}`} title="Artikeldetails ansehen">
                <LazyImage
                  src={newImgSrc}
                  alt={news.image.alt}
                  height={"auto"}
                  width={480}
                />
                <div className="content">
                  <h3>{news.title}</h3>
                  <PublishedAt time={news.meta.pubDate} />
                  <p>{truncateString(news.synopsis, 100)}</p>
                </div>
              </Link>
            </article>
          );
        })}
      </div>
      {data && (
        <nav className="nav-buttons flex justify-around items-center">
          {hasPrevPage && (
            <button
              onClick={() => updateFeedPage("decrement")}
              className="button-white"
            >
              vorherige Seite
            </button>
          )}
          {hasNextPage && (
            <button
              onClick={() => updateFeedPage("increment")}
              className="button-white"
            >
              nächste Seite
            </button>
          )}
        </nav>
      )}
    </section>
  );
}

export default NewsFeed;
