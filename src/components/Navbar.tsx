
export interface INavbarProps {};
import { NavLink } from 'react-router-dom';
import './navbar.css'

const Navbar: React.FunctionComponent<INavbarProps> =() => {


    return(<div className='navbar'>
 <NavLink to="/" className="navlink">Home</NavLink>
<NavLink to="/calendar" className="navlink">Calendar</NavLink>
<NavLink to="/balance" className="navlink">Balance</NavLink>
<NavLink to="/year" className="navlink">Year</NavLink>
<NavLink to="/contractor" className="navlink">Contractors</NavLink>
<NavLink to="/loginout" className="navlink">Login</NavLink>
    </div>)
}
export default Navbar;
