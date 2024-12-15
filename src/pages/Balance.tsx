import React from "react";
import BalanceAP from "../components/display/BalanceAP";
import { YearSelector } from "../context/YearContextType";
import CashForm from "../forms/CashForm";
import { useYear } from "../context/YearContextType";
import AssetsForAmortisation from "../forms/AssetsForAmortisation";
import IncomeLoan from "../forms/IncomeLoan";
import ProfitLossAccount from "../components/display/ProfitLossAccount";
import { useState } from "react";
import { useLanguage } from "../context/LanguageContext.tsx";
import translations from "./balance-translations.ts";

export interface IBalance {}

const Balance: React.FunctionComponent<IBalance> = () => {
  const { currentLanguage } = useLanguage();
  const t = translations[currentLanguage as "en" | "pl"];

  const [isEdited, setIsEdited] = useState<boolean>(false);

  const { editedYear } = useYear();

  const handleEdit = () => {
    setIsEdited(!isEdited);
  };

  // console.log("dataFromBaseE",dataFromBaseE)
  return (
    <div>
      <h1>{t.balanceSheet}</h1>
      <br></br>
      <br></br>
      <YearSelector />
      <br></br>
      {t.editedYear} {editedYear}
      <br></br>
      <br></br>
      <button onClick={handleEdit} className="btnsmall">
        {isEdited ? t.finishedit : t.edit}
      </button>
      {isEdited && (
        <div>
          <CashForm />
          <br></br>
          <br></br>
          <AssetsForAmortisation />
          <br></br>
          <br></br>
          <IncomeLoan />
        </div>
      )}
      <br></br>
      <br></br>
      <ProfitLossAccount />
      <BalanceAP />
    </div>
  );
};

export default Balance;
