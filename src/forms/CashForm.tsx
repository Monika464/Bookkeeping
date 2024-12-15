import React from "react";
import { useCallback, useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import {
  collection,
  deleteField,
  doc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../App";
import { useYear } from "../context/YearContextType";
import { useLanguage } from "../context/LanguageContext.tsx";
import translations from "./cashform-translations.ts";

export interface ICashState {
  totalCash: number;
  cashInHand: number;
  cashInBank: number;
  id: string;
}

const CashForm: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const t = translations[currentLanguage as "en" | "pl"];

  const [cashState, setCashState] = useState<ICashState>({
    totalCash: 0,
    cashInHand: 0,
    cashInBank: 0,
    id: "",
  });

  const [cashInHandInput, setCashInHandInput] = useState<number | "">("");
  const [showCashInHandInput, setShowCashInHandInput] =
    useState<boolean>(false);
  const [dataFromBase, setDataFromBase] = useState({});
  const [isEmpty, setIsEmpty] = useState(false);

  const { editedYear } = useYear();
  //console.log("editedYear",editedYear)
  const { currentUser } = useContext(UserContext);
  const uid = currentUser?.uid;

  const handleTotalCashChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const totalCash = parseInt(event.target.value);
    setCashState({ ...cashState, totalCash });
  };

  const handleCashInHandChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const cashInHandInput = event.target.value;
    setCashInHandInput(cashInHandInput !== "" ? parseInt(cashInHandInput) : "");
    //setIsEmpty(false)
  };

  const handleOkClick = () => {
    setShowCashInHandInput(true);
  };

  const handleCalculateClick = () => {
    if (typeof cashInHandInput === "number") {
      const cashInBank = cashState.totalCash - cashInHandInput;
      setCashState({ ...cashState, cashInHand: cashInHandInput, cashInBank });
    }
  };

  // console.log("cashState,",cashState)

  const saveInBase = async () => {
    if (editedYear) {
      const itemRefI = doc(db, `${uid}`, `cash ${editedYear}`);
      await setDoc(itemRefI, {
        cashInHand: cashState.cashInHand,
        cashInBank: cashState.cashInBank,
        id: `cash ${editedYear}`,
      });
      //.then(()=>{isSendI(true)})
    }
  };

  const removeState = async () => {
    if (editedYear) {
      const itemRefI = doc(db, `${uid}`, `cash ${editedYear}`);
      await updateDoc(itemRefI, {
        cashInHand: deleteField(),
        cashInBank: deleteField(),
        id: deleteField(),
      });
    }
  };

  const readCash = useCallback(async () => {
    //  const itemRefI = doc(db, uid, `cash ${editedYear}`)
    const userCollectionRef = collection(db, `${uid}`);
    const q = query(userCollectionRef, where("id", "==", `cash ${editedYear}`));

    let newData: any = {};
    const querySnapshot1 = await getDocs(q);
    if (querySnapshot1.empty) {
      setIsEmpty(true);
    } else {
      querySnapshot1.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log("nasz rok",doc.id, " => ", doc.data());
        newData[doc.id] = { ...doc.data(), itid: doc.id };
      });
      // console.log("newData",newData)
      setDataFromBase(newData);
      setIsEmpty(false);
    }

    //  console.log("dataFromBaseCash",dataFromBase)
  }, [uid, editedYear]);

  useEffect(() => {
    readCash();
  }, [uid, readCash, editedYear]);
  return (
    <div>
      {/* <YearSelector/> */}

      {!isEmpty && (
        <div>
          <p>{t.cashassets}</p>
          <br></br>
          {Object.values(dataFromBase).map((element: any, index) => (
            <div key={index}>
              {t.incash} {element.cashInHand} {t.inbank} {element.cashInBank}
            </div>
          ))}

          <button onClick={removeState} className="btnsmall">
            {t.clear}
          </button>
        </div>
      )}

      {isEmpty && (
        <div>
          <label>
            {t.lastday}
            <input
              type="number"
              value={cashState.totalCash}
              onChange={handleTotalCashChange}
            />
          </label>
          <br />
          <button onClick={handleOkClick} className="btnsmall">
            OK
          </button>
          {/* <button onClick={removeState}>wyczysc stan kasy</button> */}

          {showCashInHandInput && (
            <div>
              <label>
                {t.howmuchCash}
                <input
                  type="number"
                  value={cashInHandInput}
                  onChange={handleCashInHandChange}
                />
              </label>
              <br />
              <button onClick={handleCalculateClick} className="btnsmall">
                {t.calculate}
              </button>
              <br />
              <div>
                {t.cash} {cashState.cashInHand}
                <br />
                {t.onAccount} {cashState.cashInBank}
              </div>
              <button onClick={saveInBase} className="btnsmall">
                {t.save}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CashForm;
