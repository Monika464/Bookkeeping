import { collection, getDocs, query, where } from "firebase/firestore";
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
    
    const [content,setContent] = useState({})
    const [invoices, setInvoices] = useState({});
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
                 newData[doc.id] =  doc.data(); 
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


//console.log("content",content)

return(<div>expenses



        <div>
            
                 {Object.values(content).map((element,index) => (
                <div key={index}>
                    {/* Tutaj możesz wyrenderować zawartość każdego elementu content */}
                    {/* Na przykład: */}
                    {/* <p>{content[key]}</p> */}
                    {` sprzedawca ${element?.seller}`}
                    {`element.invoiceno ${element?.invoiceno}`}
                  
                </div>
                ))}
                   {Object.values(invoices).map((invoice,index) => (
                    <div key={index}>
                        {/* Tutaj możesz wyrenderować zawartość każdego elementu content */}
                        {/* Na przykład: */}
                        {/* <p>{content[key]}</p> */}
                        {` sprzedawca ${invoice.invoiceName}`}
                        {` kwota ${invoice.amount}`}
                        {/* {`element.invoiceno ${element?.invoiceno}`} */}
                      
                    </div>
                ))}
        </div>
    

</div>)
}

export default DayExpenses;