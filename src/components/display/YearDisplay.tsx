export interface IYearDisplay {}
import { useCallback, useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { db } from '../../App';
import { YearSelector, useYear } from '../../context/YearContextType';

const YearDisplay: React.FunctionComponent<IYearDisplay> =(props) => {

    const [dataFromBaseExp, setDataFromBaseExp] = useState({})
    const [dataFromBaseInc, setDataFromBaseInc] = useState({})
    const [yearExpenses, setYearExpenses] = useState(0)
    const [yearIncomes, setYearIncomes] = useState(0)
    const {currentUser} = useContext(UserContext);


const userId = currentUser?.uid;
const { editedYear } = useYear();
const editedYearNum = parseInt(editedYear)

useEffect(() => {
    readingFromBase();
 },[currentUser,editedYear])

 //console.log("editedYear",editedYearNum)
    const readingFromBase = useCallback(async()=>{

try {
    const colRef = collection(db, `${userId}`);

    if(editedYear){

        const q1 = query(colRef, 
            where("year", "==", editedYearNum),
            where("type", "==", "expenses"),

            );
         let newDataExp = {}

        const querySnapshot1 = await getDocs(q1);
        querySnapshot1.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
         // console.log("nasz rok",doc.id, " => ", doc.data());
          newDataExp[doc.id] = { ...doc.data(), itid: doc.id };
        });
        setDataFromBaseExp(newDataExp)
    

         const q2 = query(colRef, 
            where("year", "==", editedYearNum),
            where("type", "==", "incomes"),
            );
         let newDataInc = {}

        const querySnapshot2 = await getDocs(q2);
        querySnapshot2.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          //console.log("nasz rok",doc.id, " => ", doc.data());
          newDataInc[doc.id] = { ...doc.data(), itid: doc.id };
        });
        setDataFromBaseInc(newDataInc)
    }

     } catch (error) {
      console.log(error)
     }
      
           
     },[setDataFromBaseExp,dataFromBaseInc, dataFromBaseExp,setDataFromBaseInc, userId,editedYearNum])

     //console.log("przychody",dataFromBaseInc)
       // console.log("koszty",dataFromBaseExp)
       // console.log("yearExpenses",yearExpenses)
       // console.log("yearIncomes",yearIncomes)
   //console.log("data from base",dataFromBaseExp)
    // console.log("data from inc",dataFromBaseInc)
   
    
     const countingExpenses = () => {
        let totalExpenses = 0;
        Object.values(dataFromBaseExp).forEach((exp, index) => {
           // console.log("suma wydatków", exp.amount);
            totalExpenses += parseFloat(exp.amount);
           // setYearExpenses((prevState) => prevState + exp.amount);
        });
        setYearExpenses(totalExpenses);
    };
 
    const countingIncomes = () => {
        let totalIncomes = 0;
        Object.values(dataFromBaseInc).forEach((inc, index) => {
           // console.log("suma przychodow", inc.amount);
            totalIncomes += parseFloat(inc.amount);
           // setYearExpenses((prevState) => prevState + exp.amount);
        });
        setYearIncomes(totalIncomes);
    };


     useEffect(()=>{
        countingExpenses();
        countingIncomes();
     },[dataFromBaseExp,dataFromBaseInc])

    // console.log('yearExpenses',yearExpenses);
     //console.log('yearIncomes',yearIncomes);
     //dopisz daty

    return(<div>

        Roczne zestawienie
        <YearSelector/>
        <br></br>
Koszty
<br></br>
{Object.values(dataFromBaseExp).map((exp, index) => (
      <div key={index}>
 {` numer ${exp.invoiceNum}, kwota ${exp.amount},
 data ${exp.day}-${exp.month}, nazwa ${exp.invoiceName}, 
 sprzedawca ${exp.sellerName}, forma ${exp.paymentForm}, 
 opis ${exp.description},
 ${exp.paid ? "zaplacony" : 'niezapłacony'}
 `}
      </div>
      
))}

Przychody 
<br></br>
{Object.values(dataFromBaseInc).map((inc, index) => (
      <div key={index}>
 {` numer ${inc.invoiceNum}, kwota ${inc.amount}, 
 data ${inc.day}-${inc.month}, nazwa ${inc.invoiceName}, 
 sprzedawca ${inc.sellerName}, forma ${inc.paymentForm}, 
 opis ${inc.description},
 ${inc.paid ? "zaplacony" : 'niezapłacony'}
 `}
      </div>
      
))}
Wynik 
{((yearIncomes - yearExpenses) > 0) ? 
` zysk ${yearIncomes - yearExpenses}` :
` strata ${yearIncomes - yearExpenses}`
}

    </div>)

}

export default YearDisplay;