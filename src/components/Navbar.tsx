import React, { useContext } from "react";
import { signOut } from "firebase/auth";
import chart from "../../public/assets/chart.svg";
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

  // useEffect(() => {
  //   if (!state.user) {
  //     navigate("/");
  //   } else {
  //     navigate("/userpanel");
  //   }
  // }, [state.user, navigate]); // Efekt reaguje na zmiany w stanie użytkownika

  // const toggleLanguage = (language: "en" | "pl") => {
  //   setCurrentLanguage(language);
  // };

  return (
    <>
      <nav className="navbar">
        <ul>
          <li className="logo">
            <img src={chart} alt="logo" />
            <span className="title">Bookkeeper</span>
          </li>
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
              <button onClick={logout} className="btn">
                Logout
              </button>
            )}
          </li>
        </ul>
      </nav>
    </>
  );
};
export default Navbar;
