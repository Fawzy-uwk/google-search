import { FaSearch, FaTimes } from "react-icons/fa";
import { useSearchContext } from "../Contexts/ResultContextProvider";

import { useNavigate } from "react-router";
import { useEffect, useState } from "react";

function Search() {
  const { setQuery } = useSearchContext();
  const navigate = useNavigate();
  const [text, setText] = useState(""); // Move the text state to this component

  const handleSubmit = (e) => {
    e.preventDefault();
    setQuery(text); // Update the query only when the form is submitted
    localStorage.setItem("searchInput", text);
    navigate("search");
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      handleSubmit(e);
    }
  };

  useEffect(() => {
    const savedQuery = localStorage.getItem("searchInput");
    if (savedQuery) {
      setText(savedQuery);
    }
  }, []);

  return (
    <form
      className="flex items-center w-full sm:w-[35rem] gap-2 p-3 bg-gray-200 dark:bg-white rounded-full relative"
      onSubmit={handleSubmit}
    >
      <FaSearch color="gray" />
      <input
        placeholder="Search Google or type URL"
        className="bg-inherit text-lg focus:outline-none focus:border-none w-full"
        name="query"
        id="query"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      {text !== "" && (
        <button
          type="button"
          className="absolute top-4 right-4 cursor-pointer text-2xl text-gray-500"
          onClick={() => {
            setText("");
            localStorage.removeItem("searchInput");
          }}
        >
          <FaTimes color="black" size={20} />
        </button>
      )}
    </form>
  );
}

export default Search;
