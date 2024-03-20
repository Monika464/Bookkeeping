// //EXPENCES 

import React, { useState } from 'react';
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
  //console.log("co mamy w formfields", formFields)
  //const docRef = doc(db, "cities", "SF");
  //const querySnapshot = await getDocs(collection(db, "cities", "SF", "landmarks"));
  console.log("props", props.thisDay)

  const thisDay = props.thisDay;
     //console.log("thisDay",new Date(thisDay?.getTime()))
    // const thisDayData = new Date(thisDay?.getTime())
     //console.log("thisDay",thisDayData)
   //  const formattedDate: string = format(new Date(thisDay?.getTime()), 'MMMM');
    // console.log("formattedDate",formattedDate)

  //console.log(format(new Date(com.created_at?.toMillis()), 'yyyy-MM-dd HH:mm'))
  console.log("thisDay",typeof(thisDay))
  const year: number = getYear(thisDay);
  //console.log("year",year)
  const month: number = getMonth(thisDay);
 // console.log("month",month)
  const day: number = getDate(thisDay);
  //console.log("day",day)
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const monthName = monthNames[month];
  const formattedDate = day + monthName;
  console.log("formattedDate",formattedDate)
  //console.log("hej", format(props.thisDay, 'do LLLL yyyy', {locale: pl}))  


  //const thisDayData = new Date(thisDay?.getTime())
     //console.log("thisDaytype",typeof(thisDayData))
  //const formattedDate: string = format(thisDay, 'dMMMM'); // 'd' - oznacza dzień, 'MMMM' - oznacza nazwę miesiąca

//console.log(formattedDate); // Wyświetli np. "19March"
  
  
  const addFormField = () => {
    setFormFields([...formFields, { id: nextId, invoiceNum: '', invoiceDate: thisDay, sellerName: '', 
                paymentForm: 'Przelew', amount: '',invoiceName: '',description: '', category: 'service' }]);
    setNextId(nextId + 1);
  };

  const handleInputChange = (id: number, inputName: string, value: string) => {
    // Sprawdzamy, czy wartość jest liczbą z dwoma miejscami po przecinku
    const regex = /^\d+(\.\d{0,2})?$/; // Wyrażenie regularne dopuszczające maksymalnie dwie cyfry po przecinku
    if (inputName === 'amount' && !regex.test(value)) {
      return; // Jeśli wartość nie spełnia wymagań, nie aktualizujemy stanu
    }

    const updatedFormFields = formFields.map((field) =>
     // field.id === id ? { ...field, [inputName]: value } : field
     field.id === id ? { ...field, [inputName]: value } : field
    );
    setFormFields(updatedFormFields);
  };


  console.log('formFields',formFields[0])
//tu bedzie funcja wysylajaca do bazy

const sendToBase = async ()=>{
  //const uid = currentUser?.uid;
  console.log("currentUser?.uid",currentUser?.uid)
  const uid = "user1id";
  const userId = currentUser?.uid;

  const collectionRef = collection(db, `${userId}`);

await setDoc(doc(collectionRef), {
  id: userId,
  invoiceNum: formFields[0].invoiceNum,
  invoiceDate: thisDay,
  sellerName: formFields[0].sellerName,
  paymentForm: formFields[0].paymentForm,
  amount: formFields[0].amount,
  invoiceName: formFields[0].invoiceName,
  description: formFields[0].invoiceName,
  category: formFields[0].category,
  year: year,
  month: monthName,
  day: day,
  type: "expenses"
    });
 
  }





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
            placeholder="kwota"
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
            <option value="Przelew">Przelew</option>
            <option value="Gotówka">Gotówka</option>
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






// import React, { useState } from 'react';
// import { format } from 'date-fns';

// interface FormField {
//   id: number;
//   invoiceNum: string;
//   invoiceDate: string;
//   sellerName: string;
//   paymentForm: string;
//   amount: number
// }

// interface IForm1 {
//   thisDay: ValuePiece;
// }

// type ValuePiece = Date | null;

// const DynamicForm: React.FC<IForm1> = (props) => {
//   const [formFields, setFormFields] = useState<FormField[]>([]);
//   const [nextId, setNextId] = useState<number>(1);

//   console.log("co mamy w formfields", formFields)

//   const addFormField = () => {
//     setFormFields([...formFields, { id: nextId, invoiceNum: '', invoiceDate: '', sellerName: '', paymentForm: 'Przelew', amount: 0 }]);
//     setNextId(nextId + 1);
//   };

//   const handleInputChange = (id: number, inputName: string, value: string) => {
//     const updatedFormFields = formFields.map((field) =>
//       field.id === id ? { ...field, [inputName]: value } : field
//     );
//     setFormFields(updatedFormFields);
//   };

//   //console.log("props", props.thisDay)
//   //tu zapiszemy do 

