import "./css/App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faBoltLightning } from "@fortawesome/free-solid-svg-icons";

import Header from "./components/Header";
import Personnages from "./pages/Personnages";
import Comics from "./pages/Comics";
import Favoris from "./pages/Favoris";

library.add(faBoltLightning);

function App() {
  const [data, setData] = useState(null);
  const [comicsData, setComicsData] = useState(null);
  const [search, setSearch] = useState("");
  const [autoComplete, setAutoComplete] = useState([]);
  const [notFavoris, setNotFavoris] = useState(false);
  const [favorisData, setFavorisData] = useState([]);
  const [display, setDisplay] = useState(false);
  const [enter, setEnter] = useState(false);
  const [hidePages, setHidePages] = useState([false, false, false]);

  return (
    <Router>
      <Header
        setSearch={setSearch}
        search={search}
        autoComplete={autoComplete}
        notFavoris={notFavoris}
        display={display}
        setEnter={setEnter}
        enter={enter}
        setDisplay={setDisplay}
        favorisData={favorisData}
        hidePages={hidePages}
        setHidePages={setHidePages}
      />
      <Routes>
        <Route
          path="/"
          element={
            <Personnages
              setNotFavoris={setNotFavoris}
              data={data}
              setData={setData}
              setAutoComplete={setAutoComplete}
              search={search}
              favorisData={favorisData}
              setFavorisData={setFavorisData}
              hidePages={hidePages}
              setHidePages={setHidePages}
              setEnter={setEnter}
              enter={enter}
            />
          }
        />
        <Route
          path="/comics"
          element={
            <Comics
              search={search}
              comicsData={comicsData}
              setComicsData={setComicsData}
              favorisData={favorisData}
              setFavorisData={setFavorisData}
              setAutoComplete={setAutoComplete}
              setNotFavoris={setNotFavoris}
              hidePages={hidePages}
              setHidePages={setHidePages}
              setEnter={setEnter}
              enter={enter}
            />
          }
        />
        <Route
          path="/favoris"
          element={
            <Favoris
              favorisData={favorisData}
              setFavorisData={setFavorisData}
              data={data}
              comicsData={comicsData}
              setAutoComplete={setAutoComplete}
              setNotFavoris={setNotFavoris}
              hidePages={hidePages}
              setHidePages={setHidePages}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
