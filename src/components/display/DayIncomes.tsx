import React from "react";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../App";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { Value } from "../Calendar";
import { getDate, getMonth, getYear } from "date-fns";
import { useLanguage } from "../../context/LanguageContext.tsx";
import translations from "./dayexpenses-translation.ts";
import "../../index.css";

export interface IDayIncomes {
  thisDay: Value;
}

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
  paid: boolean; // Poprawka: zmiana typu na boolean
  paymentForm: string;
  sellerName: string;
}

//props z calendara to bedzie data this date

const DayIncomes: React.FunctionComponent<IDayIncomes> = (props) => {
  const { currentLanguage } = useLanguage();
  const t = translations[currentLanguage as "en" | "pl"];
  // const [selectedInvoices, setSelectedInvoices] = useState([]);
  const [selectedInvoices, setSelectedInvoices] = useState<Invoice[]>([]);
  //const [content,setContent] = useState({})
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isEditModePaid, setIsEditModePaid] = useState(false);

  //invoices powinin sie zmieniac

  const thisDay = props.thisDay;
  const { currentUser } = useContext(UserContext);
  const day: number = getDate(thisDay);
  const month: number = getMonth(thisDay);
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const monthName = monthNames[month];
  //const uid = "user1id";
  const userId = currentUser?.uid;
  const year: number = getYear(thisDay);
  //console.log("currentUser",currentUser)

  const readingFromBase = async () => {
    try {
      const usersCollectionRef = collection(db, `${userId}`);
      const q = query(
        usersCollectionRef,
        where("year", "==", year),
        where("month", "==", monthName),
        where("type", "==", "incomes"),
        where("day", "==", day)
      );
      let newData: any = {};
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // console.log(doc.id, " march=> ", doc.data());

        // newData[doc.id] =  doc.data();
        newData[doc.id] = { ...doc.data(), itid: doc.id };
        //newData ={...doc.data(),itid: doc.id}
      });
      setInvoices(newData);
    } catch (error) {
      console.error(t.errorReadingDatabase, error);
    }
  };

  //console.log('incomes',invoices)

  useEffect(() => {
    readingFromBase();
  }, [props]);

  // Funkcja do obsługi zaznaczania i odznaczania checkboxów
  const handleCheckboxChange = (e: {
    target: { value: any; checked: any };
  }) => {
    const value = e.target.value;
    if (e.target.checked) {
      setSelectedInvoices([...selectedInvoices, value]);
    } else {
      setSelectedInvoices(
        selectedInvoices.filter((invoice) => invoice !== value)
      );
    }
  };

  // Funkcja obsługująca kliknięcie przycisku "Delete"
  const handleDeleteClick = async () => {
    // const usersCollectionRef = collection(db, `${userId}`);
    selectedInvoices.map((item) => {
      // console.log("iterms to delete", item)
      deleteDoc(doc(db, `${userId}`, `${item}`));
    });
  };

  // Funkcja do zmiany nazwy przycisku
  const getButtonLabel = () => {
    return isEditMode ? t.finishEditForDelete : t.editForDelete;
  };
  //console.log("content",content)

  // Funkcja obsługująca kliknięcie przycisku "Zaplac"
  const handlePayClick = async () => {
    // const usersCollectionRef = collection(db, `${userId}`);
    selectedInvoices.map((item) => {
      const itemRefI = doc(db, `${userId}`, `${item}`);
      if (item) {
        updateDoc(itemRefI, {
          paid: true,
        });
        //.then(()=>{isSendI(true)})
      }
    });
  };

  // Funkcja do zmiany nazwy przycisku
  const getButtonLabelPaid = () => {
    return isEditModePaid ? t.finishEditForPay : t.editForPay;
  };

  const isInvoicesEmpty = Object.keys(invoices).length === 0;

  return (
    <div>
      <div>
        {Object.values(invoices).map((invoice, index) => (
          <div key={index}>
            {isEditMode && (
              <>
                <input
                  type="checkbox"
                  id={`invoice-checkbox-${index}`}
                  value={invoice.itid}
                  onChange={handleCheckboxChange}
                />
                <label htmlFor={`invoice-checkbox-${index}`}>
                  {` ${invoice.invoiceNum}, 
           ${invoice.amount} zł, 
           ${invoice.invoiceName}, 
           ${invoice.sellerName}, 
           ${invoice.paymentForm}, 
           ${invoice.description},
          ${invoice.paid ? t.paid : t.notpaid}
          `}
                </label>
              </>
            )}
            {isEditModePaid && !invoice.paid && (
              <>
                <input
                  type="checkbox"
                  id={`invoice-checkbox-${index}`}
                  value={invoice.itid}
                  onChange={handleCheckboxChange}
                />
                <label htmlFor={`invoice-checkbox-${index}`}>
                  {` ${invoice.invoiceNum}, 
            ${invoice.amount} zł, 
             ${invoice.invoiceName}, 
             ${invoice.sellerName}, 
             ${invoice.paymentForm}, 
             ${invoice.description},
             ${invoice.paid ? t.paid : t.notpaid}
            `}
                </label>
              </>
            )}

            {!isEditMode && !isEditModePaid && (
              <div>
                {` ${invoice.invoiceNum}, 
          ${invoice.amount} zł, 
           ${invoice.invoiceName}, 
           ${invoice.sellerName}, 
           ${invoice.paymentForm}, 
          ${invoice.description},
          ${invoice.paid ? t.payInvoice : t.notpaid}
          `}
              </div>
            )}
          </div>
        ))}
        {/* <button onClick={handleDeleteClick}>Delete</button> */}
        {isEditMode && (
          <button onClick={handleDeleteClick} className="btn">
            {t.deleteInvoices}
          </button>
        )}
        {/* <button onClick={() => setIsEditMode(!isEditMode)}>edytuj</button> */}
        {!isEditModePaid && !isInvoicesEmpty && (
          <button
            onClick={() => setIsEditMode(!isEditMode)}
            className="btnsmall"
          >
            {getButtonLabel()}
          </button>
        )}

        {isEditModePaid && (
          <button onClick={handlePayClick} className="btn">
            {t.payInvoice}
          </button>
        )}

        {!isEditMode && !isInvoicesEmpty && (
          <button
            onClick={() => setIsEditModePaid(!isEditModePaid)}
            className="btnsmall"
          >
            {getButtonLabelPaid()}
          </button>
        )}
      </div>
    </div>
  );
};

export default DayIncomes;
