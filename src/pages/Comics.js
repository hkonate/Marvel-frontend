
import { useEffect, useState } from 'react';
import axios from 'axios'

import Main from '../components/Main';
import Pagination from '../components/Pagination';
import Splashscreen from '../components/Splashscreen';


const Comics = ({ search, comicsData, setComicsData, favorisData, setFavorisData, setAutoComplete, setNotFavoris, setHidePages, hidePages }) => {
    const [isLoading, setIsLoading] = useState(true)
    const [numberOfDataToSkip, setNumberOfDataToSkip] = useState(0)
    const titleOrName = "title"


    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`https://app-marvel-react.herokuapp.com/comics?skip=${numberOfDataToSkip}`);
            setComicsData(response.data);
            setIsLoading(false)
            setAutoComplete(response.data)
            setHidePages([false, true, false])
            setNotFavoris(true)
        }
        fetchData()
    }, [numberOfDataToSkip, setComicsData, favorisData, setAutoComplete, setHidePages, setNotFavoris])

    return (isLoading ? <Splashscreen /> :
        <div className='Personnages'>
            <Main search={search} data={comicsData} titleOrName={titleOrName} favorisData={favorisData} setFavorisData={setFavorisData} />
            <Pagination data={comicsData} numberOfDataToSkip={numberOfDataToSkip} setNumberOfDataToSkip={setNumberOfDataToSkip} setIsLoading={setIsLoading} hidePages={hidePages} />
        </div >)
}
export default Comics