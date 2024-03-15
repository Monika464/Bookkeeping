
import React, { useState } from "react";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Form1 from "../forms/Form1";

export interface ICalendarProps {};

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const CalendarPage: React.FunctionComponent<ICalendarProps> =() => {
    const [value, onChange] = useState<Value>(new Date());
    const [chosenDay, setChosenDay] = useState<ValuePiece>();

    const saveToDatabase = (selectedDate: ValuePiece) => {
        // Tutaj można dodać kod odpowiedzialny za zapisanie daty w bazie danych
        // W tym przykładzie użyjemy prostego alertu, aby pokazać, że data została zapisana
        alert(`Wybrana data: ${selectedDate}`);
    };

    const handleDayClick = (value: ValuePiece) => {
        setChosenDay(value);
    };

    const sendSelectedDate = () => {
        if (chosenDay !== undefined && chosenDay !== null) {
            saveToDatabase(chosenDay);
        }
    };

    return (
        <div>
            <Calendar onChange={onChange} value={value} onClickDay={handleDayClick} />
            {chosenDay && (
               <div>
                Koszty
                {/* 'tu sie z bazy maja wyswietlac' */}
                <br></br>
                <Form1 thisDay={value}/>
                <button onClick={sendSelectedDate}>Send</button>
                <br></br><br></br>
               
                 Przychody
                 {/* 'tu sie z bazy maja wyswietlac' */}
                 <Form1 thisDay={value}/>
                 <button onClick={sendSelectedDate}>Send</button>
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