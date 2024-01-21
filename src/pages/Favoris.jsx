import axios from "axios";
import Splashscreen from "../components/Splashscreen";
import NoImage from "../img/no image.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const Favoris = ({ setNotFavoris, setHidePages }) => {
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
      };
      fecthData();
    } catch (error) {
      console.log(error.response.data);
    }
  }, [setHidePages, setNotFavoris]);

  const HandleDeleteFav = async (index) => {
    const response = await axios.delete(
      `https://marvel-backend-production.up.railway.app/favoris/delete/${data[index]._id}`
    );
    console.log(response.data);
    setData(response.data.userFavoris);
  };

  return isLoading ? (
    <Splashscreen />
  ) : data?.length < 1 ? (
    <div className="no-favoris">NO FAVORIS</div>
  ) : (
    <>
      <div className="Personnages">
        {data.map((favoris, index) => {
          return (
            <div
              className="character"
              key={index}
              onClick={() => {
                HandleDeleteFav(index);
              }}
            >
              <img
                className="gold"
                src={
                  favoris.url_secure !==
                  "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
                    ? favoris.url_secure
                    : NoImage
                }
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
