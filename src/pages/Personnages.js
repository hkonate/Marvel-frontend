import Pagination from '../components/Pagination'
import Main from '../components/Main'
import axios from 'axios'
import { useEffect, useState } from 'react'

const Personnages = ({ data, search, favorisData, setFavorisData, setNotFavoris, setData, setAutoComplete }) => {
    const [isLoading, setIsLoading] = useState(true)
    const [numberOfDataToSkip, setNumberOfDataToSkip] = useState(0);
    const titleOrName = 'name'

    useEffect(() => {
        const fecthData = async () => {
            const response = await axios.get(`https://app-marvel-react.herokuapp.com/characters?skip=${numberOfDataToSkip}`)
            if (response.data) {
                setData(response.data)
                setAutoComplete(response.data)
                setIsLoading(false)
                setNotFavoris(true)
            }
        }
        fecthData();
    }, [numberOfDataToSkip])
    return (isLoading ? <div className='back'><div className='ring'><span></span></div> <span className='load'>loading</span></div> :
        <div className="Personnages">
            <Main data={data} search={search} titleOrName={titleOrName} favorisData={favorisData} setFavorisData={setFavorisData} />
            <Pagination data={data} numberOfDataToSkip={numberOfDataToSkip} setNumberOfDataToSkip={setNumberOfDataToSkip} />
        </div >
    )
}

export default Personnages