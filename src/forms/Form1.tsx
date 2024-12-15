// //EXPENCES

import React, { useState } from "react";
import { getDate, getMonth, getYear } from "date-fns";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { collection, doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../App";
import { Value } from "../components/Calendar";
import useGetContractors from "../hooks/useGetContractors";
import { useLanguage } from "../context/LanguageContext.tsx";
import translations from "./form1-translations.ts";

interface FormField {
  id: number;
  invoiceNum: string;
  invoiceDate: Value;
  sellerName: string;
  paymentForm: string;
  amount: string;
  invoiceName: string;
  description: string;
  category: string;
  paid: boolean;
}

interface IForm1 {
  thisDay: Value;
}

const DynamicForm: React.FC<IForm1> = (props) => {
  const { currentLanguage } = useLanguage();
  const t = translations[currentLanguage as "en" | "pl"];

  const [formFields, setFormFields] = useState<FormField[]>([]);
  const [nextId, setNextId] = useState<number>(1);
  const [showAddButton, setShowAddButton] = useState<boolean>(true);
  const { currentUser } = useContext(UserContext);
  const contractors = useGetContractors();
  //console.log("contractors",contractors)

  const thisDay = props.thisDay;

  const year: number = getYear(thisDay);
  //console.log("year",year)
  const month: number = getMonth(thisDay);
  // console.log("month",month)
  const day: number = getDate(thisDay);
  //console.log("day",day)
  //const monthNames = ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'];
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

  const addFormField = () => {
    setFormFields([
      ...formFields,
      {
        id: nextId,
        invoiceNum: "",
        invoiceDate: thisDay,
        sellerName: "",
        paymentForm: "przelew",
        amount: "",
        invoiceName: "",
        description: "",
        category: "service",
        paid: true,
      },
    ]);
    setNextId(nextId + 1);
    setShowAddButton(false);
  };

  const handleInputChange = (id: number, inputName: string, value: string) => {
    // Sprawdzamy, czy wartość jest liczbą z dwoma miejscami po przecinku
    const regex = /^\d+(\.\d{0,2})?$/; // Wyrażenie regularne dopuszczające maksymalnie dwie cyfry po przecinku
    if (inputName === "amount" && !regex.test(value)) {
      return; // Jeśli wartość nie spełnia wymagań, nie aktualizujemy stanu
    }

    const updatedFormFields = formFields.map((field) =>
      // field.id === id ? { ...field, [inputName]: value } : field
      field.id === id ? { ...field, [inputName]: value } : field
    );
    setFormFields(updatedFormFields);
  };

  const resetForm = () => {
    // Reset form fields to default state
    setFormFields([]);
    setNextId(1);
  };

  const sendToBase = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    // Sprawdź, czy wszystkie pola "kwota w zł" są wypełnione
    const isAmountFilled = formFields.every(
      (field) => field.amount.trim() !== ""
    );

    // Jeśli nie wszystkie pola "kwota w zł" są wypełnione, zatrzymaj wysyłanie formularza
    if (!isAmountFilled) {
      alert(t.pleaseFill);
      return;
    }

    const userId = currentUser?.uid;
    const collectionRef = collection(db, `${userId}`);

    // Tworzymy tablicę do przechowywania danych z wszystkich pól formularza
    const formData = formFields.map((field) => ({
      userId: userId,
      id: field.id,
      invoiceNum: field.invoiceNum,
      amount: field.amount,
      invoiceName: field.invoiceName,
      category: field.category,
      description: field.description,
      paymentForm: field.paymentForm,
      sellerName: field.sellerName,
      year: year,
      month: monthName,
      day: day,
      type: "expenses",
      paid: field.paid,
      timestamp: serverTimestamp(),
    }));
    //console.log("formData",formData)

    formData.forEach(async (data) => {
      await setDoc(doc(collectionRef), data);
    });

    resetForm();
    setShowAddButton(true);
  };

  const handleBooleanChange = (
    id: number,
    inputName: string,
    value: string
  ) => {
    console.log("bolean change running");
    const booleanValue = value === "true";
    console.log("boolean value", booleanValue);
    const updatedFormFields = formFields.map((field) =>
      field.id === id ? { ...field, [inputName]: booleanValue } : field
    );
    setFormFields(updatedFormFields);
  };

  return (
    <div className="invoiceForm">
      {showAddButton && (
        <button onClick={addFormField} className="btn">
          {t.addPosition}
        </button>
      )}
      <div>
        {formFields.map((field) => (
          <div key={field.id}>
            {/* {field.id}. */}
            <input
              type="text"
              placeholder={t.invoiceNum}
              value={field.invoiceNum}
              onChange={(e) =>
                handleInputChange(field.id, "invoiceNum", e.target.value)
              }
            />
            <input
              type="text"
              placeholder={t.amount}
              value={field.amount}
              onChange={(e) =>
                handleInputChange(field.id, "amount", e.target.value)
              }
            />
            <input
              type="text"
              placeholder={t.invoiceName}
              value={field.invoiceName}
              onChange={(e) =>
                handleInputChange(field.id, "invoiceName", e.target.value)
              }
            />
            <select
              value={field.sellerName}
              onChange={(e) =>
                handleInputChange(field.id, "sellerName", e.target.value)
              }
            >
              <option value="">{t.contractor}</option>
              {Object.values(contractors).map((contractor: any) => (
                <option
                  key={contractor.itid}
                  value={`${contractor.companyName} ${contractor.nip}`}
                >
                  {`${contractor.companyName} ${contractor.nip}`}
                </option>
              ))}
            </select>

            <select
              value={field.paymentForm}
              onChange={(e) =>
                handleInputChange(field.id, "paymentForm", e.target.value)
              }
            >
              <option value="przelew">{t.transfer}</option>
              <option value="gotowka">{t.cash}</option>
            </select>
            <select
              value={field.category}
              onChange={(e) =>
                handleInputChange(field.id, "category", e.target.value)
              }
            >
              <option value="service">{t.services}</option>
              <option value="administration">{t.administrations}</option>
            </select>

            <input
              type="text"
              placeholder={t.description}
              value={field.description}
              onChange={(e) =>
                handleInputChange(field.id, "description", e.target.value)
              }
            />
            <select
              value={field.paid.toString()} // Konwertuj wartość boolean na string
              onChange={(e) => {
                handleBooleanChange(field.id, "paid", e.target.value);
              }}
            >
              <option value="true">{t.paid}</option>
              <option value="false">{t.notpaid}</option>
            </select>
            <br></br>
            <button onClick={sendToBase} className="btn">
              {t.save}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DynamicForm;
