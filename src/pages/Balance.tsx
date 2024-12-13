import React from "react";
import BalanceAP from "../components/display/BalanceAP";
import { YearSelector } from "../context/YearContextType";
import CashForm from "../forms/CashForm";
import { useYear } from "../context/YearContextType";
import AssetsForAmortisation from "../forms/AssetsForAmortisation";
import IncomeLoan from "../forms/IncomeLoan";
import ProfitLossAccount from "../components/display/ProfitLossAccount";
import { useState } from "react";

export interface IBalance {}

const Balance: React.FunctionComponent<IBalance> = () => {
  const [isEdited, setIsEdited] = useState<boolean>(false);

  const { editedYear } = useYear();

  const handleEdit = () => {
    setIsEdited(!isEdited);
  };

  // console.log("dataFromBaseE",dataFromBaseE)
  return (
    <div>
      <h1>Bilans oraz Informacja dodatkowa</h1>
      <br></br>
      <br></br>
      <YearSelector />
      <br></br>
      Edytujesz rok: {editedYear}
      <br></br>
      <br></br>
      <button onClick={handleEdit} className="btnsmall">
        {isEdited ? "Zakończ edycję" : "Edytuj dane uzupełniające"}
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
