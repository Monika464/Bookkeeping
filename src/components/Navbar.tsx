import React, { useContext } from "react";
import { signOut } from "firebase/auth";

import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./navbar.css";
import { auth } from "../App";

export interface INavbarProps {}

const Navbar: React.FunctionComponent<INavbarProps> = () => {
  const { state, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await signOut(auth); // Wylogowanie użytkownika
      dispatch({ type: "LOGOUT", payload: null }); // Aktualizacja kontekstu
      navigate("/login");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  // const logout = () => {
  //   navigate("/login");
  //   return signOut(auth);
  // };

  // const toggleLanguage = (language: "en" | "pl") => {
  //   setCurrentLanguage(language);
  // };

  return (
    <>
      <nav className="navbar">
        <ul>
          <li>
            {!state.user && (
              <NavLink to="/signup2" className="navlink">
                Signup
              </NavLink>
            )}
          </li>
          <li>
            {!state.user && (
              <NavLink to="/login2" className="navlink">
                Login
              </NavLink>
            )}
          </li>

          <li>
            {state.user && (
              <NavLink to="/calendar" className="navlink">
                Kalendarz
              </NavLink>
            )}
          </li>
          <li>
            {state.user && (
              <NavLink to="/balance" className="navlink">
                Bilans
              </NavLink>
            )}
          </li>
          <li>
            {state.user && (
              <NavLink to="/year" className="navlink">
                Rok
              </NavLink>
            )}
          </li>
          <li>
            {state.user && (
              <NavLink to="/contractor" className="navlink">
                Kontrahent
              </NavLink>
            )}
          </li>
          <li>
            {state.user && (
              <NavLink to="/userpanel" className="navlink">
                Userpanel
              </NavLink>
            )}
          </li>
          <li>
            {state.user && (
              <button onClick={logout} className="navlink">
                Logout
              </button>
            )}
          </li>
        </ul>
      </nav>
      {/* <div className="navbar">
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
      </div> */}
    </>
  );
};
export default Navbar;
