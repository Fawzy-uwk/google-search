import { NavLink, useLocation } from "react-router-dom";

const links = [
  { url: "/search", text: "🔎 All" },
  { url: "/news", text: "📰 News" },
  { url: "/images", text: "📸 Images" },
  { url: "/videos", text: "📺 Videos" },
];

export const Links = () => {
  const location = useLocation();
  return (
    (location.pathname === "/search" ||
      location.pathname === "/news" ||
      location.pathname === "/images" ||
      location.pathname === "/videos") && (
      <div className="flex gap-4 w-full md:w-[1000px] md:ml-auto my-8 ml-8 items-center mt-4">
        {links.map(({ url, text }) => (
          <NavLink
            to={url}
            key={url}
            className={({ isActive }) =>
              !isActive
                ? ""
                : "text-blue-700 border-b-2 dark:text-blue-300 border-blue-700 pb-2"
            }
          >
            {text}
          </NavLink>
        ))}
      </div>
    )
  );
};
