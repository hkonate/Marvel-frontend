import axios from "axios";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NoImage from "../img/no image.jpg";

const Main = ({ data, search, titleOrName, favorisData, setFavorisData }) => {
  let response;
  useEffect(() => {
    const fecth = async () => {
      const response = await axios.get(
        "https://marvel-backend-production.up.railway.app/favoris"
      );
      if (response.data) {
        setFavorisData(response.data.userFavoris);
      }
    };
    fecth();
  }, [setFavorisData]);

  const handleFavoris = async (index) => {
    const alreadyInFavoris = favorisData.findIndex(
      (favoris) => favoris.code === data.results[index]._id
    );
    if (alreadyInFavoris === -1) {
      if (!data.results[index].description) {
        await axios.post(
          "https://marvel-backend-production.up.railway.app/favoris/create",
          {
            name: data.results[index][titleOrName],
            url_secure: `${data.results[index].thumbnail.path}.${data.results[index].thumbnail.extension}`,
            code: data.results[index]._id,
          }
        );
        response = await axios.get(
          "https://marvel-backend-production.up.railway.app/favoris"
        );
        setFavorisData(response.data.userFavoris);
      } else {
        await axios.post(
          "https://marvel-backend-production.up.railway.app/favoris/create",
          {
            name: data.results[index][titleOrName],
            url_secure: `${data.results[index].thumbnail.path}.${data.results[index].thumbnail.extension}`,
            description: data.results[index].description,
            code: data.results[index]._id,
          }
        );
        response = await axios.get(
          "https://marvel-backend-production.up.railway.app/favoris"
        );
      }
      response = await axios.get(
        "https://marvel-backend-production.up.railway.app/favoris"
      );
      setFavorisData(response.data.userFavoris);
    } else {
      await axios.delete(
        `https://marvel-backend-production.up.railway.app/favoris/delete/${favorisData[alreadyInFavoris]._id}`
      );
      response = await axios.get(
        "https://marvel-backend-production.up.railway.app/favoris"
      );
      setFavorisData(response.data.userFavoris);
    }
  };

  return (
    <>
      {data.results.map((character, index) => {
        return (
          character[titleOrName].indexOf(search) !== -1 && (
            <div
              className="character"
              key={index}
              onClick={handleFavoris(index)}
            >
              <img
                className={
                  favorisData.findIndex(
                    (favoris) => favoris.code === data.results[index]._id
                  ) === -1
                    ? "basic"
                    : "gold"
                }
                src={
                  character.thumbnail.path !==
                  "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available"
                    ? `${character.thumbnail.path}.${character.thumbnail.extension}`
                    : NoImage
                }
                alt="marvel's character"
              />
              <span>{character[titleOrName]}</span>
              {character.description && <p>{character.description}</p>}
              {favorisData.findIndex(
                (favoris) => favoris.code === data.results[index]._id
              ) !== -1 && (
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
              )}
            </div>
          )
        );
      })}
    </>
  );
};

export default Main;
