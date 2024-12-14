import React from "react";
import useDataBaseQuery from "../../hooks/useDatabaseQuery";
import useCounting from "../../hooks/useCounting";

export interface IProfitLossAccount {}

const ProfitLossAccount: React.FunctionComponent<IProfitLossAccount> = () => {
  const yearExpense = useDataBaseQuery("expenses");
  const yearIncome = useDataBaseQuery("incomes");
  //console.log("yearExpenses",yearExpense)

  const yearExpenses = useCounting(yearExpense);
  const yearIncomes = useCounting(yearIncome);
  const yearResult = yearIncomes - yearExpenses;

  //ANALIZA PRZYCHODOW
  const dotacje = useDataBaseQuery("incomes", "source", "dotacje");
  const skladki = useDataBaseQuery("incomes", "source", "skladki");
  const darowizny = useDataBaseQuery("incomes", "source", "darowizmy");
  const inne = useDataBaseQuery("incomes", "source", "inne");

  const uslugi = useDataBaseQuery("expenses", "category", "service");
  const administracja = useDataBaseQuery(
    "expenses",
    "category",
    "administration"
  );

  const yearDotacje = useCounting(dotacje);
  const yearSkladki = useCounting(skladki);
  const yearDarowizny = useCounting(darowizny);
  const yearInne = useCounting(inne);
  const yearUslugi = useCounting(uslugi);
  const yearAdministration = useCounting(administracja);

  const formatNumber = (value: number) => parseFloat(value.toFixed(0));

  //return(<div style={{fontSize: 20}}>
  return (
    <div>
      <h1>Informacja dodatkowa do bilansu</h1>
      <br></br>
      <br></br>
      {/* Wynik: {yearResult} zł */}
      Wynik: {formatNumber(yearResult)} zł
      <br></br>
      <br></br>Z czego
      <h3>A. Przychody z działalności statutowej</h3>
      <br></br>
      <p>Z dotacji: {formatNumber(yearDotacje)} zł</p>
      <p>Ze składek: {formatNumber(yearSkladki)} zł</p>
      <p>Z darowizn: {formatNumber(yearDarowizny)} zł</p>
      <p>Inne: {yearInne} zł</p>
      <br></br>
      <h3>B. Koszty działalności statutowej</h3>
      <p>Wszystkie koszty: {formatNumber(yearExpenses)} zł</p>z czego:
      <p> koszty zadań: {formatNumber(yearUslugi)} zł</p>
      <p>koszty administracyjne {formatNumber(yearAdministration)} zł</p>
      <br></br>
      <h3>C. Zysk (strata) z działalności statutowej (A-B)</h3>
      {yearIncomes - yearExpenses >= 0
        ? `zysk ${formatNumber(yearIncomes - yearExpenses)} zł`
        : `strata ${formatNumber(yearIncomes - yearExpenses)} zł`}
      {/* <h3>C. Zysk (strata) z działalności statutowej (A-B)</h3>
      {yearIncomes - yearExpenses >= 0
        ? `zysk ${yearIncomes - yearExpenses} zł`
        : `strata ${yearIncomes - yearExpenses} zł`} */}
      <br></br>
    </div>
  );
};

export default ProfitLossAccount;
