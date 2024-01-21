import { useEffect, useState } from "react";
import axios from "axios";
import Main from "../components/Main";
import Splashscreen from "../components/Splashscreen";

const Comics = ({
  search,
  comicsData,
  setComicsData,
  favorisData,
  setFavorisData,
  setAutoComplete,
  setNotFavoris,
  setHidePages,
  enter,
  setEnter,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const titleOrName = "title";

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://marvel-backend-production.up.railway.app/comics`
      );
      setComicsData(response.data);
      setIsLoading(false);
      setAutoComplete(response.data);
      setHidePages([false, true, false]);
      setNotFavoris(true);
      setEnter(false);
    };
    fetchData();
  }, [
    favorisData,
    setAutoComplete,
    setHidePages,
    setNotFavoris,
    setEnter,
    setComicsData,
  ]);

  return isLoading ? (
    <Splashscreen />
  ) : (
    <div className="Personnages">
      <Main
        search={search}
        data={comicsData}
        titleOrName={titleOrName}
        favorisData={favorisData}
        setFavorisData={setFavorisData}
        enter={enter}
      />
    </div>
  );
};
export default Comics;
