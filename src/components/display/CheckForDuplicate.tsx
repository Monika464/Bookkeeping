import React from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../App";
import { useCallback, useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { useLanguage } from "../../context/LanguageContext.tsx";
import translations from "./yeardisplay-translations.tsx";

export interface IDup {
  year: any;
  type: string;
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

const CheckForDuplicates: React.FunctionComponent<IDup> = () => {
  const { currentLanguage } = useLanguage();
  const t = translations[currentLanguage as "en" | "pl"];

  const [duplicates, setDuplicates] = useState<IDup[] | null>();
  const [dataFromBase, setDataFromBase] = useState({});
  const { currentUser } = useContext(UserContext);

  const userId = currentUser?.uid;

  useEffect(() => {
    readingFromBase();
    //console.log("data from base",dataFromBase )
  }, [currentUser]);

  const readingFromBase = useCallback(async () => {
    try {
      //let newData  ={};
      let newData: { [key: string]: {} } = {};
      const querySnapshot = await getDocs(collection(db, `${userId}`));

      querySnapshot.forEach((doc) => {
        const idHasCash = /cash/i.test(doc.id);
        const idHasAssets = /assets/i.test(doc.id);
        const idHasObligation = /obligation/i.test(doc.id);

        if (!idHasCash && !idHasAssets && !idHasObligation) {
          newData[doc.id] = { ...doc.data(), itid: doc.id };
        }
      });
      setDataFromBase(newData);
    } catch (error) {}
  }, [setDataFromBase, userId]);

  useEffect(() => {
    const duplicates: any = Object.values(dataFromBase).reduce(
      (tempDuplicates: any, element1: any, index1, array) => {
        const foundDuplicates = array.filter((element2: any, index2) => {
          return (
            element1.invoiceNum === element2.invoiceNum && index1 !== index2
          );
        });
        if (foundDuplicates.length > 0) {
          tempDuplicates.push(element1);
        }
        return tempDuplicates;
      },
      []
    );
    setDuplicates(duplicates);
  }, [dataFromBase]);

  return (
    <>
      <br></br>
      {duplicates && duplicates.length > 0 && (
        <>
          <div style={{ color: "red" }}>{t.double}</div>
          <ul>
            {Object.values(duplicates).map((dup, index) => (
              <li key={index} style={{ color: "red" }}>
                {dup.type === "incomes" ? t.incomes : t.expenses}
                <br />
                {`${t.date}   ${dup.day} ${dup.month} ${dup.year}`}
                {` ${t.number} ${dup.invoiceNum}, ${t.amount} ${dup.amount}, ${t.name} ${dup.invoiceName}, ${t.contractor} ${dup.sellerName}, ${t.payform} ${dup.paymentForm}, ${t.description} ${dup.description}`}
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
};

export default CheckForDuplicates;
