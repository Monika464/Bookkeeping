// //EXPENCES 

import React, { useEffect, useState } from 'react';
import { format, getDate, getMonth, getYear, parse } from 'date-fns';
import { useContext } from 'react'
import { UserContext } from '../context/UserContext';
import { collection, doc, getDoc, getDocs, query, setDoc, where } from 'firebase/firestore';
import { db } from '../App';
import { pl } from 'date-fns/locale';
import { Value } from '../components/Calendar';

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
}

interface IForm1 {
  thisDay: ValuePiece;
}

type ValuePiece = Date | null | string;

const DynamicForm: React.FC<IForm1> = (props) => {
  
  const [formFields, setFormFields] = useState<FormField[]>([]);
  const [nextId, setNextId] = useState<number>(1);
  const {currentUser} = useContext(UserContext);
  console.log("co mamy w formfields", formFields)
  //const docRef = doc(db, "cities", "SF");
  //const querySnapshot = await getDocs(collection(db, "cities", "SF", "landmarks"));
  //console.log("props", props.thisDay)

  const thisDay = props.thisDay;

  const year: number = getYear(thisDay);
  //console.log("year",year)
  const month: number = getMonth(thisDay);
 // console.log("month",month)
  const day: number = getDate(thisDay);
  //console.log("day",day)
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const monthName = monthNames[month];
  //const formattedDate = day + monthName;
  //console.log("formattedDate",formattedDate)
  //console.log("hej", format(props.thisDay, 'do LLLL yyyy', {locale: pl}))  


  //const thisDayData = new Date(thisDay?.getTime())
     //console.log("thisDaytype",typeof(thisDayData))
  //const formattedDate: string = format(thisDay, 'dMMMM'); // 'd' - oznacza dzień, 'MMMM' - oznacza nazwę miesiąca

//console.log(formattedDate); // Wyświetli np. "19March"
  
  
  const addFormField = () => {
    setFormFields([...formFields, 
      { id: nextId, 
        invoiceNum: '',
         invoiceDate: thisDay,
          sellerName: '', 
         paymentForm: 'przelew',
          amount: '',
          invoiceName: '',
          description: '', 
          category: 'service' 
        }]);
    setNextId(nextId + 1);
  };

  const handleInputChange = (id: number, inputName: string, value: string) => {
    // Sprawdzamy, czy wartość jest liczbą z dwoma miejscami po przecinku
    const regex = /^\d+(\.\d{0,2})?$/; // Wyrażenie regularne dopuszczające maksymalnie dwie cyfry po przecinku
    if (inputName === 'amount' && !regex.test(value)) {
      return; // Jeśli wartość nie spełnia wymagań, nie aktualizujemy stanu
    }

    //dopisz czyszczenie formularza

    const updatedFormFields = formFields.map((field) =>
     // field.id === id ? { ...field, [inputName]: value } : field
     field.id === id ? { ...field, [inputName]: value } : field
    );
    setFormFields(updatedFormFields);
  };





  formFields.map((el)=>{console.log("el",el)})
//tu bedzie funcja wysylajaca do bazy

const sendToBase = async (e)=>{

   e.preventDefault()
    //const uid = currentUser?.uid;
    console.log("currentUser?.uid",currentUser?.uid)
    const uid = "user1id";
    const userId = currentUser?.uid;
     const collectionRef = collection(db, `${userId}`);

  // Tworzymy tablicę do przechowywania danych z wszystkich pól formularza
  const formData = formFields.map(field => ({
   
   userId: userId,
   id:field.id,
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
  type: "expenses"



  // invoiceNum: formFields[0].invoiceNum,
  // invoiceDate: thisDay,
  // sellerName: formFields[0].sellerName,
  // paymentForm: formFields[0].paymentForm,
  // amount: formFields[0].amount,
  // invoiceName: formFields[0].invoiceName,
  // description: formFields[0].description,
  // category: formFields[0].category,
  // year: year,
  // month: monthName,
  // day: day,
  // type: "expenses"
  }));

  // Iterujemy przez tablicę danych i zapisujemy każdy obiekt do bazy danych
  formData.forEach(async (data) => {
    await setDoc(doc(collectionRef), data);
  });

  // await setDoc(doc(collectionRef), {
  // id: userId,
  // invoiceNum: formFields[0].invoiceNum,
  // invoiceDate: thisDay,
  // sellerName: formFields[0].sellerName,
  // paymentForm: formFields[0].paymentForm,
  // amount: formFields[0].amount,
  // invoiceName: formFields[0].invoiceName,
  // description: formFields[0].description,
  // category: formFields[0].category,
  // year: year,
  // month: monthName,
  // day: day,
  // type: "expenses"
  //   });
 
  }

// useEffect(()=>{
//   setFormFields([]);
//   setNextId(1);
// },[sendToBase])



  return (
    <div>


      <button onClick={addFormField}>Dodaj pozycję</button>
      {formFields.map((field) => (
        <div key={field.id}>
          {field.id}.
          <input
            type="text" 
            placeholder="Nr faktury"
            value={field.invoiceNum}
            onChange={(e) => handleInputChange(field.id, 'invoiceNum', e.target.value)}
          />
          <input
            type="text" 
            placeholder="kwota w zł"
            value={field.amount}
            onChange={(e) => handleInputChange(field.id, 'amount', e.target.value)}
          />
            <input
            type="text" 
            placeholder="nazwa"
            value={field.invoiceName}
            onChange={(e) => handleInputChange(field.id, 'invoiceName', e.target.value)}
          />
          <select
            value={field.sellerName}
            onChange={(e) => handleInputChange(field.id, 'sellerName', e.target.value)}
          >
            <option value="">Kontrahent</option>
            <option value="Jozek">Jozek</option>
            <option value="Franek">Franek</option>
            <option value="Zoska">Zoska</option>
          </select>
          {/* <input
            type="text"
            placeholder="Nazwa sprzedawcy"
            value={field.sellerName}
            onChange={(e) => handleInputChange(field.id, 'sellerName', e.target.value)}
          /> */}
          <select
            value={field.paymentForm}
            onChange={(e) => handleInputChange(field.id, 'paymentForm', e.target.value)}
          >
            <option value="przelew">Przelew</option>
            <option value="gotowka">Gotówka</option>
          </select>
          <select
            value={field.category}
            onChange={(e) => handleInputChange(field.id, 'category', e.target.value)}
          >
            <option value="service">Usługi</option>
            <option value="administration">Administracja</option>
          </select>

          <input
            type="text" 
            placeholder="opis"
            value={field.description}
            onChange={(e) => handleInputChange(field.id, 'description', e.target.value)}
          />
        </div>
      ))}
      <button onClick={sendToBase}>nowy wyslij koszt</button>
    </div>
  );
};

export default DynamicForm;




