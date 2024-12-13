import { useEffect, useState } from "react";
import useMoneyAssetsQuery from "../../hooks/useMoneyAssetsQuery";
import useDataBaseQuery from "../../hooks/useDatabaseQuery";
import useCounting from "../../hooks/useCounting";

export interface IBalanceAP {}

const BalanceAP: React.FunctionComponent<IBalanceAP> = () => {
  const [totalCash, setTotalCash] = useState(0);
  const [totalAssets, setTotalAssets] = useState(0);
  //const [totalObligation, setTotalObligation] = useState(0);

  const assets = useMoneyAssetsQuery("assets");
  const cash = useMoneyAssetsQuery("cash");
  //const obligation = useMoneyAssetsQuery("obligation");

  const formatNumber = (value: number) => parseFloat(value.toFixed(2));

  const zaplacone = useDataBaseQuery("expenses", "paid", true);
  const niezaplacone = useDataBaseQuery("expenses", "paid", false);
  // const naleznosci = useDataBaseQuery("incomes","paid",false);
  const przychody = useDataBaseQuery("incomes");
  const koszty = useDataBaseQuery("expenses");
  const pozyczki = useDataBaseQuery("incomes", "loan", true);

  //console.log("pozyczki",pozyczki)

  const yearZaplacone = useCounting(zaplacone);
  const yearNiezaplacone = useCounting(niezaplacone);
  //const yearNaleznosci = useCounting(naleznosci);
  const yearPrzychody = useCounting(przychody);
  const yearKoszty = useCounting(koszty);
  const yearPozyczki = useCounting(pozyczki);

  const sumuOfCash = () => {
    //let totalCash = 0;
    Object.values(cash).forEach((exp: any) => {
      //console.log("exp",exp)
      setTotalCash(exp.cashInBank + exp.cashInHand);
    });
  };

  const stateOfAssets = () => {
    Object.values(assets).forEach((exp: any) => {
      // console.log("exp",exp)
      setTotalAssets(exp.assetsextra);
    });
  };

  useEffect(() => {
    sumuOfCash();
    stateOfAssets();
    //stateOfObligations();
  }, [cash, assets]);

  return (
    <div>
      <br></br>
      <h1>Bilans</h1>
      <h2>AKTYWA</h2>
      <h3>Aktywa trwałe</h3>
      <p>w tym środki trwałe:{totalAssets} zł</p>
      <h3>Aktywa obrotowe</h3>
      <p>{yearPrzychody + yearPozyczki + totalCash} zł</p>
      <p>w tym środki pieniężne:{totalCash} zł </p>

      {/* <p>Naleznosci: {yearNaleznosci}</p> */}
      <br></br>
      <h2>PASYWA </h2>
      <p>
        Fundusz statutowy:{" "}
        {formatNumber(yearZaplacone + totalAssets + totalCash)} zł
      </p>
      <p>Zobowiazania:{formatNumber(yearNiezaplacone + yearPozyczki)} zł</p>
      <p>Wynik: {formatNumber(yearPrzychody - yearKoszty)} zł</p>

      <h2>Suma Bilansowa</h2>
      <p>Aktywa {totalAssets + totalCash + yearPrzychody + yearPozyczki} zł</p>
      <p>
        Pasywa{" "}
        {yearZaplacone +
          totalAssets +
          totalCash +
          yearNiezaplacone +
          yearPozyczki +
          (yearPrzychody - yearKoszty)}{" "}
        zł
      </p>
    </div>
  );
};

export default BalanceAP;
