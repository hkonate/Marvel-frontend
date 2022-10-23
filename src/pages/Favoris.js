import axios from "axios"
import Splashscreen from "../components/Splashscreen"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useState, useEffect } from "react"

const Favoris = ({ setNotFavoris, setDisplay }) => {
    const [data, setData] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    //don't show bar on favoris page
    useEffect(() => {
        setNotFavoris(false)
    })

    // Don't show autocomplete
    setDisplay(false)
    useEffect(() => {
        try {
            const fecthData = async () => {
                const response = await axios.get("https://app-marvel-react.herokuapp.com/favoris")
                if (response.data) {
                    setData(response.data.userFavoris)
                    setIsLoading(false)
                }
            }
            fecthData();
        } catch (error) {
            console.log(error.response.data);
        }
    }, [])

    let response;
    return (isLoading ? <Splashscreen /> : data.length < 1 ? <div className="no-favoris">NO FAVORIS</div> :
        <div className="Personnages">
            {
                data.map((favoris, index) => {
                    return (
                        <div className="character" key={index} onClick={async () => {
                            await axios.delete(`https://app-marvel-react.herokuapp.com/favoris/delete/${data[index]._id}`)
                            response = await axios.get("https://app-marvel-react.herokuapp.com/favoris");
                            setData(response.data.userFavoris)
                        }}>
                            <img className="gold" src={favoris.url_secure} alt="marvel's favoris" />
                            <span>{favoris.name}</span>
                            {favoris.description && <p>{favoris.description}</p>}
                            <div style={{ color: "#ffd803", width: "25px", height: "25px", position: "absolute", right: "15px", bottom: "150px" }}>
                                <FontAwesomeIcon icon="fa-bolt-lightning" className="fa-beat-fade" />
                            </div>
                        </div>
                    )
                })
            }
        </div>)
}
export default Favoris