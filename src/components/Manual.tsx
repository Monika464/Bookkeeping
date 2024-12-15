import React from "react";
import { useLanguage } from "../context/LanguageContext";
import translations from "./manual-translations";

export interface INavbarProps {}

const Manual: React.FunctionComponent<INavbarProps> = () => {
  const { currentLanguage } = useLanguage();
  const t = translations[currentLanguage as "en" | "pl"];

  return (
    <>
      <div>
        <h2>{t.title}</h2>
        <ol>
          {t.steps.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
      </div>

      <div>
        <h3>{t.addContractors.title}</h3>
        <ol>
          {t.addContractors.instructions.map((instruction, index) => (
            <li key={index}>{instruction}</li>
          ))}
        </ol>
      </div>

      <div>
        <h3>{t.addInvoices.title}</h3>
        <ol>
          {t.addInvoices.instructions.map((instruction, index) => (
            <li key={index}>{instruction}</li>
          ))}
        </ol>
      </div>
      <div>
        <h4>{t.addWarning.title}</h4>
        <ol>
          {t.addWarning.instructions.map((instruction, index) => (
            <li key={index} style={{ fontSize: "15px" }}>
              {instruction}
            </li>
          ))}
        </ol>
      </div>
      <br></br>
      <br></br>
    </>
  );
};

export default Manual;
