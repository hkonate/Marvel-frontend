import axios from "axios"
import { useState, useEffect } from "react"
const Favoris = () => {
    const [data, setData] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        try {
            const fecthData = async () => {
                const response = await axios.get("https://app-marvel-reacteur.herokuapp.com/favoris")
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
    return (isLoading ? <div className='back'><div className='ring'><span></span></div> <span className='load'>loading</span></div> : data.length < 1 ? <div className="no-favoris">NO FAVORIS</div> :
        <div className="Personnages">
            {
                data.map((favoris, index) => {
                    return (
                        <div className="character" key={index} onClick={async () => {
                            // const newTab = [...data]
                            // newTab.splice(index, 1);
                            await axios.delete(`https://app-marvel-reacteur.herokuapp.com/favoris/delete/${data[index]._id}`)
                            response = await axios.get("https://app-marvel-reacteur.herokuapp.com/favoris");
                            setData(response.data.userFavoris)
                        }}>
                            <img src={favoris.url_secure} alt="marvel's favoris" />
                            <span>{favoris.name}</span>
                            {favoris.description && <p>{favoris.description}</p>}
                        </div>
                    )
                })
            }
        </div>)
}
export default Favoris