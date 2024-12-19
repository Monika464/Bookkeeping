import React from "react";
import useDataBaseQuery from "../../hooks/useDatabaseQuery";
import useCounting from "../../hooks/useCounting";
import { useLanguage } from "../../context/LanguageContext.tsx";
import translations from "./profilelossaccount-translations.ts";
export interface IProfitLossAccount {}

const ProfitLossAccount: React.FunctionComponent<IProfitLossAccount> = () => {
  const { currentLanguage } = useLanguage();
  const t = translations[currentLanguage as "en" | "pl"];

  const yearExpense = useDataBaseQuery("expenses");
  const yearIncome = useDataBaseQuery("incomes");
  //console.log("yearExpenses",yearExpense)

  const yearExpenses = useCounting(yearExpense);
  const yearIncomes = useCounting(yearIncome);
  const yearResult = yearIncomes - yearExpenses;

  //ANALIZA PRZYCHODOW
  const dotacje = useDataBaseQuery("incomes", "source", "dotacje");
  const skladki = useDataBaseQuery("incomes", "source", "skladki");
  const darowizny = useDataBaseQuery("incomes", "source", "darowizny");
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
      <h1>{t.additionalInfo}</h1>
      <br></br>
      <br></br>
      {/* Wynik: {yearResult} zł */}
      {t.result} {formatNumber(yearResult)} zł
      <br></br>
      <br></br>
      <h3>A. {t.revenues}</h3>
      <br></br>
      <p>
        {t.fromSubsidies}: {formatNumber(yearDotacje)} zł
      </p>
      <p>
        {t.fromContributions}: {formatNumber(yearSkladki)} zł
      </p>
      <p>
        {t.fromDonations}: {formatNumber(yearDarowizny)} zł
      </p>
      <p>
        {t.other}: {yearInne} zł
      </p>
      <br></br>
      <h3>B. {t.costsStatutory}</h3>
      <p>
        {t.allcosts}: {formatNumber(yearExpenses)} zł
      </p>
      {t.ofwhat}:
      <p>
        {t.taskCosts}: {formatNumber(yearUslugi)} zł
      </p>
      <p>
        {t.adminCosts} {formatNumber(yearAdministration)} zł
      </p>
      <br></br>
      <h3>C. {t.profitLoss} (A-B)</h3>
      {yearIncomes - yearExpenses >= 0
        ? `${t.profit} ${formatNumber(yearIncomes - yearExpenses)} zł`
        : `${t.loss} ${formatNumber(yearIncomes - yearExpenses)} zł`}
      {/* <h3>C. Zysk (strata) z działalności statutowej (A-B)</h3>
      {yearIncomes - yearExpenses >= 0
        ? `zysk ${yearIncomes - yearExpenses} zł`
        : `strata ${yearIncomes - yearExpenses} zł`} */}
      <br></br>
    </div>
  );
};

export default ProfitLossAccount;
