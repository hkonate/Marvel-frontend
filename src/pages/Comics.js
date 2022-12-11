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
    };
    fetchData();
  }, [
    setComicsData,
    favorisData,
    setAutoComplete,
    setHidePages,
    setNotFavoris,
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
      />
    </div>
  );
};
export default Comics;
