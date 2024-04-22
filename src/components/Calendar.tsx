
import React, { useState } from "react";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Form1 from "../forms/Form1";
import { format } from "date-fns";
import { pl } from "date-fns/locale";
import DayExpenses from "./display/DayExpenses";
import Form3 from "../forms/Form3";
import DayIncomes from "./display/DayIncomes";
import CheckForDuplicates from "./display/CheckForDuplicate";

export type Value = Date | string
// export type ValuePiece = Date | string | null;
//export type Value = ValuePiece | [ValuePiece, ValuePiece];

const CalendarElement: React.FunctionComponent =() => {
    const [value, setValue] =  useState<Value>(new Date());
 
    const [chosenDay, setChosenDay] = useState<Value>();
   
    const handleDayClick = (elem: string | Date) => {
      
        setChosenDay(elem);
       setValue(elem);
        
        //setChosenDay(value instanceof Date ? value : null)   
    };



    return (
        <div>
             
             <br></br>
            <Calendar onChange={()=> handleDayClick} value={value} onClickDay={handleDayClick} />

            {chosenDay && (
               
               <div>
                <br></br> <br></br>
                 {`${format(chosenDay, 'do LLLL yyyy', {locale: pl})}`}
                <br></br> <br></br>
                Koszty
                {/* 'tu sie z bazy maja wyswietlac koszty dla tego dnia' */}
               <DayExpenses thisDay={value}/>
                <br></br>
                <Form1 thisDay={value}/>
                {/* <button onClick={sendSelectedDateExpense}>Send</button> */}
                <br></br><br></br>
               
                 Przychody
                 <DayIncomes thisDay={value}/>
                 <br></br>
                 <Form3 thisDay={value}/>
                 <br></br><br></br>
                 {/* <button onClick={sendSelectedDateIncome}>Send</button> */}
                 </div>
            )}

<CheckForDuplicates year={undefined} type={""} amount={""} category={""} day={0} description={""} id={0} invoiceName={""} invoiceNum={""} itid={""} month={""} paid={false} paymentForm={""} sellerName={""}/>

        </div>
    );
}

export default CalendarElement;



// //https://www.npmjs.com/package/react-calendar