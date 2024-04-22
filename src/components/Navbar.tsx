
export interface INavbarProps {};
import { NavLink } from 'react-router-dom';
import './navbar.css'

const Navbar: React.FunctionComponent<INavbarProps> =() => {


    return(<div className='navbar'>
 <NavLink to="/" className="navlink">Główna</NavLink>
<NavLink to="/calendar" className="navlink">Kalendarz</NavLink>
<NavLink to="/balance" className="navlink">Bilans</NavLink>
<NavLink to="/year" className="navlink">Rok</NavLink>
<NavLink to="/contractor" className="navlink">Kontrahenci</NavLink>
<NavLink to="/loginout" className="navlink">Logowanie</NavLink>
    </div>)
}
export default Navbar;
