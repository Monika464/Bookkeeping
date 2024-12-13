//EXPENSES
// //EXPENCES

import React, { useState } from "react";
import { getDate, getMonth, getYear } from "date-fns";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { collection, doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../App";
import { Value } from "../components/Calendar";
import useGetContractors from "../hooks/useGetContractors";

interface FormField {
  id: number;
  invoiceNum: string;
  invoiceDate: Value;
  sellerName: string;
  paymentForm: string;
  amount: string;
  invoiceName: string;
  description: string;
  //   category: string;
  source: string;
  paid: boolean;
}

interface IForm3 {
  thisDay: Value;
}

//type ValuePiece = Date | null | string;

const DynamicForm3: React.FC<IForm3> = (props) => {
  const [formFields, setFormFields] = useState<FormField[]>([]);
  const [nextId, setNextId] = useState<number>(1);
  const [showAddButton, setShowAddButton] = useState<boolean>(true);
  const { currentUser } = useContext(UserContext);
  const contractors = useGetContractors();

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
  //const formattedDate = day + monthName;
  //console.log("formattedDate",formattedDate)
  //console.log("hej", format(props.thisDay, 'do LLLL yyyy', {locale: pl}))

  //const thisDayData = new Date(thisDay?.getTime())
  //console.log("thisDaytype",typeof(thisDayData))
  //const formattedDate: string = format(thisDay, 'dMMMM'); // 'd' - oznacza dzień, 'MMMM' - oznacza nazwę miesiąca

  //console.log(formattedDate); // Wyświetli np. "19March"

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
        //   category: 'service'
        source: "skladki",
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

    //dopisz czyszczenie formularza

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

  //formFields.map((el)=>{console.log("el",el)})
  //tu bedzie funcja wysylajaca do bazy

  const sendToBase = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    // Sprawdź, czy wszystkie pola "kwota w zł" są wypełnione
    const isAmountFilled = formFields.every(
      (field) => field.amount.trim() !== ""
    );

    // Jeśli nie wszystkie pola "kwota w zł" są wypełnione, zatrzymaj wysyłanie formularza
    if (!isAmountFilled) {
      alert("Proszę wypełnić pole 'kwota w zł'!");
      return;
    }
    //const uid = currentUser?.uid;
    //console.log("currentUser?.uid",currentUser?.uid)
    //const uid = "user1id";
    const userId = currentUser?.uid;
    const collectionRef = collection(db, `${userId}`);

    // Tworzymy tablicę do przechowywania danych z wszystkich pól formularza
    const formData = formFields.map((field) => ({
      userId: userId,
      id: field.id,
      invoiceNum: field.invoiceNum,
      amount: field.amount,
      invoiceName: field.invoiceName,
      source: field.source,
      description: field.description,
      paymentForm: field.paymentForm,
      sellerName: field.sellerName,
      year: year,
      month: monthName,
      day: day,
      type: "incomes",
      paid: field.paid,
      timestamp: serverTimestamp(),
    }));

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
          Dodaj pozycję
        </button>
      )}
      <div>
        {formFields.map((field) => (
          <div key={field.id}>
            {/* {field.id}. */}
            <input
              type="text"
              placeholder="Nr faktury"
              value={field.invoiceNum}
              onChange={(e) =>
                handleInputChange(field.id, "invoiceNum", e.target.value)
              }
            />
            <input
              type="text"
              placeholder="kwota w zł"
              value={field.amount}
              onChange={(e) =>
                handleInputChange(field.id, "amount", e.target.value)
              }
            />
            <input
              type="text"
              placeholder="nazwa"
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
              <option value="">Kontrahent</option>
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
              <option value="przelew">Przelew</option>
              <option value="gotowka">Gotówka</option>
            </select>
            {/* <select
            value={field.category}
            onChange={(e) => handleInputChange(field.id, 'category', e.target.value)}
          >
            <option value="service">Usługi</option>
            <option value="administration">Administracja</option>
          </select> */}
            <select
              value={field.source}
              onChange={(e) =>
                handleInputChange(field.id, "source", e.target.value)
              }
            >
              <option value="skladki">skladki</option>
              <option value="dotacje">dotacje</option>
              <option value="darowizny">darowizny</option>
              <option value="inne">inne</option>
            </select>

            <input
              type="text"
              placeholder="opis"
              value={field.description}
              onChange={(e) =>
                handleInputChange(field.id, "description", e.target.value)
              }
            />
            <select
              value={field.paid.toString()} // Konwertuj wartość boolean na string
              onChange={(e) => {
                handleBooleanChange(field.id, "paid", e.target.value);
                // Konwertuj wartość z powrotem na boolean
                // const value = e.target.value === "true" ? true : false;
                // handleInputChange(field.id, 'paid', `${value}`);
              }}
            >
              <option value="true">opłacone</option>
              <option value="false">nieopłacone</option>
            </select>
            {/* <select
            value={field.paid}
            onChange={(e) => handleInputChange(field.id, 'paid', e.target.value)}
          >
            <option value="true">opłacone</option>
            <option value="false">nieopłacone</option>
          </select> */}
            <br></br>
            <button onClick={sendToBase} className="btn">
              zapisz przychód
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DynamicForm3;
