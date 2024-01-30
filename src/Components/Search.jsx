import { FaSearch, FaTimes } from "react-icons/fa";
import { useSearchContext } from "../Contexts/ResultContextProvider";
import { useDebounce } from "use-debounce";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

function Search() {
  const { setQuery } = useSearchContext();
  const [text, setText] = useState(() => {
    // Retrieve the input value from localStorage when the component mounts
    return localStorage.getItem("searchInput") || "";
  });

  const navigate = useNavigate();

  const HandleSubmit = (e) => {
    e.preventDefault();
    setQuery(text);
    navigate("search");
  };

  // Update localStorage with the input value whenever it changes
  useEffect(() => {
    localStorage.setItem("searchInput", text);
    setQuery(text);
  }, [text, setQuery]);

  return (
    <form
      className="flex items-center w-[20rem] sm:w-[35rem] gap-2 p-3 bg-gray-200 dark:bg-white rounded-full relative"
      onSubmit={HandleSubmit}
    >
      <FaSearch color="gray" />
      <input
        placeholder="Search Google or type URL"
        className="bg-inherit text-lg focus:outline-none focus:border-none w-full"
        name="query"
        id="query"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      {text !== "" && (
        <button
          type="button"
          className="absolute top-4 right-4 text-2xl text-gray-500 "
          onClick={() => {
            setText("");
            setQuery("");
          }}
        >
          <FaTimes color="black" size={20} />
        </button>
      )}
    </form>
  );
}

export default Search;
