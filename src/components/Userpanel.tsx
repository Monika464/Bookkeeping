import React from "react";
import { To, useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext.tsx";
import translations from "../components/userpanel-translations.ts";

export interface IUserpanel {}

const Userpanel: React.FunctionComponent<IUserpanel> = () => {
  const { currentLanguage } = useLanguage();

  const navigate = useNavigate();
  const t = translations[currentLanguage as "en" | "pl"];
  //const t = translations[currentLanguage as keyof typeof translations];

  const redirectTo = (localisation: To) => {
    navigate(localisation);
  };

  return (
    <>
      <p>{t.manual}</p>
      <button
        onClick={() => {
          redirectTo(`/manual`);
        }}
        className="btn"
      >
        Manual
      </button>
      <br></br>
      <br></br>
      <p>{t.saving}</p>
      <button
        onClick={() => {
          redirectTo(`/calendar`);
        }}
        className="btn"
      >
        Calendar
      </button>
      <br></br>
      <br></br>
      <p>{t.balance}</p>
      <button
        onClick={() => {
          redirectTo(`/balance`);
        }}
        className="btn"
      >
        Balance
      </button>
      <br></br>
      <br></br>
      <p>{t.year}</p>
      <button
        onClick={() => {
          redirectTo(`/year`);
        }}
        className="btn"
      >
        Year
      </button>
      <br></br>
      <br></br>
      <p>{t.contractors}</p>
      <button
        onClick={() => {
          redirectTo(`/contractor`);
        }}
        className="btn"
      >
        Contractors
      </button>
      <br></br>
      <br></br>
      {/* <p>Logowanie:</p> */}
      {/* <button
        onClick={() => {
          redirectTo(`/loginout`);
        }}
        className="btn"
      >
        Login
      </button> */}
      {/* <button onClick={redirectToAdminPanel}>Calendar</button> */}
    </>
  );
};

export default Userpanel;
