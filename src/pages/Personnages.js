import Main from "../components/Main";
import axios from "axios";
import { useEffect, useState } from "react";

const Personnages = ({
  data,
  search,
  favorisData,
  setFavorisData,
  setNotFavoris,
  setData,
  setAutoComplete,
  setHidePages,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const titleOrName = "name";

  useEffect(() => {
    const fecthData = async () => {
      const response = await axios.get(
        `https://marvel-backend-production.up.railway.app/characters`
      );
      if (response.data) {
        setData(response.data);
        setAutoComplete(response.data);
        setIsLoading(false);
        setNotFavoris(true);
      }
      setHidePages([true, false, false]);
    };
    fecthData();
  }, [setAutoComplete, setData, setHidePages, setNotFavoris]);
  return isLoading ? (
    <div className="back">
      <div className="ring">
        <span></span>
      </div>{" "}
      <span className="load">loading</span>
    </div>
  ) : (
    <div className="Personnages">
      <Main
        data={data}
        search={search}
        titleOrName={titleOrName}
        favorisData={favorisData}
        setFavorisData={setFavorisData}
      />
    </div>
  );
};

export default Personnages;
