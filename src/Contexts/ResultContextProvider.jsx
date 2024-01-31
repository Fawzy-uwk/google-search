import { createContext, useContext, useState } from "react";

const SearchContext = createContext();
const baseUrl = "https://google.serper.dev";

/* eslint-disable react/prop-types */
export const ResultsContextProvider = ({ children }) => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [text, setText] = useState(() => {
    // Retrieve the input value from localStorage when the component mounts
    return localStorage.getItem("searchInput") || "";
  });

  const getResults = async (url) => {
    setLoading(true);

    const res = await fetch(`${baseUrl}/${url}`, {
      method: "GET",
      headers: {
        "X-API-KEY": "fe371b5ca8e93f02409d84dedddf4e4d75d23685",
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    setResults(data);
    setLoading(false);
  };

  return (
    <SearchContext.Provider
      value={{ getResults, results, query, text, setText, setQuery, loading }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearchContext = () => useContext(SearchContext);
