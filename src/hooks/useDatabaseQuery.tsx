import { useCallback, useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../App";
import { useYear } from "../context/YearContextType";

export interface IDatabaseQuery{
    //year: string;
    //typeInvoice: string;
     //amount: number;
    //amount?: string;

}


// const useDataBaseQuery  = (year: string | number, typeInvoice: string, other1?: string, other2?: string | boolean) => {
    const useDataBaseQuery  = (typeInvoice: string, other1?: string, other2?: string | boolean) => {

    const {currentUser} = useContext(UserContext);
    const { editedYear } = useYear();
    const editedYearNum = parseInt(editedYear)
    const [dataFromBase, setDataFromBase] = useState({})


    const userId = currentUser?.uid;

    //const year = props.year;
    //const type = props.type;

    //console.log('tear',year,typeInvoice)
    //console.log("other1",other1)
    
    useEffect(() => {
        readingFromBase();
     },[currentUser,editedYear])

    const readingFromBase = useCallback(async()=>{

        try {
            const userCollectionRef = collection(db, `${userId}`);
        
            if(other1){
                const q = query(userCollectionRef,
                where("year", "==", editedYearNum),
                where(`${other1}`, "==", other2),
                 where("type", "==", `${typeInvoice}`)   
                )
                let newData: any = {}
                const querySnapshot1 = await getDocs(q);
                querySnapshot1.forEach((doc) => {
                  // doc.data() is never undefined for query doc snapshots
                 // console.log("nasz rok",doc.id, " => ", doc.data());
                  newData[doc.id] = { ...doc.data(), itid: doc.id };
                });
                setDataFromBase(newData)
       // console.log("ta wybrano")
            } else
            {  
                const q = query(userCollectionRef, 
                // where("year", "==", `${year}`),
                // where("type", "==", `${typeInvoice}`)
                where("year", "==", editedYearNum),
                where("type", "==", `${typeInvoice}`),
              
                )

                let newData: any = {}
                const querySnapshot1 = await getDocs(q);

             
                querySnapshot1.forEach((doc) => {
                  // doc.data() is never undefined for query doc snapshots
                  //console.log("nasz rok",doc.id, " => ", doc.data());
                  newData[doc.id] = { ...doc.data(), itid: doc.id };
                });
                setDataFromBase(newData)
               // console.log("zwykla wybrano")
           }


             } catch (error) {
              console.log(error)
             }
              
                  
             },[setDataFromBase, dataFromBase,userId,editedYear])
        


            // console.log('dataFromBase',dataFromBase) 


//const b = "alo";
    return dataFromBase
}

export default useDataBaseQuery

