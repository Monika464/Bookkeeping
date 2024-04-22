// import useQuerySrodkiTrwale from "../../hooks/useQuerySrodkiTrwale";
// import { useContext, useEffect, useState } from "react";
// import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
// import { UserContext } from '../../context/UserContext';
// import { db } from "../../App";
// import { useYear } from "../../context/YearContextType";

// export interface IBalanceExtraInfoProps {}

// const Amortization: React.FunctionComponent<IBalanceExtraInfoProps> = (props) => {
  
//     const [amortizationValues, setAmortizationValues] = useState({});
//     const [currentValue, setCurrentValue] = useState(0);
//     const [recNumber, setRecNumber] = useState('');
//     const [day, setDay] = useState(0);
//     const [month, setMonth] = useState(0);
//   //const [buttonLabels, setButtonLabels] = useState({});
//   //const [InputIsShown, setInputIsShown]=  useState(false);
//   //const navigate = useNavigate();

//   const {currentUser} = useContext(UserContext);
//   const uid = currentUser?.uid
//   const dataFromSrodkiTrwaleMod = useQuerySrodkiTrwale();
//   //console.log("srodki trwałe",dataFromSrodkiTrwaleMod);
 

//  const { editedYear } = useYear();
//  const editedYearNum = parseInt(editedYear)

//  const checkCurrentValue = async(ind)=>{
//   const currentV = await dataFromSrodkiTrwaleMod[ind].amount
//   setCurrentValue(currentV)
//   const recN = await dataFromSrodkiTrwaleMod[ind].invoiceNum
//   setRecNumber(recN);
//   const d = await dataFromSrodkiTrwaleMod[ind].day
//   setDay(d)
//   const m = await dataFromSrodkiTrwaleMod[ind].month
//   setMonth(m);
//   //console.log('currentValue',dataFromSrodkiTrwaleMod[ind].amount);
//  // console.log("i co mamy",currentValue);
//      }

  

//      useEffect(() => {
//       console.log("i co mamy", currentValue);
//     }, [currentValue]);
 
//   const handleAmortizationClick = (index) => {
//     if (amortizationValues[index]) {
//       // Jeśli wartość już istnieje, ustaw ją na null lub undefined
//       setAmortizationValues((prev) => ({ ...prev, [index]: null }));
   
//       //ten index pozwoli na zlokalizowanie w mapowanej 
//       //trzeba zrobic zmienna editingIndex i go zapisac
//       //tablicy elementu wartosci poprzedniej - updatedValue = koszt do zapisania
//     } else {
//       // W przeciwnym razie ustaw wartość na true
//       setAmortizationValues((prev) => ({ ...prev, [index]: true }));
//       checkCurrentValue(index);
//     }

  

       
//   };
//   // const handleAmortizationClick = (index) => {
//   //   setAmortizationValues((prev) => ({ ...prev, [index]: true }));
//   //   //setButtonLabels((prev) => ({ ...prev, [index]: "Zakończ" }));
//   // };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index) => {
//     const { value } = e.target;
//     setAmortizationValues((prev) => ({ ...prev, [index]: value }));
//   };

//   const handleSaveClick = async(id) => {
//     // Tutaj możesz umieścić logikę zapisywania wartości amortyzacji
//     console.log("Zapisano wartość amortyzacji dla elementu", id);
//     //console.log("amortizationValues",(Object.keys(amortizationValues)));
//     const itemToUpdate = (Object.keys(amortizationValues))[1];
//     console.log("itemToUpdate",itemToUpdate)
//     console.log("amortizationValues",amortizationValues[1])
//     const valueToUpdate = (Object.values(amortizationValues))[1]
//     console.log('valueToUpdate',valueToUpdate)
//     //if(itemToUpdate){updateItem();}
//     if(uid && itemToUpdate){
//         const itemRef = doc(db, uid, itemToUpdate);
   
//         if(valueToUpdate){
//         await updateDoc(itemRef, {
//             endValue: valueToUpdate
//           })
//           .then(()=>{setAmortizationValues({})})
//         }

//         dodajNowyElementDoKolekcji(`${uid}`, {
//           userId: uid,
//           amount: currentValue - valueToUpdate,
//           invoiceNum: `${recNumber}-${editedYearNum}`,
//           day: 31,
//           month: 12,
//           year: editedYearNum,
//           type: "expenses",
//           nazwa: `koszty amortyzacji zakupu ${recNumber}`
//         });


//         }
//   };

//   //zmapyj tablice srodki trwale i znajdz wartosc
//   //edytowanego ellemenu

// // Dodaj nowy dokument do kolekcji
// async function dodajNowyElementDoKolekcji(colectionName: string, data) {
//   try {
//     const docRef = await addDoc(collection(db, colectionName), data);

//     console.log('Dodano dokument o ID: ', docRef.id);
//   } catch (error) {
//     console.error('Błąd podczas dodawania dokumentu: ', error);
//   }
// }


  

