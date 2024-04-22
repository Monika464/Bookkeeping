import { collection, getDocs } from "firebase/firestore";
import { db } from "../../App";
import { useCallback, useContext, useEffect, useState } from 'react'
import { UserContext } from '../../context/UserContext';

export interface IDup  {
  year: any;
  type: string;
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
};

const CheckForDuplicates : React.FunctionComponent<IDup> =() =>{

const [duplicates,setDuplicates] = useState<IDup[] | null>();
const [dataFromBase, setDataFromBase] = useState({})
//const [dataFromBase2, setDataFromBase2] = useState({})
const {currentUser} = useContext(UserContext);


const userId = currentUser?.uid

useEffect(()=>{
  readingFromBase()
  //console.log("data from base",dataFromBase )
},[currentUser])

const readingFromBase = useCallback(async()=>{

   try {
    //let newData  ={};
    let newData: { [key: string]: {} } = {};
    const querySnapshot = await getDocs(collection(db, `${userId}`));
    
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      //console.log(doc.id, " => ", doc.data());
      const idHasCash = /cash/i.test(doc.id);
      const idHasAssets = /assets/i.test(doc.id);
      const idHasObligation = /obligation/i.test(doc.id);

      if (!idHasCash && !idHasAssets && !idHasObligation) {
        newData[doc.id] = { ...doc.data(), itid: doc.id };
      }

     
   
      
      //const testD = [{...doc.data()},doc.id]
      //testD.push({...doc.data()},doc.id)
      //console.log("test", testD )
    }); 
    setDataFromBase(newData)
    
    //setDataFromBase2(testD)
   } catch (error) {
    
   }
      
},[setDataFromBase, userId])

     
     useEffect(() => {
   
      const duplicates: any = Object.values(dataFromBase).reduce((tempDuplicates: any, element1:any, index1, array) => {
          const foundDuplicates = array.filter((element2: any, index2) => {
           return element1.invoiceNum === element2.invoiceNum && index1 !== index2;
        });
            if (foundDuplicates.length > 0) {
          tempDuplicates.push(element1);
        }
            return tempDuplicates;
      }, []);
          setDuplicates(duplicates);
    }, [dataFromBase]);



return(<div>
  
<br></br><br></br>
<ul>
  {/* <button onClick={readingFromBase}>read</button> */}
  {duplicates && <div style={{color: "red"}}>Zdublowane numery faktur</div> && Object.values(duplicates).map((dup, index) => (
   
    <li key={index} style={{color: "red"}}>
      {dup.type === "incomes" ? "przychody" : "koszty" }
      <br></br>
      {`data   ${dup.day} ${dup.month} ${dup.year}`}
     {` numer ${dup.invoiceNum}, kwota ${dup.amount}, nazwa ${dup.invoiceName}, sprzedawca ${dup.sellerName}, forma ${dup.paymentForm}, opis ${dup.description}`}
    </li>

  ))}
  </ul>
</div>)
}

export default CheckForDuplicates;