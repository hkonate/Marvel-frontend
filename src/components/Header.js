import { Link } from 'react-router-dom'
import logo from '../img/Marvel_Logo.svg.png'
const Header = ({ search, setSearch, autoComplete, display, notFavoris, setDisplay }) => {

    return <div className="Header">
        <nav>
            <div className="header-container">
                <div className='logo-header'>
                    <div id='logo' className="logo">
                        <Link to="/"> <img src={logo} alt="lolgo" /></Link>

                    </div>
                    <div className='bar-nav'>
                        {/* disabled inputbar if its on favoris page */}
                        <input disabled={notFavoris ? null : true} type="text" onChange={event => {
                            setSearch(event.target.value)
                        }} onClick={() => {
                            // if click on input show / display autocomplete, click twice hide autocomplete
                            setDisplay(!display)
                        }} value={search} />
                        {display && <div className='autocomplete'>
                            {(autoComplete.results || autoComplete.userFavoris).map((character, index) => {
                                // filter autocomplete with search hook
                                return ((character.name || character.title).indexOf(search) !== -1 &&
                                    <div className='line-auto' key={index}>
                                        <span>{(character.name || character.title)}</span>
                                        <img src={(`${character.thumbnail.path}.${character.thumbnail.extension}` || character.url_secure)} alt="marvel pictures" />
                                    </div>)
                            })}</div>}
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