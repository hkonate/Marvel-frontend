
import { useEffect, useState } from 'react';
import axios from 'axios'

import Main from '../components/Main';
import Pagination from '../components/Pagination';


const Comics = ({ search, comicsData, setComicsData, favorisData, setFavorisData }) => {
    const [isLoading, setIsLoading] = useState(true)
    const [numberOfDataToSkip, setNumberOfDataToSkip] = useState(0)
    const titleOrName = "title"
    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`https://app-marvel-reacteur.herokuapp.com/comics?skip=${numberOfDataToSkip}`);
            setComicsData(response.data);
            setIsLoading(false)
        }
        fetchData()
    }, [numberOfDataToSkip, setComicsData, favorisData])

    return (isLoading ? <div className='back'><div className='ring'><span></span></div> <span className='load'>loading</span></div> :
        <div className='Personnages'>
            <Main search={search} data={comicsData} titleOrName={titleOrName} favorisData={favorisData} setFavorisData={setFavorisData} />
            <Pagination data={comicsData} numberOfDataToSkip={numberOfDataToSkip} setNumberOfDataToSkip={setNumberOfDataToSkip} />
        </div >)
}
export default Comics