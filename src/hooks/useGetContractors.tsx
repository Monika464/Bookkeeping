import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { useYear } from "../context/YearContextType";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../App";


const useGetContractors = () => {

    const {currentUser} = useContext(UserContext);
    const userId = currentUser?.uid;
    const { editedYear } = useYear();
    const editedYearNum = parseInt(editedYear)
    const [contractors, setContractors] = useState({})

    try {


        const readingContractors = async()=>{
    
            let newData = {}
            const querySnapshot = await getDocs(collection(db, `${userId}contractors`));
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          //console.log(doc.id, " => ", doc.data());
          newData[doc.id] = { ...doc.data(), itid: doc.id };
          setContractors(newData);
        });
    
        }
      useEffect(()=>{
        readingContractors()
   // console.log("contractors",contractors)
      },[userId])
        
    } catch (error) {
        console.log(error)
    }
return contractors;
}

export default useGetContractors;