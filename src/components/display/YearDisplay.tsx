export interface IYearDisplay {}
import { useCallback, useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../App';
import { YearSelector, useYear } from '../../context/YearContextType';

export interface Invoice {
    [key: string]: string | number | boolean;
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
const YearDisplay: React.FunctionComponent<IYearDisplay> =() => {

    const [dataFromBaseExp, setDataFromBaseExp] = useState<Invoice[]>([])
    const [dataFromBaseInc, setDataFromBaseInc] = useState<Invoice[]>([])
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
         let newDataExp: any = {}

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
         let newDataInc: any = {}

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
        Object.values(dataFromBaseExp).forEach((exp) => {
           // console.log("suma wydatków", exp.amount);
            totalExpenses += parseFloat(exp.amount);
           // setYearExpenses((prevState) => prevState + exp.amount);
        });
        setYearExpenses(totalExpenses);
    };
 
    const countingIncomes = () => {
        let totalIncomes = 0;
        Object.values(dataFromBaseInc).forEach((inc) => {
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

     console.log('yearExpenses',yearExpenses);
     console.log('dataFromBaseExp',dataFromBaseExp,'dataFromBaseInc',dataFromBaseInc)
     //console.log('yearIncomes',yearIncomes);
     //dopisz daty

    return(<div>

        Roczne zestawienie
        <YearSelector/>
        <br></br>
        Edytujesz rok: {editedYear}
        <br></br>
        <br></br>


<ol>
<h4>Koszty</h4>
{Object.values(dataFromBaseExp).map((exp, index) => (
      <li key={index}>
 {` ${exp.invoiceNum}, 
 ${exp.amount} zł,
 ${exp.day}-${exp.month}, 
 ${exp.invoiceName}, 
 ${exp.sellerName}, 
 ${exp.paymentForm}, 
  ${exp.description},
  ${exp.category === "service" ? "usługi," : "administracja,"}
 ${exp.paid ? "zaplacony" : 'niezapłacony'}
 `}
      </li>
      
))}
</ol> 
<br></br><br></br>
<ol>
<h4>Przychody</h4>
{Object.values(dataFromBaseInc).map((inc, index) => (
    
      <li key={index}>
 {`  ${inc.invoiceNum}, 
  ${inc.amount} zł, 
  ${inc.day}-${inc.month}, 
  ${inc.invoiceName}, 
  ${inc.sellerName}, 
  ${inc.paymentForm}, 
  ${inc.description},
 ${inc.paid ? "zaplacony" : 'niezapłacony'}
 `}
      </li>
     
))}
</ol>
<br></br>
<h3>Wynik</h3> 
<br></br>
{((yearIncomes - yearExpenses) > 0) ? 
` zysk ${yearIncomes - yearExpenses} zł` :
` strata ${yearIncomes - yearExpenses} zł`
}

    </div>)

}

export default YearDisplay;