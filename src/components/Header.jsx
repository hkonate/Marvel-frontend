import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import logo from "../img/Marvel_Logo.svg.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NoImage from "../img/no image.jpg";

const Header = ({
  search,
  setSearch,
  autoComplete,
  display,
  notFavoris,
  setDisplay,
  favorisData,
  hidePages,
  setEnter,
}) => {
  const [text, setText] = useState("");
  const refOne = useRef(null);

  const handleClear = () => {
    setSearch(null);
    setEnter(false);
    setText("");
  };

  const handleSearcch = (e) => {
    if (e.key === "Enter") {
      setDisplay(false);
      setEnter(true);
      e.target.blur();
      setText("");
    }
  };

  return (
    <div className="Header">
      <nav>
        <div className="header-container">
          <div className="logo-header">
            <div onClick={handleClear} id="logo" className="logo">
              <Link to="/">
                <img src={logo} alt="lolgo" />
              </Link>
            </div>
            <div className="bar-nav">
              {/* disabled inputbar if its on favoris page */}
              <input
                ref={refOne}
                disabled={notFavoris ? null : true}
                type="text"
                value={text}
                onChange={(event) => {
                  setSearch(event.target.value);
                  setText(event.target.value);
                }}
                onFocus={() => {
                  // if click on input show / display autocomplete, click twice hide autocomplete
                  setDisplay(true);
                }}
                onKeyDown={(event) => {
                  handleSearcch(event);
                }}
                onBlur={() => {
                  setDisplay(false);
                }}
              />
              {display && refOne.current.value.length > 0 && (
                <div className="autocomplete">
                  {autoComplete.results.map((character, index) => {
                    // filter autocomplete with search hook
                    return (
                      (character.name || character.title).indexOf(search) !==
                        -1 && (
                        <div className="line-auto" key={index}>
                          <span>{character.name || character.title}</span>
                          <img
                            src={
                              character.thumbnail.path !==
                              "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available"
                                ? `${character.thumbnail.path}.${character.thumbnail.extension}`
                                : NoImage
                            }
                            alt="marvel pictures"
                          />
                          {favorisData.findIndex(
                            (favoris) =>
                              favoris.code === autoComplete.results[index]._id
                          ) !== -1 && (
                            <div
                              style={{
                                color: "#ffd803",
                                width: "10px",
                                height: "10px",
                                position: "absolute",
                                right: "20px",
                                bottom: "20px",
                              }}
                            >
                              <FontAwesomeIcon
                                style={{ width: "20px", height: "20px" }}
                                icon="fa-bolt-lightning"
                                className="fa-beat-fade"
                              />
                            </div>
                          )}
                        </div>
                      )
                    );
                  })}
                </div>
              )}
            </div>
          </div>
          <div className="nav">
            <Link
              style={{ display: hidePages[0] === true ? "none" : "initial" }}
              to="/"
            >
              <span onClick={handleClear}>personages</span>
            </Link>
            <Link
              style={{ display: hidePages[1] === true ? "none" : "initial" }}
              to="/comics"
            >
              <span onClick={handleClear}>comics</span>
            </Link>
            <Link
              style={{ display: hidePages[2] === true ? "none" : "initial" }}
              to="/favoris"
            >
              <span onClick={handleClear}>favoris</span>
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
