import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../App";
import { UserContext } from '../../context/UserContext';
import { useCallback, useContext, useEffect } from "react";
export interface IMonthDisplay {
    year: string;
    month: string;
}

const MonthDisplay: React.FunctionComponent<IMonthDisplay> =() => {

    const {currentUser} = useContext(UserContext);
    const userId = currentUser?.uid
 

    useEffect(()=>{
        readingFromBase()
      },[currentUser])
      
    //odczyt z bazy
    const readingFromBase = useCallback(async()=>{
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
        });
 


    },[userId])
        //potem ten

    const q = query(collection(db, `${userId}`),
     where("year", "==", 2024),
     where("month", "==", "March")
     );
     //oddzielny komponent kßóry analizuje kazde pole ?
     //przy zapisywaniu faktury niech stworzy nowy year do select
     //sprawdza ile jest róznych

  



    return(<div>MonthDisplay</div>)
}

export default MonthDisplay;