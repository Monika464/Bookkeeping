import { useCallback, useContext, useEffect, useState } from "react";
import useDatabaseQuery from "../hooks/useDatabaseQuery";
import { collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { UserContext } from "../context/UserContext";
import { db } from "../App";
import useDataBaseQuery from "../hooks/useDatabaseQuery";
import ShowData from "../components/ShowData";
import { useYear } from "../context/YearContextType";

export interface IFormLoansCredits{}

const FormLoansCredits: React.FC<IFormLoansCredits> = (props) => {
  
  const [selectedOptionE, setSelectedOptionE] = useState('');
  const [selectedOptionI, setSelectedOptionI] = useState('');
  const [dataFromBaseExp, setDataFromBaseExp] = useState({})
  const [isEmptyExp, setIsEmptyExp] = useState(false);
  const [dataFromBaseInc, setDataFromBaseInc] = useState({})
  const [isEmptyInc, setIsEmptyInc] = useState(false);
  const [dataFromBaseExpLong, setDataFromBaseExpLong] = useState({})
  const [isEmptyExpLong, setIsEmptyExpLong] = useState(false);
  const [dataFromBaseIncLong, setDataFromBaseIncLong] = useState({})
  const [isEmptyIncLong, setIsEmptyIncLong] = useState(false);

 const [sendE,isSendE] = useState(false);
 const [sendI,isSendI] = useState(false);

 const { editedYear } = useYear();
 const editedYearNum = parseInt(editedYear)




  const {currentUser} = useContext(UserContext);
  const uid = currentUser?.uid
  //const { editedYear } = useYear();

//zczytywanie kosztow do selecta

const readExpenses =useCallback(async() =>{
  //  const itemRefI = doc(db, uid, `cash ${editedYear}`) 
    const userCollectionRef = collection(db, `${uid}`);
    const q = query(userCollectionRef,
        where("year", "==", editedYearNum),
        where("type", "==", "expenses")
    )

    let newData = {}
            const querySnapshot1 = await getDocs(q);
           if(querySnapshot1.empty){
            setIsEmptyExp(true)
           } else {

            querySnapshot1.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
               // console.log("nasz rok",doc.id, " => ", doc.data());
                newData[doc.id] = { ...doc.data(), itid: doc.id };
              });
              setDataFromBaseExp(newData)
              setIsEmptyExp(false)
           }
          

            //console.log("dataFromBaseExp",dataFromBaseExp)
},[uid,editedYear,dataFromBaseExp])

//zczytywanie pozyczek, kredytow do selecta

const readIncomes =useCallback(async() =>{
  //  const itemRefI = doc(db, uid, `cash ${editedYear}`) 
    const userCollectionRef = collection(db, `${uid}`);
    const q = query(userCollectionRef,
        where("year", "==", editedYearNum),
        where("type", "==", "incomes")
    )

    let newData = {}
            const querySnapshot1 = await getDocs(q);
           if(querySnapshot1.empty){
            setIsEmptyInc(true)
           } else {

            querySnapshot1.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
               // console.log("nasz rok",doc.id, " => ", doc.data());
                newData[doc.id] = { ...doc.data(), itid: doc.id };
              });
              setDataFromBaseInc(newData)
              setIsEmptyInc(false)
           }
          

            console.log("dataFromBaseExp",dataFromBaseExp)
},[uid,editedYear,dataFromBaseExp, dataFromBaseInc])

//zczytywanie kosztow long term

const readExpensesLong =useCallback(async() =>{
  //  const itemRefI = doc(db, uid, `cash ${editedYear}`) 
    const userCollectionRef = collection(db, `${uid}`);
    const q = query(userCollectionRef,
        where("year", "==", editedYearNum),
        where("type", "==", "expenses"),
        where("longTerm", "==", true)
    )

    let newData = {}
            const querySnapshot1 = await getDocs(q);
           if(querySnapshot1.empty){
            setIsEmptyExpLong(true)
           } else {

            querySnapshot1.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
               // console.log("nasz rok",doc.id, " => ", doc.data());
                newData[doc.id] = { ...doc.data(), itid: doc.id };
              });
              setDataFromBaseExpLong(newData)
              setIsEmptyExp(false)
           }
          

           // console.log("dataFromBaseLong",dataFromBaseExpLong)

},[uid,editedYear,dataFromBaseExp])


const readIncomesLong =useCallback(async() =>{
  //  const itemRefI = doc(db, uid, `cash ${editedYear}`) 
    const userCollectionRef = collection(db, `${uid}`);
    const q = query(userCollectionRef,
        where("year", "==", editedYearNum),
        where("type", "==", "expenses"),
        where("longTerm", "==", true)
    )

    let newData = {}
            const querySnapshot1 = await getDocs(q);
           if(querySnapshot1.empty){
            setIsEmptyIncLong(true)
           } else {

            querySnapshot1.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
               // console.log("nasz rok",doc.id, " => ", doc.data());
                newData[doc.id] = { ...doc.data(), itid: doc.id };
              });
              setDataFromBaseIncLong(newData)
              setIsEmptyIncLong(false)
           }
          

           // console.log("dataFromBaseIncLong",dataFromBaseIncLong)

},[uid,editedYear,dataFromBaseExp])





useEffect(()=>{
  readExpenses();
  readIncomes();
  readExpensesLong();
  readIncomesLong();
},[uid,editedYear])

//koniec




  const handleSelectChangeE = (event) => {
    setSelectedOptionE(event.target.value); // Ustawienie nowej wybranej wartości
    isSendE(false)
    //setSelectedOptionE('')
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
  {Object.values(dataFromBaseExp).map((el, index) => (
    <option key={el.itid} value={el.itid}>
      {`${el.invoiceNum},${el.amount},${el.day}-${el.month},${el.invoiceName}, ${el.sellerName}`}
    </option>
  ))}
</select>
<br></br>
<button onClick={updateExpenses}>oznacz</button>
{sendE && <p>zapisano fakturę jako inwestycję długoterminową</p>}
<br></br>
Showing long term expenses and inwestments
<br></br>
 <ShowData dataToShow={dataFromBaseExpLong}/> 

<br></br><br></br>

Oznacz przychody dlgoterminowe: otrzymane pozyczki, kredyty (pow.12 msc)
i dotacje na przyszły rok
<br></br>

<select value={selectedOptionI} onChange={handleSelectChangeI}>
  {Object.values(dataFromBaseInc).map((el, index) => (
    <option key={el.itid} value={el.itid}>
      {`${el.invoiceNum},${el.amount},${el.day}-${el.month},${el.invoiceName}, ${el.sellerName}`}
    </option>
  ))}
</select>
<br></br>
<button onClick={updateInvest}>oznacz</button>
{sendI && <p>zapisano fakturę jako kredyt długoterminowy</p>}

<br></br>

Showing long term incomes
<br></br>
<ShowData dataToShow={dataFromBaseIncLong}/> 











    </div>)
}

export default FormLoansCredits;




//wczytujemy osobno przychody 
//select ktory obejmuje 

//osobno koszty 

//kredyty otrzymane i zaciagniete pozyczki
//oznaczamy w select i edytujemy zaznaczając opcje 
//robimy button oznacza jako czas spłaty dłuzszy niz 12 msc

