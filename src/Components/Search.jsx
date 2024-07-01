import { FaSearch, FaTimes } from "react-icons/fa";
import { useSearchContext } from "../Contexts/ResultContextProvider";

import { useNavigate } from "react-router";
import { useEffect } from "react";

function Search() {
  const { setQuery, text, setText } = useSearchContext();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Update localStorage and setQuery only when the form is submitted
    localStorage.setItem("searchInput", text);
    setQuery(text);
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
      setQuery(savedQuery);
     
    }
  }, [navigate, setQuery, setText]);

  return (
    <form
      className="flex items-center w-[20rem] sm:w-[35rem] gap-2 p-3 bg-gray-200 dark:bg-white rounded-full relative"
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
        onKeyDown={handleKeyDown} // Add the onKeyDown event handler
      />
      {text !== "" && (
        <button
          type="button"
          className="absolute top-4 right-4 cursor-pointer text-2xl text-gray-500"
          onClick={() => {
            setText("");
            setQuery("");
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
