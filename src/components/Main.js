import axios from 'axios'
import { useEffect } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Main = ({ data, search, titleOrName, favorisData, setFavorisData }) => {
    let response;
    useEffect(() => {
        const fecth = async () => {
            const response = await axios.get("https://app-marvel-react.herokuapp.com/favoris")
            if (response.data) {
                setFavorisData(response.data.userFavoris)
            }
        }
        fecth()
    }, [setFavorisData])
    return (
        <>
            {
                data.results.map((character, index) => {
                    return (
                        character[titleOrName].indexOf(search) !== -1 &&
                        <div className="character" key={index} onClick={async () => {
                            const alreadyInFavoris = favorisData.findIndex(favoris => favoris.code === data.results[index]._id);
                            if (alreadyInFavoris === -1) {
                                if (!data.results[index].description) {
                                    await axios.post("https://app-marvel-react.herokuapp.com/favoris/create", {
                                        name: data.results[index][titleOrName],
                                        url_secure: `${data.results[index].thumbnail.path}.${data.results[index].thumbnail.extension}`,
                                        code: data.results[index]._id,
                                    })
                                    response = await axios.get("https://app-marvel-react.herokuapp.com/favoris")
                                    setFavorisData(response.data.userFavoris)
                                } else {
                                    await axios.post("https://app-marvel-react.herokuapp.com/favoris/create", {
                                        name: data.results[index][titleOrName],
                                        url_secure: `${data.results[index].thumbnail.path}.${data.results[index].thumbnail.extension}`,
                                        description: data.results[index].description,
                                        code: data.results[index]._id
                                    })
                                    response = await axios.get("https://app-marvel-react.herokuapp.com/favoris")
                                }
                                response = await axios.get("https://app-marvel-react.herokuapp.com/favoris")
                                setFavorisData(response.data.userFavoris)
                            } else {
                                await axios.delete(`https://app-marvel-react.herokuapp.com/favoris/delete/${favorisData[alreadyInFavoris]._id}`)
                                response = await axios.get("https://app-marvel-react.herokuapp.com/favoris")
                                setFavorisData(response.data.userFavoris);
                            }
                        }
                        }>
                            <img className={favorisData.findIndex(favoris => favoris.code === data.results[index]._id) === -1 ? "basic" : "gold"} src={`${character.thumbnail.path}.${character.thumbnail.extension}`} alt="marvel's character" />
                            <span>{character[titleOrName]}</span>
                            {character.description && <p>{character.description}</p>}
                            {
                                favorisData.findIndex(favoris => favoris.code === data.results[index]._id) !== -1
                                &&
                                <div style={{ color: "#ffd803", width: "25px", height: "25px", position: "absolute", right: "15px", bottom: "150px" }}>
                                    <FontAwesomeIcon icon="fa-bolt-lightning" className="fa-beat-fade" />
                                </div>
                            }
                        </div>
                    )
                })
            }
        </>
    )
}

export default Main