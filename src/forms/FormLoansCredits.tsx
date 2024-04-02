import { useCallback, useContext, useEffect, useState } from "react";
import useDatabaseQuery from "../hooks/useDatabaseQuery";
import { collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { UserContext } from "../context/UserContext";
import { db } from "../App";
import useDataBaseQuery from "../hooks/useDatabaseQuery";
import ShowData from "../components/ShowData";

export interface IFormLoansCredits{}

const FormLoansCredits: React.FC<IFormLoansCredits> = (props) => {
  
  const [selectedOptionE, setSelectedOptionE] = useState('');
  const [selectedOptionI, setSelectedOptionI] = useState('');

 const [sendE,isSendE] = useState(false);
 const [sendI,isSendI] = useState(false);

  const {currentUser} = useContext(UserContext);
  const uid = currentUser?.uid


  const dataFromBaseE = useDataBaseQuery(2024,"expenses");
  const dataFromBaseI = useDataBaseQuery(2024,"incomes");
  const dataFromBaseLongTermE = useDataBaseQuery(2024,"expenses","longTerm",true);
  const dataFromBaseLongTermI = useDataBaseQuery(2024,"incomes","longTerm",true);
  
  

  //console.log('dataFrombaseI',dataFromBaseI)
  //console.log('dataFrombaseLongTermE',dataFromBaseLongTermE)
  //console.log('dataFrombaseLongTermI',dataFromBaseLongTermI)
  

  const handleSelectChangeE = (event) => {
    setSelectedOptionE(event.target.value); // Ustawienie nowej wybranej wartości
    isSendE(false)
  };
  //console.log('selectedOptionE',selectedOptionE)

  const handleSelectChangeI = (event) => {
    setSelectedOptionI(event.target.value); // Ustawienie nowej wybranej wartości
    isSendI(false)
  };

//console.log("selectedOptionI",selectedOptionI)

const updateExpenses = async()=>{
  const itemRefE = doc(db, uid, selectedOptionE)
  if(selectedOptionE){
    await updateDoc(itemRefE, {
        longTerm: true
      })
      .then(()=>{isSendE(true)})

}
};

const updateInvest = async()=>{
  const itemRefI = doc(db, uid, selectedOptionI)
  if(selectedOptionI){
    await updateDoc(itemRefI, {
        longTerm: true
      })
      .then(()=>{isSendI(true)})

}
};
 
    return (<div>
      <br></br>

Oznacz koszty,zobowiązania dlgoterminowe (pow.12 msc)
<br></br>

<select value={selectedOptionE} onChange={handleSelectChangeE}>
  {Object.values(dataFromBaseE).map((el, index) => (
    <option key={el.itid} value={el.itid}>
      {`${el.invoiceNum},${el.amount},${el.invoiceName}, ${el.sellerName}`}
    </option>
  ))}
</select>
<br></br>
<button onClick={updateExpenses}>oznacz</button>
{sendE && <p>zapisano fakturę jako inwestycję długoterminową</p>}
<br></br>
Showing long term expenses and inwestments
<br></br>
<ShowData dataToShow={dataFromBaseLongTermE}/>

<br></br><br></br>

Oznacz przychody dlgoterminowe: otrzymane pozyczki, kredyty (pow.12 msc)
i dotacje na przyszły rok
<br></br>

<select value={selectedOptionI} onChange={handleSelectChangeI}>
  {Object.values(dataFromBaseI).map((el, index) => (
    <option key={el.itid} value={el.itid}>
      {`${el.invoiceNum},${el.amount},${el.invoiceName}, ${el.sellerName}`}
    </option>
  ))}
</select>
<br></br>
<button onClick={updateInvest}>oznacz</button>
{sendI && <p>zapisano fakturę jako kredyt długoterminowy</p>}

<br></br>

Showing long term incomes
<br></br>
<ShowData dataToShow={dataFromBaseLongTermI}/>











    </div>)
}

export default FormLoansCredits;




//wczytujemy osobno przychody 
//select ktory obejmuje 

//osobno koszty 

//kredyty otrzymane i zaciagniete pozyczki
//oznaczamy w select i edytujemy zaznaczając opcje 
//robimy button oznacza jako czas spłaty dłuzszy niz 12 msc