//   return (
//     <div>
//       <button onClick={addFormField}>Dodaj pozycję</button>
//       {formFields.map((field) => (
//         <div key={field.id}>
//           {field.id}.
//           {/* {`${format(props.thisDay, 'dd-MM')}`} */}
//           <input
//             type="text"
//             placeholder="Nr faktury"
//             value={field.invoiceNum}
//             onChange={(e) => handleInputChange(field.id, 'invoiceNum', e.target.value)}
//           />
//           <input
//   type="number"
//   placeholder="kwota"
//   value={field.amount}
//   onChange={(e) => handleInputChange(field.id, 'amount', e.target.value)}
//   onKeyDown={(e) => {
//     // Pozwól na naciśnięcie klawiszy numerycznych oraz klawiszy służących do nawigacji (np. strzałki, klawisz Backspace)
//     if (
//       !(
//         (e.key >= '0' && e.key <= '9') ||
//         e.key === 'ArrowLeft' ||
//         e.key === 'ArrowRight' ||
//         e.key === 'Backspace' ||
//         e.key === 'Delete' ||
//         e.key === 'Tab' ||
//         e.key === ',' || // akceptuj przecinek dla obsługi wartości dziesiętnych (opcjonalnie)
//         e.key === '.'
//       )
//     ) {
//       e.preventDefault();
//     }
//   }}
// />
//             {/* <input
//             type="number"
//             placeholder="kwota"
//             value={field.amount}
//             onChange={(e) => handleInputChange(field.id, 'amount', e.target.value)}
//           /> */}
//           {/* <input
//             type="text"
//             placeholder="Data faktury"
//             value={field.invoiceDate}
//             onChange={(e) => handleInputChange(field.id, 'invoiceDate', e.target.value)}
//           /> */}
//           <input
//             type="text"
//             placeholder="Nazwa sprzedawcy"
//             value={field.sellerName}
//             onChange={(e) => handleInputChange(field.id, 'sellerName', e.target.value)}
//           />
//           <select
//             value={field.paymentForm}
//             onChange={(e) => handleInputChange(field.id, 'paymentForm', e.target.value)}
//           >
//             <option value="Przelew">Przelew</option>
//             <option value="Gotówka">Gotówka</option>
//           </select>
//         </div>
//       ))}
//       <button>nowy wyslij koszt</button>
//     </div>
//   );
// };

// export default DynamicForm;


// // import { format } from 'date-fns';
// // import React, { useState } from 'react';

// // interface FormField {
// //   id: number;
// //   value: string;
// //   invoiceNum: string;
// //   invoiceDate: string;
// //   paymentDate: string;
// //   sellerName: string;
// //   paymentForm: string;
// // }

// // interface IForm1 {
// //   thisDay: ValuePiece
// // }

// // type ValuePiece = Date | null;

// // type Value = ValuePiece | [ValuePiece, ValuePiece];

// // const DynamicForm: React.FC<IForm1> = (props) => {
// //   const [formFields, setFormFields] = useState<FormField[]>([]);
// //   const [nextId, setNextId] = useState<number>(1);

// //   const addFormField = () => {
// //     setFormFields([...formFields, { id: nextId, value: '', invoiceNum: '', invoiceDate: '', paymentDate: '', sellerName: '' ,paymentForm: ''}]);
// //     setNextId(nextId + 1);
// //   };

// //   const handleInputChange = (id: number, inputName: string, value: string) => {
// //     const updatedFormFields = formFields.map((field) =>
// //       field.id === id ? { ...field, [inputName]: value } : field
// //     );
// //     setFormFields(updatedFormFields);
// //   };

// //   console.log("jakie props", props.thisDay)
// //   return (
// //     <div>
// //       <button onClick={addFormField}>Dodaj pozycję</button>
     
// //       {/* {`${format(props.thisDay, 'yyyy')}`}   */}
// //       {formFields.map((field) => (
        
// //         <div key={field.id}>

// //             {field.id}
// //             .
            
                
// // {`${format(props.thisDay, 'dd-MM-yyyy')}`}
// // <input
// //             type="text"
// //             placeholder="amount"
// //             value={field.paymentForm}
// //             onChange={(e) => handleInputChange(field.id, 'sellerName', e.target.value)}
// //           />
// //           <input
// //             type="text"
// //             placeholder="Invoice Num"
// //             value={field.invoiceNum}
// //             onChange={(e) => handleInputChange(field.id, 'invoiceNum', e.target.value)}
// //           />
// //           {/* <input
// //             type="text"
// //             placeholder="Invoice Date"
// //             value={field.invoiceDate}
// //             onChange={(e) => handleInputChange(field.id, 'invoiceDate', e.target.value)}
// //           /> */}
// //           <input
// //             type="text"
// //             placeholder="Seller Name"
// //             value={field.sellerName}
// //             onChange={(e) => handleInputChange(field.id, 'sellerName', e.target.value)}
// //           />
        
// //         </div>
// //       ))}
// //     </div>
// //   );
// // };
// // //payment amount, payment date, vat,// przychody to co na glowny //forma platnosci

// // export default DynamicForm;

// // // import React, { useState } from 'react';

// // // interface FormField {
// // //   id: number;
// // //   value: string;
// // //   invoiceNum: string;
// // //   invoiceDate: string;

// // // }

// // // const DynamicForm: React.FC = () => {
// // //   const [formFields, setFormFields] = useState<FormField[]>([]);
// // //   const [nextId, setNextId] = useState<number>(1);

// // //   const addFormField = () => {
// // //     setFormFields([...formFields, { id: nextId, value: '' ,invoiceNum: '', invoiceDate: ''}]);
// // //     setNextId(nextId + 1);
// // //   };

// // //   const handleInputChange = (id: number, value: string) => {
// // //     const updatedFormFields = formFields.map((field) =>
// // //       field.id === id ? { ...field, value, invoiceNum,invoiceDate} : field
// // //     );
// // //     setFormFields(updatedFormFields);
// // //   };

// // //   return (
// // //     <div>
// // //       <button onClick={addFormField}>Dodaj</button>
// // //       {formFields.map((field) => (
// // //         <div>
// // //         <input
// // //           key={field.id}
// // //           type="text"
// // //           value={field.value}
// // //           onChange={(e) => handleInputChange(field.id, e.target.value)}
// // //         />
// // //          {field.value}{field.id}
// // //         </div>
       
// // //       ))}
// // //     </div>
// // //   );
// // // };

// // // export default DynamicForm;