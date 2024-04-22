import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../App";

export interface Icontractor{
  [key: string]: string | number;
  buildingNumber: string;
city: string;
companyName: string;
country: string;
flatNumber: string;
id: 1
itid: string;
nip: string;
postCode: string;
street: string;
userId: string;  
}

const useGetContractors = () => {

    const {currentUser} = useContext(UserContext);
    const userId = currentUser?.uid;
   // const { editedYear } = useYear();
    //const editedYearNum = parseInt(editedYear)
    const [contractors, setContractors] = useState({})

    try {


        const readingContractors = async()=>{
    
            let newData: any = {}
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
    
      },[userId])
        
    } catch (error) {
        console.log(error)
    }

   // console.log("contractors",contractors)
return contractors;
}

export default useGetContractors;