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

  const formatNumber = (value: number) => parseFloat(value.toFixed(0));

  const kosztyOplacone = useDataBaseQuery("expenses", "paid", true);
  const kosztyNieoplacone = useDataBaseQuery("expenses", "paid", false);
  // const naleznosci = useDataBaseQuery("incomes","paid",false);
  const przychodyOpłacone = useDataBaseQuery("incomes", "paid", true);
  const przychodyNiezaplacone = useDataBaseQuery("incomes", "paid", false);
  const koszty = useDataBaseQuery("expenses");
  console.log("koszty prosto z bazy", koszty);
  const przychody = useDataBaseQuery("incomes");
  const pozyczki = useDataBaseQuery("incomes", "loan", true);

  //console.log("pozyczki",pozyczki)

  //const yearZaplaconeKoszty = useCounting(kosztyOplacone);
  const yearNiezaplaconeKoszty = useCounting(kosztyNieoplacone);
  const yearNiezaplaconePrzychody = useCounting(przychodyNiezaplacone);
  //const yearNaleznosci = useCounting(naleznosci);
  //const yearZaplaconePrzychody = useCounting(przychodyOpłacone);
  const yearKosztySuma = useCounting(koszty);
  //console.log("yearkoszty suma", yearKosztySuma);
  //const yearKosztySumaOplacone = useCounting(kosztyOplacone);
  const yearPrzychodySuma = useCounting(przychody);
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

      <p>
        {formatNumber(
          totalAssets +
            totalCash +
            yearNiezaplaconePrzychody +
            (yearPrzychodySuma - yearKosztySuma)
        )}{" "}
        zł
      </p>
      <p>
        w tym nalezności krótkoterminowe:{<p>{yearNiezaplaconePrzychody} zł</p>}{" "}
      </p>
      <p>w tym środki pieniężne:{totalCash} zł </p>

      {/* <p>Naleznosci: {yearNaleznosci}</p> */}
      <br></br>
      <h2>PASYWA </h2>
      <p>
        Fundusz statutowy:{" "}
        {formatNumber(
          yearPrzychodySuma - yearKosztySuma + totalAssets + totalCash
        )}{" "}
        zł
      </p>
      <p>
        Zobowiazania:{formatNumber(yearNiezaplaconeKoszty + yearPozyczki)} zł
      </p>

      <h2>Suma Bilansowa</h2>
      {/* <p>Aktywa {totalAssets + totalCash + yearPrzychody + yearPozyczki} zł</p> */}
      <p>
        Aktywa{" "}
        {formatNumber(
          totalAssets +
            totalCash +
            yearNiezaplaconePrzychody +
            (yearPrzychodySuma - yearKosztySuma)
        )}{" "}
        zł
      </p>
      <p>
        Pasywa{" "}
        {formatNumber(
          totalAssets +
            totalCash +
            yearNiezaplaconePrzychody +
            (yearPrzychodySuma - yearKosztySuma)
        )}{" "}
        zł
      </p>
    </div>
  );
};

export default BalanceAP;
