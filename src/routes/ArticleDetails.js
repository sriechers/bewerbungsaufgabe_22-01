import Layout from "../components/Layout";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import { fetchHandler, generateImgSrc } from "../utils";
import PublishedAt from "../components/PublishedAt";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

function ArticleDetails() {
  const { id } = useParams();

  const { data, error, isValidating } = useSWR(
    [
      `https://www.heise.de/extras/frontend/news/${id}`,
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

  return (
    <>
      <Helmet>
        <title>Artikeldetails</title>
      </Helmet>
      <Layout className="article-details">
        {data && (
          <>
            <Helmet>
              <title>{data.title}</title>
              <meta name="description" content={data.synopsis} />
            </Helmet>
            <div data-error={!!error} data-is-loading={isValidating}>
              <picture className="header-image">
                <source
                  media="(min-width:1440px)"
                  srcSet={generateImgSrc(data.image.src, 80, 1920)}
                />
                <source
                  media="(min-width:1280px)"
                  srcSet={generateImgSrc(data.image.src, 80, 1440)}
                />
                <source
                  media="(min-width:1024px)"
                  srcSet={generateImgSrc(data.image.src, 80, 1280)}
                />
                <source
                  media="(min-width:768px)"
                  srcSet={generateImgSrc(data.image.src, 80, 1024)}
                />
                <source
                  media="(min-width:640px)"
                  srcSet={generateImgSrc(data.image.src, 80, 768)}
                />
                <source
                  media="(min-width:480px)"
                  srcSet={generateImgSrc(data.image.src, 70, 640)}
                />
                <img
                  width="500px"
                  height="600px"
                  src={generateImgSrc(data.image.src, 70, 480)}
                  alt={data.image.alt}
                />
              </picture>
              <div className="scaffold">
                <div className="measure-base">
                  <Link className="back-button" to="/">
                    <span className="arrow">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 19l-7-7 7-7"
                        />
                      </svg>
                    </span>
                    <span className="link-text">zurück</span>
                  </Link>
                  <h1>{data.title}</h1>
                  <p className="author">von {data.meta.author}</p>
                  <PublishedAt time={data.meta.pubDate} />
                  <p className="article-content">{data.content}</p>
                </div>
              </div>
            </div>
          </>
        )}
        {error && (
          <p className="error-text">Der Artikel konnte nicht geladen werden.</p>
        )}
      </Layout>
    </>
  );
}

export default ArticleDetails;
