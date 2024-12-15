import React from "react";
import Contractors from "../components/display/Contractors";
import ContractorsForm from "../forms/ContractorsForm";
import { useLanguage } from "../context/LanguageContext.tsx";
import translations from "./contractorspage-translations.ts";

export interface IContractorsPage {}

const ContractorsPage: React.FunctionComponent<IContractorsPage> = () => {
  const { currentLanguage } = useLanguage();
  const t = translations[currentLanguage as "en" | "pl"];

  return (
    <div>
      <h3>{t.contractors}</h3>
      <ContractorsForm />
      <br></br>
      <Contractors />
    </div>
  );
};

export default ContractorsPage;
