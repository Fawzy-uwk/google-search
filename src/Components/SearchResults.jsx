import ReactPlayer from "react-player";
import { useSearchContext } from "../Contexts/ResultContextProvider";
import { useLocation, useNavigate } from "react-router-dom";
import Spinner from "./Spinner";
import { useEffect } from "react";

/* eslint-disable react/prop-types */
const SearchResults = () => {
  const { results, loading, getResults, query, text } = useSearchContext();
  const location = useLocation();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (query !== "" || text !== "") {
      if (location.pathname === "/videos") {
        getResults(`/videos?q=${query}`);
      } else {
        getResults(`${location.pathname}?q=${query}&num=40`);
      }
    } else navigate("/");
  }, [query, location.pathname, navigate, text]);

  if (loading) return <Spinner />;

  switch (location.pathname) {
    case "/search":
      return (
        <>
          <div className="md:px-56 p-3 flex flex-wrap justify-between gap-y-6">
            {results?.organic?.map(({ link, title }, index) => (
              <div key={index} className="md:w-2/5 w-full">
                <a href={link} target="_blank" rel="noreferrer">
                  <p className="text-lg hover:underline dark:text-blue-300 text-blue-700">
                    {title}
                  </p>
                  <p className="text-sm ">
                    {link > 25 ? link.substring(0, 25) : link}
                  </p>
                </a>
              </div>
            ))}
          </div>
        </>
      );

    case "/news":
      return (
        <>
          <div className="sm:px-56 flex flex-wrap justify-between items-center gap-y-6 p-2 ">
            {results?.news?.map(({ position, source, title, link }) => (
              <div key={position} className="md:w-2/5 w-full cursor-pointer">
                <a
                  href={link}
                  target="_blank"
                  rel="noreferrer "
                  className="hover:underline"
                >
                  <p className="text-lg dark:text-blue-400 text-blue-800">
                    {title}
                  </p>
                </a>
                <div className="flex gap-4">
                  <a
                    href={link}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:underline hover:text-blue-300"
                  >
                    {source}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </>
      );

    case "/videos":
      return (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-4 px-2 lg:px-24 py-3 gap-8 ">
            {results?.videos?.map((video, index) => (
              <div key={index} className="rounded-md">
                <ReactPlayer
                  url={video.link}
                  controls
                  width="355px"
                  height="220px"
                  config={{
                    file: {
                      attributes: {
                        sandbox: "allow-same-origin allow-scripts",
                      },
                    },
                  }}
                />
              </div>
            ))}
          </div>
        </>
      );

    case "/images":
      return (
        <>
          <div className="grid lg:grid-cols-4 sm:grid-cols-2 p-4">
            {results?.images?.map((image, index) => (
              <a
                href={image.link}
                target="_blank"
                key={index}
                rel="noreferrer"
                className="sm:p-3 p-5h-96"
              >
                <img
                  src={image?.imageUrl}
                  alt={image.title}
                  loading="lazy"
                  className="h-96 w-full"
                />
                <p className="sm:w-36 w-36 break-words text-sm mt-2">
                  {image.title}
                </p>
              </a>
            ))}
          </div>
        </>
      );

    default:
      return "/";
  }
};

export default SearchResults;
