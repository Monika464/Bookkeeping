import { collection, getDocs } from "firebase/firestore";
import { db } from "../App";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";

const useYearForContext= () => {
    const [years, setYears] = useState([]);
    const { currentUser } = useContext(UserContext);
    const userId = currentUser?.uid;
    
    const readBase = async () => {
        const querySnapshot = await getDocs(collection(db, `${userId}`));
        let uniqueYears = new Set(); // Używamy Set do przechowywania unikalnych wartości roku
        
        querySnapshot.forEach((doc) => {
            const { year } = doc.data();
            if (year !== undefined) {
                uniqueYears.add(year);
            }
           
        });
//console.log("uniqueYears",uniqueYears)
        setYears(Array.from(uniqueYears)); // Konwertujemy Set z powrotem na tablicę i ustawiamy stan
    }

    useEffect(() => {
        readBase();
    }, [userId]);

    return years;
}

export default useYearForContext;


// import { collection, getDocs } from "firebase/firestore";
// import { db } from "../App";
// import { useContext, useEffect, useState } from "react";
// import { UserContext } from "../context/UserContext";

// const useYearForContext= () => {
//     const [dataFromBase, setDataFromBase] = useState({})
//     const {currentUser} = useContext(UserContext);
//     const userId = currentUser?.uid;
    
//     const readBase = async()=>{
    
//         let newData = {}
//         const querySnapshot = await getDocs(collection(db, `${userId}`));
//     querySnapshot.forEach((doc) => {
//       // doc.data() is never undefined for query doc snapshots
//       //console.log(doc.id, " => ", doc.data());
//       newData[doc.id] = { ...doc.data(), itid: doc.id };
//       setDataFromBase(newData);
//     });

//     }

//     useEffect(()=>{
//         readBase()
//     //


//       },[userId])

// return dataFromBase
//     }

//     export default useYearForContext