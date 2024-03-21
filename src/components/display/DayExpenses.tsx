import { collection, deleteDoc, deleteField, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { db } from "../../App";
import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../context/UserContext';
import { Value } from "../Calendar";
import { getDate, getMonth, getYear } from "date-fns";

export interface IDayExpenses {
    thisDay: Value
};

//props z calendara to bedzie data this date



const DayExpenses : React.FunctionComponent<IDayExpenses > =(props) =>{
    const [selectedInvoices, setSelectedInvoices] = useState([]);

    const [content,setContent] = useState({})
    const [invoices, setInvoices] = useState({});
    const [isEditMode, setIsEditMode] = useState(false);

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
                where('type', '==', 'expenses'), 
                where('day', '==', day), 
              )
              let newData = {}
              const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc) => {
                 console.log(doc.id, " march=> ", doc.data());
               
                // newData[doc.id] =  doc.data(); 
                newData[doc.id] = { ...doc.data(), itid: doc.id };
                 //newData ={...doc.data(),itid: doc.id}
                });
                setInvoices(newData)   


        } catch (error) {
            console.error("Błąd podczas odczytu z bazy danych:", error);
        }

    }

    console.log('invoices',invoices)
 
    //     try {
    //         const querySnapshot1 = await getDocs(
    //              query(collection(db, `${uid}`, "2024", "january", "1marzec", "fakkosztowe"))
    //            // query(collection(db, `${uid}`, "2024", "january"))
    //             );

    //         //console.log("tut",querySnapshot1.docs)

    //         if (!querySnapshot1.empty) {
    //             let newData = {}; // Inicjalizuj obiekt newData, który będzie przechowywał aktualne dane
    //          let newSellers = []
    //             querySnapshot1.forEach((doc) => {
    //               //  console.log("docseller",doc.data().seller)
    //                // console.log("docinvoiceno",doc.data().invoiceno)
    //                //newData = { ...newData, [doc.id]: doc.data() }; // Dodaj dane z aktualnego dokumentu do newData
    //                 newData[doc.id] =  doc.data(); 
               
    
                   
    //             });

    //             setContent(newData); // Zaktualizuj stan content nowymi danymi
    //         }
    //     } catch (error) {
    //         console.error("Błąd podczas odczytu z bazy danych:", error);
    //     }
    //     // const querySnapshot1 = await getDocs(
    //     //     query(collection(db, `${uid}`, "2024", "january", "1marzec", "fakkosztowe"))
    //     //   );
        
    //     //   if(!querySnapshot1.empty){
    //     //     querySnapshot1.forEach((doc) => {
    //     //      console.log("doc",doc)
    //     //         setContent({...content, datta: doc.data()})
    //     //     })
    //     //   }
        
    // }
 
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
    console.log("iterms to delete", item)
    deleteDoc(doc(db, `${userId}`, item));
})
    console.log(selectedInvoices);
    //  selectedInvoices.map((item)=>{
    //     await deleteDoc(doc(db, `${userId}`, "DC"));
    // })
  };

// Funkcja do zmiany nazwy przycisku
const getButtonLabel = () => {
    return isEditMode ? "Finish" : "Edit";
  };
//console.log("content",content)

// Funkcja do obsługi kliknięcia przycisku "Edit" lub "Finish"


return(<div>expenses

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
          {` numer ${invoice.invoiceNum}, kwota ${invoice.amount}, nazwa ${invoice.invoiceName}, sprzedawca ${invoice.sellerName}, forma ${invoice.paymentForm}, opis ${invoice.description}`}
        </label>
        </>)}

         {` numer ${invoice.invoiceNum}, kwota ${invoice.amount}, nazwa ${invoice.invoiceName}, sprzedawca ${invoice.sellerName}, forma ${invoice.paymentForm}, opis ${invoice.description}`}
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
  </div>

{/* {Object.values(invoices).map((invoice, index) => (
  <div key={index}>
    <input
      type="checkbox"
      id={`invoice-checkbox-${index}`}
      value={invoice.invoiceNum}
      onChange={(e) => console.log(e.target.value)}
    />
    <label htmlFor={`invoice-checkbox-${index}`}>
      {` lp ${invoice.id}, numer ${invoice.invoiceNum}, kwota ${invoice.amount}, nazwa ${invoice.invoiceName}, sprzedawca ${invoice.sellerName}, forma ${invoice.paymentForm}, opis ${invoice.description}`}
    </label>
    <button onClick={(e) => console.log(e.target.previousSibling.value)}>Delete</button>
  </div>
))} */}

        {/* <div>
        {Object.values(invoices).map((invoice, index) => (
  <div key={index}>
    <input
      type="checkbox"
      id={`invoice-checkbox-${index}`}
      value={JSON.stringify(invoice)}
      onChange={(e) => console.log(e.target.value)}
    />
    <label htmlFor={`invoice-checkbox-${index}`}>
      {` lp ${invoice.id}, numer ${invoice.invoiceNum}, kwota ${invoice.amount}, nazwa ${invoice.invoiceName}, sprzedawca ${invoice.sellerName}, forma ${invoice.paymentForm}, opis ${invoice.description}`}
    </label>
  </div>
))} */}
        {/* <select onChange={(e) => console.log("co sie wyswietla",e.target.value)}>
  {Object.values(invoices).map((invoice, index) => (
    <option key={index} value={invoice.invoiceNum}>
      {`lp ${invoice.id}, numer ${invoice.invoiceNum}, kwota ${invoice.amount}, nazwa ${invoice.invoiceName}, sprzedawca ${invoice.sellerName}, forma ${invoice.paymentForm}, opis ${invoice.description}`}
    </option>
  ))}
</select> */}
        
                   {/* {Object.values(invoices).map((invoice,index) => (
                    <div key={index}>
                  
                        {` lp ${invoice.id}`}
                        {` numer ${invoice.invoiceNum}`}
                        {` kwota ${invoice.amount}`}
                        {` nazwa ${invoice.invoiceName}`}
                        {` sprzedawca ${invoice.sellerName}`}
                        {` forma ${invoice.paymentForm}`}
                        {` opis ${invoice.description}`}
                       
                        
                      
                    </div>
                ))} */}
       
    

</div>)
}

export default DayExpenses;