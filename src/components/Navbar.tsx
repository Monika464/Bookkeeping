import React, { useContext } from "react";
import { signOut } from "firebase/auth";
import chart from "../assets/chart.svg";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./navbar.css";
import { auth } from "../App";
import { useLanguage } from "../context/LanguageContext.tsx";
import translations from "../components/navbar-translations.tsx";

export interface INavbarProps {}

const Navbar: React.FunctionComponent<INavbarProps> = () => {
  const { state, dispatch } = useContext(AuthContext);
  const { currentLanguage, setCurrentLanguage } = useLanguage();

  const navigate = useNavigate();
  const t = translations[currentLanguage as "en" | "pl"];

  const logout = async () => {
    try {
      await signOut(auth); // Wylogowanie użytkownika
      dispatch({ type: "LOGOUT", payload: null }); // Aktualizacja kontekstu
      navigate("/login");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };
  const toggleLanguage = (language: "en" | "pl") => {
    setCurrentLanguage(language);
  };

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
                {t.calendar}
              </NavLink>
            )}
          </li>
          <li>
            {state.user && (
              <NavLink to="/balance" className="navlink">
                {t.balance}
              </NavLink>
            )}
          </li>
          <li>
            {state.user && (
              <NavLink to="/year" className="navlink">
                {t.year}
              </NavLink>
            )}
          </li>
          <li>
            {state.user && (
              <NavLink to="/contractor" className="navlink">
                {t.contractors}
              </NavLink>
            )}
          </li>
          <li>
            {state.user && (
              <NavLink to="/userpanel" className="navlink">
                Panel
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
          {/* Language switch */}
          <li className="language-switch">
            <span
              className={currentLanguage === "en" ? "active-language" : ""}
              onClick={() => toggleLanguage("en")}
            >
              EN
            </span>{" "}
            |{" "}
            <span
              className={currentLanguage === "pl" ? "active-language" : ""}
              onClick={() => toggleLanguage("pl")}
            >
              PL
            </span>
          </li>
        </ul>
      </nav>
    </>
  );
};
export default Navbar;