//   return (
//     <div>
//       Amortyzacja
//       {Object.values(dataFromSrodkiTrwaleMod).map((item, index) => (
//         <div key={index}>
//           {` numer ${item.invoiceNum}, kwota ${item.amount}, nazwa ${item.invoiceName}, data ${item.day}-${item.month},sprzedawca ${item.sellerName}, forma ${item.paymentForm}, opis ${item.description} ${item.endValue ? `, po amortyzacji ${item.endValue}` : ''}`}
//           <button onClick={() => handleAmortizationClick(index)}> Amortyzacja</button>
//           {amortizationValues[index] && (
//             <div>
//               <p>Wartość w ostatnim dniu bilansowym</p>
//               <input
//                 type="number"
//                 // value={amortizationValues[index]}
//                 value={amortizationValues[item]}
//                 onChange={(e) => handleInputChange(e, item.itid)}
//                 placeholder="Wpisz wartość amortyzacji"
//               />
//               <button onClick={() => handleSaveClick(item.itid)}>Zapisz</button>
//               <br />
//               <br />

         
//             </div>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Amortization;


// // import { onValue } from "firebase/database";
// // import useQuerySrodkiTrwale from "../../hooks/useQuerySrodkiTrwale";
// // import useQueryToBase from "../../hooks/useQuerySrodkiTrwale";
// // import { useState } from "react";

// // export interface IBalanceExtraInfoProps {

// // }

// // const BalanceExtraInfo: React.FunctionComponent<IBalanceExtraInfoProps> =(props) => {
// //     const [showInput, setShowInput] = useState(false);
// //     const [amortizationValue, setAmortizationValue] = useState(0);

// //     const [selectedOption, setSelectedOption] = useState({})
// //     const [dataForSelectOk, setDataForSelectOk] = useState({})
// //     const [buttonLabel, setButtonLabel] = useState("Amortyzacja");

// // const dataFromSrodkiTrwaleMod = useQuerySrodkiTrwale();
// // //dataFromSrodkiTrwale.map((el)=>{console.log("hej",el)})
// // console.log("dane z useSrodki trwale", dataFromSrodkiTrwaleMod)
// // //przygotowac  dane w formie obiektu z wartosciami value i label
// // //a potem go przeiterowac w select
// // //value to calu obiekt  z danymi 


// // const dataForSelect = {
// //     options: Object.values(dataFromSrodkiTrwaleMod)
// //     .map((item, index) => { 

   
// //     })

// // }
// //     // dataFromSrodkiTrwaleMod.map((item) => ({
// //     //     value: item.value, // Przyjmując, że masz właściwość 'value' w obiekcie 'item'
// //     //     label: item.label // Przyjmując, że masz właściwość 'label' w obiekcie 'item'
// //     // }))


// // //koszty podzielic na dzialnosc odpłatna, nieodplatna - w przyszlosci
// // //koszty z dotacji i środki wlasne do


// // const handleAmortizationClick = () => {
// //     setShowInput(true);
// //     setShowInput(!showInput)
// // };

// // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     setAmortizationValue(parseFloat(e.target.value));
// // };


// // const handleButtonClick = () => {
// //     if (showInput) {
// //       setShowInput(false);
// //       setButtonLabel("Amortyzacja");
// //     } else {
// //       setShowInput(true);
// //       setButtonLabel("Zakończ");
// //     }
// //   };

// // //zakup za wlasne srodki czy kredyt
// // //czy kredyt dluzszy niz 12mcs
// // //bedzie do zobowiązań

// // //czy pozyczki ma do spłaty lub inne zobowiazania
// // // dluzszy niz 12mcs 


// // //ilosc pieniedzy na koncie
// // //ilosc piniędzy w kasie 
// // //lub zadłużenie
// // //w dniu rozpoczynajacym bilans

// // //bilans

// // //wszystkie koszty to aktywa obrotowe
// // //podzial na dzialnosci i administracyjne

// // //pasywa zysk strata z ubiegłego roku 

// // //zysk strata z tego roku









// //     return(<div>BalanceExtraInfo

// // <div>
      
// //       {Object.values(dataFromSrodkiTrwaleMod).map((item, index) => (
// //         <div key={index}>
// //           {` numer ${item.invoiceNum}, kwota ${item.amount}, nazwa ${item.invoiceName}, sprzedawca ${item.sellerName}, forma ${item.paymentForm}, opis ${item.description}`}
// //           {/* <button onClick={handleButtonClick}>{buttonLabel}</button> */}
// //           <button onClick={handleAmortizationClick}>Amortyzacja</button>
// //           {showInput && (
// //             <div>
// //               <p>Wartość w ostatnim dniu bilansowym</p>
// //               <input
// //                 type="number"
// //                 value={amortizationValue}
// //                 onChange={handleInputChange}
// //                 placeholder="Wpisz wartość amortyzacji"
// //               />
// //               <button>zapisz</button>
// //               <br />
// //               <br />
// //             </div>
// //           )}
// //         </div>
// //       ))}
// //     </div>

// //  {/* {Object.values(dataFromSrodkiTrwaleMod).map((item, index) => (
// //       <div key={index}>
// //         {` numer ${item.invoiceNum}, kwota ${item.amount}, nazwa ${item.invoiceName}, sprzedawca ${item.sellerName}, forma ${item.paymentForm}, opis ${item.description}`}
// //         <button onClick={handleAmortizationClick}>Amortyzacja</button>
// //       {showInput && ( <div><p>Wartośc w ostatnim dniu bilansowym</p>
// //                         <input
// //                             type="number"
// //                             value={amortizationValue}
// //                             onChange={handleInputChange}
// //                             placeholder="Wpisz wartość amortyzacji"
// //                         />
// //                         <button>zapisz</button>
// // <br></br><br></br>
// //                         </div>
// //                     )}
// //       </div>
// //  ))} */}




// //     </div>)
// // }

// // export default BalanceExtraInfo;