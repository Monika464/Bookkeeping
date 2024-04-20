import { collection, deleteDoc, deleteField, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { db } from "../../App";
import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../context/UserContext';
import { Value } from "../Calendar";
import { getDate, getMonth, getYear } from "date-fns";
import { useNavigate } from "react-router-dom";

export interface IDayExpenses {
    thisDay: Value 
};

//props z calendara to bedzie data this date
export interface Invoice {
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


const DayExpenses : React.FunctionComponent<IDayExpenses> =(props) =>{
    // const [selectedInvoices, setSelectedInvoices] = useState([]);
    const [selectedInvoices, setSelectedInvoices] = useState<{[key: string]: Invoice[]}>([]);
    const [invoices, setInvoices] = useState<{[key: string]: Invoice}>({});
    const [isEditMode, setIsEditMode] = useState(false);
    const [isEditModePaid, setIsEditModePaid] = useState(false);


    const thisDay = props.thisDay;

    
    const {currentUser} = useContext(UserContext);
    const day: number = getDate(thisDay);
    const month: number = getMonth(thisDay);
   const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
   //const monthNames = ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'];
   const monthName = monthNames[month];
    //const uid = "user1id";
    const userId = currentUser?.uid;
    const year: number = getYear(thisDay);
    //console.log("currentUser",currentUser)
    const navigate = useNavigate();
    
    const readingFromBase =async()=>{

        try {
            const usersCollectionRef = collection(db, `${userId}`);
            const q = query(usersCollectionRef, 
                where('year', '==', year), 
                where('month', '==', monthName), 
                where('type', '==', 'expenses'), 
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
 
  console.log('expenses',invoices)
  //console.log("invoices",invoices)

 
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
selectedInvoices.map(async(item)=>{
   // console.log("iterms to delete", item)
   await deleteDoc(doc(db, `${userId}`, item));
})
//navigate('/loginout');
  };

// Funkcja do zmiany nazwy przycisku delete
const getButtonLabel = () => {
    return isEditMode ? "Finish editing for delete" : "Edit for delete";
  };

  // Funkcja obsługująca kliknięcie przycisku "Zaplac"
  const handlePayClick = async () => {
    // const usersCollectionRef = collection(db, `${userId}`);
   selectedInvoices.map(async(item)=>{
     const itemRefI = doc(db, userId, item);
      if(item){
        await updateDoc(itemRefI, {
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

//console.log("invoices",invoices);
const isInvoicesEmpty = Object.keys(invoices).length === 0;
//invoices ? console.log("sa") : console.log("nie ma")
// Funkcja do obsługi kliknięcia przycisku "Edit" lub "Finish"


return(
<div>

<div>
    {Object.values(invoices).map((invoice, index) => (
      <div key={index}>
        {isEditMode &&  (
            <>
        <input
          type="checkbox"
          id={`invoice-checkbox-${index}`}
          value={invoice.itid}
          onChange={handleCheckboxChange}
        />
        <label htmlFor={`invoice-checkbox-${index}`}>
          {`${invoice.invoiceNum}, 
          ${invoice.amount} zł, 
           ${invoice.invoiceName}, 
           ${invoice.sellerName}, 
           ${invoice.paymentForm}, 
           ${invoice.description},
          ${invoice.paid ? "zaplacony" : 'niezapłacony'}
          `}
        </label>
        </>)}

        {isEditModePaid && !invoice.paid && (
         <>
           <input
          type="checkbox"
          id={`invoice-checkbox-${index}`}
          value={invoice.itid}
          onChange={handleCheckboxChange}
          />
          <label htmlFor={`invoice-checkbox-${index}`}>
          {`  ${invoice.invoiceNum}, 
           ${invoice.amount} zł, 
           ${invoice.invoiceName}, 
           ${invoice.sellerName}, 
           ${invoice.paymentForm}, 
           ${invoice.description},
             ${invoice.paid ? "zapłacony" : 'niezapłacony'}
          `}
        </label>
    </>
)}

        {!isEditMode && !isEditModePaid &&<div>
          {` ${invoice.invoiceNum}, 
           ${invoice.amount} zł, 
           ${invoice.invoiceName}, 
           ${invoice.sellerName}, 
           ${invoice.paymentForm}, 
           ${invoice.description},
          ${invoice.paid ? "zaplacony" : 'niezapłacony'}
           `}
          </div>} 
      </div>
    ))}
    {/* <button onClick={handleDeleteClick}>Delete</button> */}
    
    {isEditMode && (
        <button onClick={handleDeleteClick} className="btn">usuń wybrane faktury</button>
    )}
      {/* <button onClick={() => setIsEditMode(!isEditMode)}>edytuj</button> */}
      { !isEditModePaid && !isInvoicesEmpty && <button onClick={() => setIsEditMode(!isEditMode)} className="btnsmall">
      {getButtonLabel()}
    </button>}

    {isEditModePaid && (
        <button onClick={handlePayClick} className="btn">opłać wybraną fakturę</button>
    )}
      {/* <button onClick={() => setIsEditMode(!isEditMode)}>edytuj</button> */}
      { !isEditMode && !isInvoicesEmpty && <button onClick={() => setIsEditModePaid(!isEditModePaid)} className="btnsmall">
      {getButtonLabelPaid()}
    </button>}





  </div>
</div>)
}

export default DayExpenses;