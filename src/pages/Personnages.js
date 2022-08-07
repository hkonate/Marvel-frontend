import Pagination from '../components/Pagination'
import Main from '../components/Main'

const Personnages = ({ data, numberOfDataToSkip, setNumberOfDataToSkip, search, favorisData, setFavorisData }) => {
    const titleOrName = 'name'
    return (
        <div className="Personnages">
            <Main data={data} search={search} titleOrName={titleOrName} favorisData={favorisData} setFavorisData={setFavorisData} />
            <Pagination data={data} numberOfDataToSkip={numberOfDataToSkip} setNumberOfDataToSkip={setNumberOfDataToSkip} />
        </div >
    )
}

export default Personnages