import axios from "axios";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NoImage from "../img/no image.jpg";

const Main = ({
  data,
  titleOrName,
  favorisData,
  setFavorisData,
  enter,
  search,
}) => {
  let response;
  useEffect(() => {
    const fecth = async () => {
      try {
        const response = await axios.get(
          "https://marvel-backend-production-b96a.up.railway.app/favoris"
        );
        setFavorisData(response.data.userFavoris);
      } catch (error) {}
    };
    fecth();
  }, [setFavorisData]);

  const handleFavoris = async (index) => {
    const alreadyInFavoris = favorisData?.findIndex(
      (favoris) => favoris.code === data.results[index]._id
    );
    try {
      if (alreadyInFavoris === -1) {
        response = await axios.post(
          "https://marvel-backend-production-b96a.up.railway.app/favoris/create",
          {
            name: data.results[index][titleOrName],
            url_secure: `${data.results[index].thumbnail.path}.${data.results[index].thumbnail.extension}`,
            code: data.results[index]._id,
            description: data.results[index].description
              ? data.results[index].description
              : null,
          }
        );
      } else {
        response = await axios.delete(
          `https://marvel-backend-production-b96a.up.railway.app/favoris/delete/${favorisData[alreadyInFavoris]._id}`
        );
      }
      setFavorisData(response.data.userFavoris);
    } catch (error) {}
  };
  return (
    <>
      {data.results.map((character, index) => {
        return enter ? (
          character[titleOrName].indexOf(search) !== -1 && (
            <div
              className="character"
              key={index}
              onClick={() => {
                handleFavoris(index);
              }}
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
        ) : (
          <div
            className="character"
            key={index}
            onClick={() => {
              handleFavoris(index);
            }}
          >
            <img
              className={
                favorisData?.findIndex(
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
            {favorisData?.findIndex(
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
        );
      })}
    </>
  );
};

export default Main;
