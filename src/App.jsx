import { BrowserRouter, Route, Routes } from "react-router-dom";

import Footer from "./Components/Footer";
import Home from "./Components/Home";
import SearchResults from "./Components/SearchResults";
import { useState } from "react";
import Header from "./Components/Header";
import { Links } from "./Components/Links";


function App() {
  const [darkTheme, setDarkTheme] = useState(false);
  

  return (
    <div
      className={darkTheme ? "dark overflow-x-hidden" : " overflow-x-hidden"}
    >
      <div className="w-screen overflow-x-hidden min-h-screen bg-slate-50 dark:bg-slate-950  ">
        <BrowserRouter>
          <Header setDarkTheme={setDarkTheme} darkTheme={darkTheme} />
          <Links />
          <Routes>
            <Route index path="/" element={<Home darkTheme={darkTheme} />} />

            <Route path="/search" element={<SearchResults />} />
            <Route path="/images" element={<SearchResults />} />
            <Route path="/news" element={<SearchResults />} />
            <Route path="/videos" element={<SearchResults />} />
            <Route path="*" element={<Home />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
