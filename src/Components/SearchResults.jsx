import ReactPlayer from "react-player";
import { useSearchContext } from "../Contexts/ResultContextProvider";
import { useLocation, useNavigate } from "react-router-dom";
import Spinner from "./Spinner";
import { useEffect, useState } from "react";
import { Pagination } from "@mui/material";

/* eslint-disable react/prop-types */
const SearchResults = () => {
  const { results, loading, getResults, query, text } = useSearchContext();
  const location = useLocation();
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(20);

  useEffect(() => {
    if (query !== "" || text !== "") {
      if (location.pathname === "/videos") {
        getResults(`/videos?q=${query}&num=25`);
      } else {
        getResults(`${location.pathname}?q=${query}&num=200`);
      }
      
    } 
  }, [query, location.pathname, navigate, text]);

  const paginated = (event, value) => {
    setCurrentPage(value);
    navigate(`${location.pathname}?page=${value}`);
  };

  if (loading) return <Spinner />;

  if (results?.organic?.length === 0)
    return (
      <div className="w-full mt-8 flex items-center justify-center ">
        <h2 className="dark:text-white text-xl font-semibold  ">
          No results found
        </h2>
      </div>
    );

  switch (location.pathname) {
    case "/search":
      return (
        <>
          <div className="sm:px-56 flex flex-wrap justify-between items-center gap-y-6 p-2 ">
            {results?.organic
              ?.slice(
                (currentPage - 1) * postsPerPage,
                currentPage * postsPerPage
              )
              .map(({ link, title }, index) => (
                <div key={index} className="md:w-2/5 w-full cursor-pointer">
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

          <div className="w-full py-10 mx-auto flex items-center justify-center">
            <Pagination
              count={Math.ceil(results?.organic?.length / postsPerPage) || 0}
              shape="rounded"
              page={currentPage}
              onChange={paginated}
              color="primary"
              defaultPage={1}
              sx={{
                "& .MuiPaginationItem-root": {
                  color: "#006bff", // Custom color for pagination items
                },
                "& .MuiPaginationItem-root.Mui-selected": {
                  backgroundColor: "#006bff", // Custom color for selected item background
                  color: "#ffffff", // Custom color for selected item text
                },
              }}
            />
          </div>
        </>
      );

    case "/news":
      return (
        <>
          <div className="sm:px-56 flex flex-wrap justify-between items-center gap-y-6 p-2 ">
            {results?.news?.length === 0 ? (
              <div className="w-full mt-8 flex items-center justify-center ">
                <h2 className="dark:text-white text-xl font-semibold  ">
                  No news found
                </h2>
              </div>
            ) : (
              results?.news
                ?.slice(
                  (currentPage - 1) * postsPerPage,
                  currentPage * postsPerPage
                )
                .map(({ position, source, title, link }) => (
                  <div
                    key={position}
                    className="md:w-2/5 w-full cursor-pointer"
                  >
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
                ))
            )}
          </div>

          <div className="w-full py-10 mx-auto flex items-center justify-center">
            <Pagination
              count={Math.ceil(results?.news?.length / postsPerPage) || 0}
              variant="outlined"
              shape="rounded"
              page={currentPage}
              onChange={paginated}
              color="secondary"
              defaultPage={1}
            />
          </div>
        </>
      );

    case "/videos":
      return (
        <>
          {results?.videos?.length === 0 ? (
            <div className="w-full mt-8 flex items-center justify-center">
              <h2 className="dark:text-white text-xl font-semibold">
                No Videos found
              </h2>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 px-2 lg:px-24 py-3 gap-8 overflow-x-scroll">
              {results?.videos?.map((video, index) => (
                <div key={index} className="rounded-md flex flex-col gap-2 flex-wrap">
                  <a
                    className="anch flex items-start flex-col gap-1 cursor-pointer"
                    rel="noreferrer"
                    target="_blank"
                    href={video.link}
                  >
                    <p className="text-gray-500 font-semibold text-sm">
                      {video.link.slice(8, 23)}
                      {`>`}watch
                    </p>
                    <span className="anc text-sky-500 hover:underline hover:text-sky-700 cursor-pointer">
                      {video.title}
                    </span>
                  </a>
                  <div className="flex items-center gap-3 flex-wrap">
                    <ReactPlayer
                      url={video.link}
                      controls
                      width="100%"
                      height="220px"
                      
                      config={{
                        file: {
                          attributes: {
                            sandbox: "allow-same-origin allow-scripts",
                          },
                        },
                      }}
                    />
                    <div className="flex flex-col gap-8 items-stretch">
                      <p className="max-w-80">{video.snippet}</p>
                      <span className="text-sm text-gray-500 ">
                        {video.source} . {video.channel} . {video.date}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      );

    case "/images":
      return (
        <>
          <div className="grid lg:grid-cols-4 sm:grid-cols-2 p-4">
            {results?.images?.length === 0 ? (
              <div className="w-full mt-8 flex items-center justify-center ">
                <h2 className="dark:text-white text-xl font-semibold  ">
                  No news found
                </h2>
              </div>
            ) : (
              results?.images?.map((image, index) => (
                <a
                  href={image.link}
                  target="_blank"
                  key={index}
                  rel="noreferrer"
                  className="sm:p-3 p-5 h-96"
                >
                  <img
                    src={image?.imageUrl}
                    alt={image.title}
                    loading="lazy"
                    className="h-auto w-full"
                  />
                  <p className="sm:w-36 w-36 break-words text-sm hidden">
                    {image.title}
                  </p>
                </a>
              ))
            )}
          </div>
        </>
      );

    default:
      return "/";
  }
};

export default SearchResults;
