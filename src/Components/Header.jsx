import { FaMoon, FaSun } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import Search from "./Search";
import google from "../assets/google.svg";

/* eslint-disable react/prop-types */
const Header = ({ setDarkTheme, darkTheme, text, setText }) => {
  const location = useLocation();

  return (
    <header
      className={
        location.pathname !== ""
          ? "w-full md:px-10 px-4 py-3 flex items-center justify-between border-b-2 dark:border-b-slate-800 flex-wrap gap-2 border-b-slate-300"
          : "w-full md:px-10 px-2  py-3 flex items-center justify-center md:justify-between border-b-2 dark:border-b-slate-800 flex-wrap gap-2 border-b-slate-300"
      }
    >
      <Link to="/" className="text-3xl text-sky-950 font-semibold">
        <img src={google} className="h-10 w-full"/>
      </Link>

      {(location.pathname === "/search" ||
        location.pathname === "/news" ||
        location.pathname === "/images" ||
        location.pathname === "/videos") && (
        <Search text={text} setText={setText} />
      )}
      <div
        onClick={() => setDarkTheme((dark) => !dark)}
        className="flex items-center gap-2 justify-center cursor-pointer"
      >
        {darkTheme ? (
          <FaSun size={22} fill="#f1d400" />
        ) : (
          <FaMoon size={22} fill="#083173" />
        )}
        <p className="text-xl capitalize font-[500]">
          {darkTheme ? "light" : "dark"}
        </p>
      </div>
    </header>
  );
};

export default Header;
