import Pagination from '../components/Pagination'
import Main from '../components/Main'

const Personnages = ({ data, numberOfDataToSkip, setNumberOfDataToSkip, search, favorisData, setFavorisData, setNotFavoris }) => {
    const titleOrName = 'name'
    setNotFavoris(true)
    return (
        <div className="Personnages">
            <Main data={data} search={search} titleOrName={titleOrName} favorisData={favorisData} setFavorisData={setFavorisData} />
            <Pagination data={data} numberOfDataToSkip={numberOfDataToSkip} setNumberOfDataToSkip={setNumberOfDataToSkip} />
        </div >
    )
}

export default Personnages