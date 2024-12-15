import {
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { UserContext } from "../context/UserContext";
import { useYear } from "../context/YearContextType";
import { db } from "../App";
import { useLanguage } from "../context/LanguageContext.tsx";
import translations from "./incomeloan-translation.ts";

export interface IIncomeLoan {}

const IncomeLoan: React.FC<IIncomeLoan> = () => {
  const [dataFromBaseInc, setDataFromBaseInc] = useState({});
  //const [isEmptyInc, setIsEmptyInc] = useState(false);
  const [dataFromBaseIncLoan, setDataFromBaseIncLoan] = useState({});
  //const [isEmptyIncLong, setIsEmptyIncLoan] = useState(false);
  const [selectedOptionI, setSelectedOptionI] = useState<string>("");
  const [sendI, isSendI] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedInvoices, setSelectedInvoices] = useState<String[]>([]);

  const { currentLanguage } = useLanguage();
  const t = translations[currentLanguage as "en" | "pl"];

  const { currentUser } = useContext(UserContext);
  const uid = currentUser?.uid;
  const { editedYear } = useYear();
  const editedYearNum = parseInt(editedYear);

  const readIncomes = useCallback(async () => {
    //  const itemRefI = doc(db, uid, `cash ${editedYear}`)
    const userCollectionRef = collection(db, `${uid}`);
    const q = query(
      userCollectionRef,
      where("year", "==", editedYearNum),
      where("type", "==", "incomes")
      //   where("longTerm", "==", true)
    );

    let newData: any = {};
    const querySnapshot1 = await getDocs(q);
    if (querySnapshot1.empty) {
      // setIsEmptyInc(true)
    } else {
      querySnapshot1.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log("nasz rok",doc.id, " => ", doc.data());
        newData[doc.id] = { ...doc.data(), itid: doc.id };
      });
      setDataFromBaseInc(newData);
      // setIsEmptyInc(false)
    }

    // console.log("dataFromBaseIncLong",dataFromBaseIncLong)
  }, [uid, editedYear]);

  const readIncomesLoan = useCallback(async () => {
    setDataFromBaseIncLoan({});
    //  const itemRefI = doc(db, uid, `cash ${editedYear}`)
    const userCollectionRef = collection(db, `${uid}`);
    const q = query(
      userCollectionRef,
      where("year", "==", editedYearNum),
      where("type", "==", "incomes"),
      where("loan", "==", true)
    );

    let newData: any = {};
    const querySnapshot1 = await getDocs(q);
    if (querySnapshot1.empty) {
      // setIsEmptyIncLoan(true)
    } else {
      querySnapshot1.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        //console.log("nasz rok",doc.id, " => ", doc.data());
        newData[doc.id] = { ...doc.data(), itid: doc.id };
      });
      //console.log("new data", newData)
      setDataFromBaseIncLoan(newData);
      // console.log("dataFromBaseIncLong",dataFromBaseIncLoan)
      // setIsEmptyIncLoan(false)
    }

    //console.log("dataFromBaseIncLoan",dataFromBaseIncLoan)
  }, [uid, editedYear]);

  useEffect(() => {
    //console.log("dataFromBaseIncLoan", dataFromBaseIncLoan);
  }, [dataFromBaseIncLoan]);

  useEffect(() => {
    readIncomes();
    readIncomesLoan();
  }, [uid, editedYear, readIncomes, readIncomesLoan]);

  const handleSelectChangeI = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setSelectedOptionI(event.target.value); // Ustawienie nowej wybranej wartości
    isSendI(false);
  };

  const updateInvest = async () => {
    const itemRefI = doc(db, `${uid}`, selectedOptionI);
    if (selectedOptionI) {
      await updateDoc(itemRefI, {
        loan: true,
      }).then(() => {
        isSendI(true);
      });
    }
  };

  // Funkcja do obsługi zaznaczania i odznaczania checkboxów
  const handleCheckboxChange = (e: {
    target: { value: any; checked: any };
  }) => {
    const value = e.target.value;
    //console.log("value",value)
    if (e.target.checked) {
      setSelectedInvoices([...selectedInvoices, value]);
      //console.log("selectedInvoices",selectedInvoices)
    } else {
      setSelectedInvoices(
        selectedInvoices.filter((invoice) => invoice !== value)
      );
    }
  };

  // Funkcja do zmiany nazwy przycisku
  const getButtonLabel = () => {
    return isEditMode ? t.finishedit : t.edit;
  };

  //delete updatujac w bazie czyli usywajac zawartosc loan
  const handleDeleteClick = async () => {
    // const usersCollectionRef = collection(db, `${userId}`);
    selectedInvoices.map(async (item) => {
      const docRef = doc(db, `${uid}`, `${item}`);
      await updateDoc(docRef, {
        loan: false,
      });
    });
  };
  return (
    <div>
      {t.mark}
      <br></br>
      <select value={selectedOptionI} onChange={handleSelectChangeI}>
        <option value="" disabled>
          {t.chooseOption}
        </option>
        {dataFromBaseInc &&
          Object.values(dataFromBaseInc).map((el: any) => (
            <option key={el.itid} value={el.itid}>
              {`${el.invoiceNum},${el.amount},${el.day}-${el.month},${el.invoiceName}, ${el.sellerName}`}
            </option>
          ))}
      </select>
      {/* <select value={selectedOptionI} onChange={handleSelectChangeI}>
  
  {dataFromBaseInc && Object.values(dataFromBaseInc).map((el, index) => (
    <option key={el.itid} value={el.itid}>
      {`${el.invoiceNum},${el.amount},${el.day}-${el.month},${el.invoiceName}, ${el.sellerName}`}
    </option>
  ))}

</select> */}
      <button onClick={updateInvest} className="btnsmall">
        {t.choose}
      </button>
      {sendI && <p>{t.invoiceRecorded}</p>}
      {/* <ShowData dataToShow={dataFromBaseIncLoan}/>  */}
      {Object.values(dataFromBaseIncLoan).map((invoice: any, index) => (
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
                {` ${t.number} ${invoice.invoiceNum}, ${t.amount} ${invoice.amount},${invoice.day}-${invoice.month}, ${t.name} ${invoice.invoiceName}, ${t.contractor} ${invoice.sellerName}, ${t.form} ${invoice.paymentForm}, ${t.description} ${invoice.description}`}
              </label>
            </>
          )}
          {!isEditMode && (
            <>{` ${t.number} ${invoice.invoiceNum}, ${t.amount} ${invoice.amount}, ${invoice.day}-${invoice.month},${t.name} ${invoice.invoiceName}, ${t.contractor}  ${invoice.sellerName}, ${t.form} ${invoice.paymentForm}, ${t.description} ${invoice.description}`}</>
          )}
        </div>
      ))}
      {isEditMode && (
        <button onClick={handleDeleteClick} className="btnsmall">
          {t.deleteChosen}
        </button>
      )}
      <button onClick={() => setIsEditMode(!isEditMode)} className="btnsmall">
        {getButtonLabel()}
      </button>
    </div>
  );
};

export default IncomeLoan;
