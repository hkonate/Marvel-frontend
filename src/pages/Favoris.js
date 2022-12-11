import axios from "axios";
import Splashscreen from "../components/Splashscreen";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

import { useState, useEffect } from "react";

const Favoris = ({ setNotFavoris, setDisplay, setHidePages }) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const fecthData = async () => {
        const response = await axios.get(
          "https://marvel-backend-production.up.railway.app/favoris"
        );
        if (response.data) {
          setData(response.data.userFavoris);
          setIsLoading(false);
        }
        //Don't show the input
        setNotFavoris(false);
        setHidePages([false, false, true]);
        // Don't show autocomplete
        setDisplay(false);
      };
      fecthData();
    } catch (error) {
      console.log(error.response.data);
    }
  }, [setDisplay, setHidePages, setNotFavoris]);

  let response;
  return isLoading ? (
    <Splashscreen />
  ) : data.length < 1 ? (
    <div className="no-favoris">NO FAVORIS</div>
  ) : (
    <>
      <div className="Personnages">
        {data.map((favoris, index) => {
          return (
            <div
              className="character"
              key={index}
              onClick={async () => {
                await axios.delete(
                  `https://marvel-backend-production.up.railway.app/favoris/delete/${data[index]._id}`
                );
                response = await axios.get(
                  "https://marvel-backend-production.up.railway.app/favoris"
                );
                setData(response.data.userFavoris);
              }}
            >
              <img
                className="gold"
                src={favoris.url_secure}
                alt="marvel's favoris"
              />
              <span>{favoris.name}</span>
              {favoris.description && <p>{favoris.description}</p>}
              <div
                style={{
                  color: "#ffd803",
                  width: "25px",
                  height: "25px",
                  position: "absolute",
                  right: "15px",
                  bottom: "150px",
                }}
              >
                <FontAwesomeIcon
                  icon="fa-bolt-lightning"
                  className="fa-beat-fade"
                />
              </div>
            </div>
          );
        })}
      </div>
      <div className="bot-nav">
        <Link style={{ display: "block" }} to="/">
          <span>personages</span>
        </Link>
        <Link style={{ display: "block" }} to="/comics">
          <span>comics</span>
        </Link>
      </div>
    </>
  );
};
export default Favoris;
