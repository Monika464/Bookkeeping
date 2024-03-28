import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../App";
import { UserContext } from '../../context/UserContext';
import { useCallback, useContext, useEffect } from "react";
export interface IMonthDisplay {
    year: string;
    month: string;
}

const MonthDisplay: React.FunctionComponent<IMonthDisplay> =(props) => {

    const {currentUser} = useContext(UserContext);
    const userId = currentUser?.uid
    //const invoiceQuery = query(citiesRef, where("state", "==", "CA"));

    //option powinna być tworzona automatycznie na podstawie odczytu z bazy
    //zrob sciaganie z bazy userid i zeby wyswietlało wszystkie dokumenty czyli lata
    //daj możliwośc wybory tego lata
    //zrob przycisk wybierz miesiace
//albo kopakaz caly rok 
//wyswietla wszystkie faktury kosztowe osobno zyski 

    //pod przycieskiem select z miesiącami z bazy
    //select wybiera kokretny mescia
    // i uruchamia wyswietlanie sumy kosztów i zysków
    //jak i wszystkich faktór podzielonych na  kosztowe i zyskowe jak w kalendarzu


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
    // const querySnapshot = await getDocs(collection(db, `${userId}`));
    // querySnapshot.forEach((doc) => {
    //    console.log(doc.id, " => ", doc.data());
    // })  


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