import { useCallback, useContext, useEffect, useState } from "react";
import useQuerySrodkiTrwale from "../hooks/useQuerySrodkiTrwale";
import { collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { UserContext } from "../context/UserContext";
import { useYear } from "../context/YearContextType";
import { db } from "../App";
import ShowData from "../components/ShowData";

export interface IIncomeLoan{}

const IncomeLoan: React.FC<IIncomeLoan> = (props) => {

    const [dataFromBaseInc, setDataFromBaseInc] = useState({})
    const [isEmptyInc, setIsEmptyInc] = useState(false);
    const [dataFromBaseIncLoan, setDataFromBaseIncLoan] = useState({})
  const [isEmptyIncLong, setIsEmptyIncLoan] = useState(false);
    const [selectedOptionI, setSelectedOptionI] = useState('');
    const [sendI,isSendI] = useState(false);
   
   
    const {currentUser} = useContext(UserContext);
    const uid = currentUser?.uid
    const { editedYear } = useYear();
 const editedYearNum = parseInt(editedYear);

 console.log("editedYear",editedYear)
    
 const readIncomes =useCallback(async() =>{
        //  const itemRefI = doc(db, uid, `cash ${editedYear}`) 
          const userCollectionRef = collection(db, `${uid}`);
          const q = query(userCollectionRef,
              where("year", "==", editedYearNum),
              where("type", "==", "incomes"),
            //   where("longTerm", "==", true)
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
                
      
                 // console.log("dataFromBaseIncLong",dataFromBaseIncLong)
      
      },[uid,editedYear]);

      const readIncomesLoan =useCallback(async() =>{
        //  const itemRefI = doc(db, uid, `cash ${editedYear}`) 
          const userCollectionRef = collection(db, `${uid}`);
          const q = query(userCollectionRef,
              where("year", "==", editedYearNum),
              where("type", "==", "incomes"),
              where("loan", "==", true)
          )
      
          let newData = {}
                  const querySnapshot1 = await getDocs(q);
                 if(querySnapshot1.empty){
                  setIsEmptyIncLoan(true)
                 } else {
      
                  querySnapshot1.forEach((doc) => {
                      // doc.data() is never undefined for query doc snapshots
                      //console.log("nasz rok",doc.id, " => ", doc.data());
                      newData[doc.id] = { ...doc.data(), itid: doc.id };
                    });
                    //console.log("new data", newData)
                    setDataFromBaseIncLoan(newData)
                   // console.log("dataFromBaseIncLong",dataFromBaseIncLoan)
                    setIsEmptyIncLoan(false)
                 }
                
      
                 
                 //console.log("dataFromBaseIncLoan",dataFromBaseIncLoan)
      },[uid,editedYear])

      // useEffect(() => {
      //   console.log("dataFromBaseIncLoan", dataFromBaseIncLoan);
      // }, [dataFromBaseIncLoan]);
      

      useEffect(()=>{
        readIncomes();
        readIncomesLoan();
        
      },[uid,editedYear,readIncomes,readIncomesLoan])

      const handleSelectChangeI = (event) => {
        setSelectedOptionI(event.target.value); // Ustawienie nowej wybranej wartości
        isSendI(false)
      };

      const updateInvest = async()=>{
        const itemRefI = doc(db, uid, selectedOptionI)
        if(selectedOptionI){
          await updateDoc(itemRefI, {
              loan: true
            })
            .then(()=>{isSendI(true)})
      
      }
      };

    return(<div>
        Oznacz przychód pochodzacy z kredytu pozyczki
        <br></br>
        <select value={selectedOptionI} onChange={handleSelectChangeI}>
  
  {dataFromBaseInc && Object.values(dataFromBaseInc).map((el, index) => (
    <option key={el.itid} value={el.itid}>
      {`${el.invoiceNum},${el.amount},${el.day}-${el.month},${el.invoiceName}, ${el.sellerName}`}
    </option>
  ))}

</select>
<br></br>
<button onClick={updateInvest}>oznacz</button>
{sendI && <p>zapisano fakturę jako  środki otrzymane z pożyczki, kredytu</p>}
 <ShowData dataToShow={dataFromBaseIncLoan}/> 

</div>)


}

export default IncomeLoan;