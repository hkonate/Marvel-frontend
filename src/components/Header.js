import { Link } from 'react-router-dom'
import { useRef, useEffect } from 'react';
import logo from '../img/Marvel_Logo.svg.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Header = ({ search, setSearch, autoComplete, display, notFavoris, setDisplay, favorisData }) => {
    const refOne = useRef(null)


    useEffect(() => {
        document.addEventListener("click", handleClickOutside, true)
        return () => {
            document.removeEventListener("click", handleClickOutside, true)
        };

    })

    const handleClickOutside = e => {
        if (refOne.current && !refOne.current.contains(e.target)) {
            setDisplay(false)
        }
    }
    console.log(autoComplete);
    return <div className="Header">
        <nav>
            <div className="header-container">
                <div className='logo-header'>
                    <div id='logo' className="logo">
                        <Link to="/"> <img src={logo} alt="lolgo" /></Link>

                    </div>
                    <div className='bar-nav'>
                        {/* disabled inputbar if its on favoris page */}
                        <input
                            ref={refOne}
                            disabled={notFavoris ? null : true}
                            type="text"
                            onChange={event => {
                                setSearch(event.target.value)
                            }}
                            onClick={() => {
                                // if click on input show / display autocomplete, click twice hide autocomplete
                                setDisplay(true)
                            }}
                            onKeyDown={(event) => {
                                if (event.key === 'Enter' || event.keyCode === 13) {
                                    setDisplay(false)
                                }
                            }}
                            value={search} />
                        {display
                            &&
                            <div className='autocomplete'>
                                {
                                    autoComplete.results.map((character, index) => {
                                        // filter autocomplete with search hook
                                        return ((character.name || character.title).indexOf(search) !== -1 &&
                                            <div className='line-auto' key={index} >
                                                <span>{(character.name || character.title)}</span>
                                                <img src={(`${character.thumbnail.path}.${character.thumbnail.extension}` || character.url_secure)} alt="marvel pictures" />
                                                {
                                                    favorisData.findIndex(favoris => favoris.code === autoComplete.results[index]._id) !== -1
                                                    &&
                                                    <div style={{ color: "#ffd803", width: "10px", height: "10px", position: "absolute", right: "20px", bottom: "20px" }}>
                                                        <FontAwesomeIcon style={{ width: "20px", height: "20px" }} icon="fa-bolt-lightning" className="fa-beat-fade" />
                                                    </div>
                                                }
                                            </div>)
                                    })
                                }
                            </div>}
                    </div>
                </div>
                <div className='nav'>
                    <Link to="/"><span>personages</span></Link>
                    <Link to="/comics"><span>comics</span></Link>
                    <Link to="/favoris"><span>favoris</span></Link>
                </div>
            </div>
        </nav>
    </div>
}

export default Header