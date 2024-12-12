import React from "react";

export interface INavbarProps {}
import { NavLink } from "react-router-dom";
import "./navbar.css";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
const Navbar: React.FunctionComponent<INavbarProps> = () => {
  const { currentUser } = useContext(UserContext);

  return (
    <div className="navbar">
      <NavLink to="/" className="navlink">
        Główna
      </NavLink>
      <NavLink to="/calendar" className="navlink">
        Kalendarz
      </NavLink>
      <NavLink to="/balance" className="navlink">
        Bilans
      </NavLink>
      <NavLink to="/year" className="navlink">
        Rok
      </NavLink>
      <NavLink to="/contractor" className="navlink">
        Kontrahenci
      </NavLink>
      <NavLink to="/loginout" className="navlink">
        Logowanie
      </NavLink>
    </div>
  );
};
export default Navbar;
