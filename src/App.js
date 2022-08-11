import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import axios from 'axios'
import { useState, useEffect } from "react"



import Header from './components/Header';
import Personnages from './pages/Personnages'
import Comics from './pages/Comics'
import Favoris from './pages/Favoris'



function App() {
  const [numberOfDataToSkip, setNumberOfDataToSkip] = useState(0);
  const [data, setData] = useState(null)
  const [comicsData, setComicsData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [autoComplete, setAutoComplete] = useState([])
  const [notFavoris, setNotFavoris] = useState(false)
  const [favorisData, setFavorisData] = useState([])
  const [display, setDisplay] = useState(false)

  useEffect(() => {
    const fecthData = async () => {
      const response = await axios.get(`https://app-marvel-react.herokuapp.com/characters?skip=${numberOfDataToSkip}`)
      if (response.data) {
        setData(response.data)
        setAutoComplete(response.data)
        setIsLoading(false)
      }
    }
    fecthData();
  }, [numberOfDataToSkip])
  return (
    isLoading ? <div className='back'><div className='ring'><span></span></div> <span className='load'>loading</span></div> :
      <Router>
        <Header setSearch={setSearch} search={search} autoComplete={autoComplete} notFavoris={notFavoris} display={display} setDisplay={setDisplay} />
        <Routes>
          <Route path='/' element={<Personnages setNotFavoris={setNotFavoris} data={data} numberOfDataToSkip={numberOfDataToSkip} setNumberOfDataToSkip={setNumberOfDataToSkip} search={search} favorisData={favorisData} setFavorisData={setFavorisData} />} />
          <Route path='/comics' element={<Comics search={search} comicsData={comicsData} setComicsData={setComicsData} numberOfDataToSkip={numberOfDataToSkip} setNumberOfDataToSkip={setNumberOfDataToSkip} favorisData={favorisData} setFavorisData={setFavorisData} setAutoComplete={setAutoComplete} setNotFavoris={setNotFavoris} />} />
          <Route path='/favoris' element={<Favoris favorisData={favorisData} setFavorisData={setFavorisData} data={data} comicsData={comicsData} setAutoComplete={setAutoComplete} setNotFavoris={setNotFavoris} setDisplay={setDisplay} />} />
        </Routes>
      </Router>
  );
}

export default App;
