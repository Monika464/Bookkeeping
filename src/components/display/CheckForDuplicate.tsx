import { collection, getDocs } from "firebase/firestore";
import { db } from "../../App";
import { useCallback, useContext, useEffect, useState } from 'react'
import { UserContext } from '../../context/UserContext';

export interface IDup  {
   
};

const CheckForDuplicates : React.FunctionComponent<IDup> =(props) =>{

const [duplicates,setDuplicates] = useState<IDup[] | null>();
const [dataFromBase, setDataFromBase] = useState({})
const [dataFromBase2, setDataFromBase2] = useState({})
const {currentUser} = useContext(UserContext);


const userId = currentUser?.uid

useEffect(()=>{
  readingFromBase()
},[currentUser])

const readingFromBase = useCallback(async()=>{

   try {
    let newData = {};
    let newDataAssets = {};
    //const testD = []
    const querySnapshot = await getDocs(collection(db, `${userId}`));
    
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      //console.log(doc.id, " => ", doc.data());
      const idHasCash = /cash/i.test(doc.id);
      const idHasAssets = /assets/i.test(doc.id);

      if (!idHasCash && !idHasAssets) {
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
      
},[setDataFromBase, setDataFromBase2, userId])

     
     useEffect(() => {
      //readingFromBase();
      console.log('dataFromBase',dataFromBase)
      const duplicates = Object.values(dataFromBase).reduce((tempDuplicates, element1, index1, array) => {
        const foundDuplicates = array.filter((element2, index2) => {
          return element1.invoiceNum === element2.invoiceNum && index1 !== index2;
        });
    
        if (foundDuplicates.length > 0) {
          tempDuplicates.push(element1);
        }
    
        return tempDuplicates;
      }, []);
    
      setDuplicates(duplicates);
    }, [dataFromBase]);

    //  useEffect(()=>{
    //   Object.values(dataFromBase).forEach((element1, index1) => {

    //     console.log('element1',element1.invoiceNum)

    //     const temp =[]
          
    //     Object.values(dataFromBase).forEach((element2, index2) => {
         
    //     if( (element1.invoiceNum === element2.invoiceNum) && (index1 !== index2) ){

    //       console.log("identyczne",element1.invoiceNum)
      
    //    temp.push(element1)
    //     }
    //     })
  
    //     setDuplicates(temp)
        
    //    })
    //  },[dataFromBase])
     

  
    // console.log('duplicates',duplicates)

return(<div>
<br></br><br></br>
  {/* <button onClick={readingFromBase}>read</button> */}
  {duplicates && <div style={{color: "red"}}>Zdublowane numery faktur</div> && Object.values(duplicates).map((dup, index) => (
    <div key={index} style={{color: "red"}}>
      {dup.type === "incomes" ? "przychody" : "koszty" }
      <br></br>
      {`data   ${dup.day} ${dup.month} ${dup.year}`}
{` numer ${dup.invoiceNum}, kwota ${dup.amount}, nazwa ${dup.invoiceName}, sprzedawca ${dup.sellerName}, forma ${dup.paymentForm}, opis ${dup.description}`}
</div>
  ))}
</div>)
}

export default CheckForDuplicates;