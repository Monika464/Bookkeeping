import { collection, getDocs, query, where } from "firebase/firestore";
import { useCallback, useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { useYear } from "../context/YearContextType";
import { db } from "../App";

export interface IDatabaseQuery{
    //year: string;
    //typeInvoice: string;
     //amount: number;
    //amount?: string;

}


const useMoneyAssetsQuery  = (elementName: string) => {
    const {currentUser} = useContext(UserContext);
    const userId = currentUser?.uid;
    const { editedYear } = useYear();
    const [dataFromBase, setDataFromBase] = useState({})
    //const [isEmpty, setIsEmpty] = useState(false);

    
    const readQuery =useCallback(async() =>{
        //  const itemRefI = doc(db, uid, `cash ${editedYear}`) 
          const userCollectionRef = collection(db, `${userId}`);
          const q = query(userCollectionRef,
              where("id", "==", `${elementName} ${editedYear}`)
          )
  
          let newData: any = {}
                  const querySnapshot1 = await getDocs(q);
                 if(querySnapshot1.empty){
                 // setIsEmpty(true)
                 } else {
  
                  querySnapshot1.forEach((doc) => {
                      // doc.data() is never undefined for query doc snapshots
                     // console.log("nasz rok",doc.id, " => ", doc.data());
                      newData[doc.id] = { ...doc.data(), itid: doc.id };
                    });
                    setDataFromBase(newData)
                   // setIsEmpty(false)
                 }
                
  
                //  console.log("dataFromBaseCash",dataFromBase)
      },[userId,editedYear])
  
    
      useEffect(()=>{
        readQuery()
      },[userId,readQuery,editedYear])

      return dataFromBase
}

export default useMoneyAssetsQuery