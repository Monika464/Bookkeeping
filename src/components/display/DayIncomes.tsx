import { collection, deleteDoc, deleteField, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { db } from "../../App";
import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../context/UserContext';
import { Value } from "../Calendar";
import { getDate, getMonth, getYear } from "date-fns";

export interface IDayIncomes  {
    thisDay: Value
};

//props z calendara to bedzie data this date



const DayIncomes : React.FunctionComponent<IDayIncomes > =(props) =>{
    const [selectedInvoices, setSelectedInvoices] = useState([]);

    const [content,setContent] = useState({})
    const [invoices, setInvoices] = useState({});
    const [isEditMode, setIsEditMode] = useState(false);
    const [isEditModePaid, setIsEditModePaid] = useState(false);

//invoices powinin sie zmieniac

    const thisDay = props.thisDay;
    const {currentUser} = useContext(UserContext);
    const day: number = getDate(thisDay);
    const month: number = getMonth(thisDay);
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const monthName = monthNames[month];
    //const uid = "user1id";
    const userId = currentUser?.uid;
    const year: number = getYear(thisDay);
    //console.log("currentUser",currentUser)

    const readingFromBase =async()=>{

        try {
            const usersCollectionRef = collection(db, `${userId}`);
            const q = query(usersCollectionRef, 
                where('year', '==', year), 
                where('month', '==', monthName), 
                where('type', '==', 'incomes'), 
                where('day', '==', day), 
              )
              let newData = {}
              const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc) => {
                // console.log(doc.id, " march=> ", doc.data());
               
                // newData[doc.id] =  doc.data(); 
                newData[doc.id] = { ...doc.data(), itid: doc.id };
                 //newData ={...doc.data(),itid: doc.id}
                });
                setInvoices(newData)   


        } catch (error) {
            console.error("Błąd podczas odczytu z bazy danych:", error);
        }

    }

    //console.log('incomes',invoices)
 

 
useEffect(()=>{
    readingFromBase(); 
    
},[props])

// Funkcja do obsługi zaznaczania i odznaczania checkboxów
const handleCheckboxChange = (e) => {
    const value = e.target.value;
    if (e.target.checked) {
      setSelectedInvoices([...selectedInvoices, value]);
    } else {
      setSelectedInvoices(selectedInvoices.filter(invoice => invoice !== value));
    }
  };
  
  // Funkcja obsługująca kliknięcie przycisku "Delete"
  const handleDeleteClick = async () => {
   // const usersCollectionRef = collection(db, `${userId}`);
selectedInvoices.map((item)=>{
   // console.log("iterms to delete", item)
    deleteDoc(doc(db, `${userId}`, item));
})
   
  };

// Funkcja do zmiany nazwy przycisku
const getButtonLabel = () => {
    return isEditMode ? "Finish editing for delete" : "Edit for delete";
  };
//console.log("content",content)

  // Funkcja obsługująca kliknięcie przycisku "Zaplac"
  const handlePayClick = async () => {
    // const usersCollectionRef = collection(db, `${userId}`);
 selectedInvoices.map((item)=>{
  const itemRefI = doc(db, userId, item);
  if(item){
    updateDoc(itemRefI, {
     paid: true
    })
  //.then(()=>{isSendI(true)})
  }
 })
  }

  // Funkcja do zmiany nazwy przycisku
const getButtonLabelPaid = () => {
  return isEditModePaid ? "Finish editing for pay" : "Edit for pay";
};



return(<div>incomes

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
          {` numer ${invoice.invoiceNum}, kwota ${invoice.amount}, 
          nazwa ${invoice.invoiceName}, sprzedawca ${invoice.sellerName}, 
          forma ${invoice.paymentForm}, opis ${invoice.description},
          ${invoice.paid ? "zaplacony" : 'niezapłacony'}
          `}
        </label>
        </>)}

        {isEditModePaid && (
            <>
        <input
          type="checkbox"
          id={`invoice-checkbox-${index}`}
          value={invoice.itid}
          onChange={handleCheckboxChange}
        />
        <label htmlFor={`invoice-checkbox-${index}`}>
          {` numer ${invoice.invoiceNum}, kwota ${invoice.amount}, 
          nazwa ${invoice.invoiceName}, sprzedawca ${invoice.sellerName}, 
          forma ${invoice.paymentForm}, opis ${invoice.description},
          ${invoice.paid ? "zaplacony" : 'niezapłacony'}
          `}
        </label>
        </>)}

        {!isEditMode && !isEditModePaid &&<div>
          {` numer ${invoice.invoiceNum}, kwota ${invoice.amount}, 
          nazwa ${invoice.invoiceName}, sprzedawca ${invoice.sellerName}, 
          forma ${invoice.paymentForm}, opis ${invoice.description},
          ${invoice.paid ? "zaplacony" : 'niezapłacony'}
          `}
          </div>}

         
      </div>
    ))}
    {/* <button onClick={handleDeleteClick}>Delete</button> */}
    {isEditMode && (
        <button onClick={handleDeleteClick}>remove selected items</button>
      )}
      {/* <button onClick={() => setIsEditMode(!isEditMode)}>edytuj</button> */}
      <button onClick={() => setIsEditMode(!isEditMode)}>
      {getButtonLabel()}
    </button>

    {isEditModePaid && (
        <button onClick={handlePayClick}>pay selected items</button>
    )}

<button onClick={() => setIsEditModePaid(!isEditModePaid)}>
      {getButtonLabelPaid()}
    </button>


    
  </div>
</div>)
}

export default DayIncomes;