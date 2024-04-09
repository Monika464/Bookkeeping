import { useCallback, useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/UserContext';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../App';
import { useYear } from '../context/YearContextType';

export interface IQuerySrodkiTrwale{
    year?: string;
    type?: string;
     amount: number;
    //amount?: string;

}


const useQuerySrodkiTrwale = () => {

    const {currentUser} = useContext(UserContext);

    const [dataFromSrodkiTrwale, setDataFromSrodkiTrwale] = useState({})
    const [dataFromSrodkiTrwaleMod, setDataFromSrodkiTrwaleMod] = useState({})
    const userId = currentUser?.uid;

    const { editedYear } = useYear();
    const editedYearNum = parseInt(editedYear)  
    //console.log("editedYearNum",editedYearNum)

    useEffect(() => {
        readingFromBase();
     },[currentUser,editedYear])
     

    const readingFromBase = useCallback(async()=>{

        try {
            const collRef = collection(db, `${userId}`);

            //const numAmount = parseFloat("10000");

    const q = query(collRef, 
        // where("year", "==", 2024),
        where("year", "==", editedYearNum),
        where("type", "==", "expenses"),
        // where("amount", ">", parseFloat("10000"))
        where("amount", ">", "10000")
        );
        let newData= {}

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
         //console.log("nasz rok",doc.id, " => ", doc.data());
          newData[doc.id] = { ...doc.data(), itid: doc.id };
        });
        setDataFromSrodkiTrwale(newData)

            
        } catch (error) {
            console.log(error)
        }
    
    },[setDataFromSrodkiTrwale, userId,editedYearNum])

    useEffect(()=>{
        let temp = []

        Object.values(dataFromSrodkiTrwale)
        .map((item, index) => {
    //console.log("item",item.amount)
    
    if(item.amount > 10000){
    temp.push(item)
    }
 
        })

        //console.log("temp",temp);
        setDataFromSrodkiTrwaleMod(temp)
    },[readingFromBase,userId, dataFromSrodkiTrwale,editedYearNum])

    //console.log("srodki do amor",dataFromSrodkiTrwaleMod)
    
 


    return dataFromSrodkiTrwaleMod;
}

export default useQuerySrodkiTrwale;