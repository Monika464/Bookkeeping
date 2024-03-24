
import React, { useState } from "react";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Form1 from "../forms/Form1";
import { format } from "date-fns";
import { pl } from "date-fns/locale";
import DayExpenses from "./display/DayExpenses";
import Form3 from "../forms/Form3";
import DayIncomes from "./display/DayIncomes";

export interface ICalendarProps {};

export type ValuePiece = Date | null;
//type ValuePiece = Date;

export type Value = ValuePiece | [ValuePiece, ValuePiece];

const CalendarPage: React.FunctionComponent<ICalendarProps> =() => {
    const [value, onChange] = useState<Value>(new Date());
    const [chosenDay, setChosenDay] = useState<ValuePiece>();

  //console.log("hej", format(value, 'do LLLL yyyy', {locale: pl}))  
    // console.log("typeV",typeof(value))
    // const today = new Date();
    //console.log("today",typeof(today))

    const saveToDatabase = (selectedDate: ValuePiece) => {
        // Tutaj można dodać kod odpowiedzialny za zapisanie daty w bazie danych
        // W tym przykładzie użyjemy prostego alertu, aby pokazać, że data została zapisana
        alert(`Wybrana data: ${selectedDate}`);
    };

    const handleDayClick = (value: ValuePiece) => {
        setChosenDay(value);
    };

    const sendSelectedDateExpense = () => {
        if (chosenDay !== undefined && chosenDay !== null) {
            saveToDatabase(chosenDay);
        }
    };

    const sendSelectedDateIncome = () => {
        if (chosenDay !== undefined && chosenDay !== null) {
            saveToDatabase(chosenDay);
        }
    };

    //console.log("chosenDay",typeof(chosenDay))
    //console.log("chosenDay2",new Date(chosenDay?.getTime()))
    //to jest format daty

    return (
        <div>
            <Calendar onChange={onChange} value={value} onClickDay={handleDayClick} />
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
                 {/* 'tu sie z bazy maja wyswietlac' */}
                 <Form3 thisDay={value}/>
                 {/* <button onClick={sendSelectedDateIncome}>Send</button> */}
                 </div>
            )}
        </div>
    );
}

export default CalendarPage;

// import { useState } from "react";
// import Calendar from 'react-calendar'
// import 'react-calendar/dist/Calendar.css';

// export interface ICalendarProps {};

// type ValuePiece = Date | null;

// type Value = ValuePiece | [ValuePiece, ValuePiece];

// const CalendarPage: React.FunctionComponent<ICalendarProps> =() => {
//     const [value, onChange] = useState<Value>(new Date());
//     const [chosenDay, setChosenDay] = useState<number>()
//     console.log("value", value)

// return( <div>
//     <Calendar onChange={onChange} value={value} />
 
//   </div>)
// }

// export default CalendarPage;


//https://www.npmjs.com/package/react-calendar