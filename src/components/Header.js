import { Link } from 'react-router-dom'
import logo from '../img/Marvel_Logo.svg.png'
const Header = ({ search, setSearch }) => {
    return <div className="Header">
        <nav>
            <div className="header-container">
                <div className='logo-header'>
                    <div className="logo">
                        <Link to="/"> <img src={logo} alt="lolgo" /></Link>

                    </div>
                    <div className='bar-nav'>
                        <input type="text" onChange={event => {
                            setSearch(event.target.value)
                        }} value={search} />

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