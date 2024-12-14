export interface IYearDisplay {}
import { useCallback, useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../App";
import { YearSelector, useYear } from "../../context/YearContextType";
import { useLanguage } from "../../context/LanguageContext.tsx";
import translations from "./yeardisplay-translations.tsx";

export interface Invoice {
  [key: string]: string | number | boolean;
  amount: string;
  category: string;
  day: number;
  description: string;
  id: number;
  invoiceName: string;
  invoiceNum: string;
  itid: string;
  month: string;
  paid: boolean;
  paymentForm: string;
  sellerName: string;
}
const YearDisplay: React.FunctionComponent<IYearDisplay> = () => {
  const [dataFromBaseExp, setDataFromBaseExp] = useState<Invoice[]>([]);
  const [dataFromBaseInc, setDataFromBaseInc] = useState<Invoice[]>([]);
  const [yearExpenses, setYearExpenses] = useState(0);
  const [yearIncomes, setYearIncomes] = useState(0);
  const { currentUser } = useContext(UserContext);

  const { currentLanguage } = useLanguage();
  const t = translations[currentLanguage as "en" | "pl"];

  const userId = currentUser?.uid;
  const { editedYear } = useYear();
  const editedYearNum = parseInt(editedYear);

  useEffect(() => {
    readingFromBase();
  }, [currentUser, editedYear]);

  //console.log("editedYear",editedYearNum)
  const readingFromBase = useCallback(async () => {
    try {
      const colRef = collection(db, `${userId}`);

      if (editedYear) {
        const q1 = query(
          colRef,
          where("year", "==", editedYearNum),
          where("type", "==", "expenses")
        );
        let newDataExp: any = {};

        const querySnapshot1 = await getDocs(q1);
        querySnapshot1.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          // console.log("nasz rok",doc.id, " => ", doc.data());
          newDataExp[doc.id] = { ...doc.data(), itid: doc.id };
        });
        setDataFromBaseExp(newDataExp);

        const q2 = query(
          colRef,
          where("year", "==", editedYearNum),
          where("type", "==", "incomes")
        );
        let newDataInc: any = {};

        const querySnapshot2 = await getDocs(q2);
        querySnapshot2.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          //console.log("nasz rok",doc.id, " => ", doc.data());
          newDataInc[doc.id] = { ...doc.data(), itid: doc.id };
        });
        setDataFromBaseInc(newDataInc);
      }
    } catch (error) {
      console.log(error);
    }
  }, [
    setDataFromBaseExp,
    dataFromBaseInc,
    dataFromBaseExp,
    setDataFromBaseInc,
    userId,
    editedYearNum,
  ]);

  const countingExpenses = () => {
    let totalExpenses = 0;
    Object.values(dataFromBaseExp).forEach((exp) => {
      // console.log("suma wydatków", exp.amount);
      totalExpenses += parseFloat(exp.amount);
      // setYearExpenses((prevState) => prevState + exp.amount);
    });
    setYearExpenses(totalExpenses);
  };

  const countingIncomes = () => {
    let totalIncomes = 0;
    Object.values(dataFromBaseInc).forEach((inc) => {
      // console.log("suma przychodow", inc.amount);
      totalIncomes += parseFloat(inc.amount);
      // setYearExpenses((prevState) => prevState + exp.amount);
    });
    setYearIncomes(totalIncomes);
  };

  useEffect(() => {
    countingExpenses();
    countingIncomes();
  }, [dataFromBaseExp, dataFromBaseInc]);

  return (
    <div>
      {t.statement}
      <YearSelector />
      <br></br>
      {t.edited}: {editedYear}
      <br></br>
      <br></br>
      <ol>
        <h4>{t.expenses}</h4>
        {Object.values(dataFromBaseExp).map((exp, index) => (
          <li key={index}>
            {` ${exp.invoiceNum}, 
 ${exp.amount} zł,
 ${exp.day}-${exp.month}, 
 ${exp.invoiceName}, 
 ${exp.sellerName}, 
 ${exp.paymentForm}, 
  ${exp.description},
  ${exp.category === "service" ? t.services : t.administration}
 ${exp.paid ? t.paid : t.notpaid}
 `}
          </li>
        ))}
      </ol>
      <br></br>
      <br></br>
      <ol>
        <h4>{t.incomes}</h4>
        {Object.values(dataFromBaseInc).map((inc, index) => (
          <li key={index}>
            {`  ${inc.invoiceNum}, 
  ${inc.amount} zł, 
  ${inc.day}-${inc.month}, 
  ${inc.invoiceName}, 
  ${inc.sellerName}, 
  ${inc.paymentForm}, 
  ${inc.description},
 ${inc.paid ? t.paid : t.notpaid}
 `}
          </li>
        ))}
      </ol>
      <br></br>
      <h3>{t.result}</h3>
      <br></br>
      {yearIncomes - yearExpenses > 0
        ? ` ${t.profit} ${yearIncomes - yearExpenses} zł`
        : ` ${t.loss} ${yearIncomes - yearExpenses} zł`}
    </div>
  );
};

export default YearDisplay;
