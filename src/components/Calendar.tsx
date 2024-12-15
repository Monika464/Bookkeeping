import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Form1 from "../forms/Form1";
import { format } from "date-fns";
import { enUS, pl } from "date-fns/locale";
import DayExpenses from "./display/DayExpenses";
import Form3 from "../forms/Form3";
import DayIncomes from "./display/DayIncomes";
import CheckForDuplicates from "./display/CheckForDuplicate";
import { useLanguage } from "../context/LanguageContext.tsx";
import translations from "./calendar-translations.ts";

export type Value = Date | string;
// export type ValuePiece = Date | string | null;
//export type Value = ValuePiece | [ValuePiece, ValuePiece];

const CalendarElement: React.FunctionComponent = () => {
  const { currentLanguage } = useLanguage();
  const t = translations[currentLanguage as "en" | "pl"];
  const locale = currentLanguage === "pl" ? pl : enUS;

  const [value, setValue] = useState<Value>(new Date());

  const [chosenDay, setChosenDay] = useState<Value>();

  const handleDayClick = (elem: string | Date) => {
    setChosenDay(elem);
    setValue(elem);

    //setChosenDay(value instanceof Date ? value : null)
  };

  return (
    <div>
      <br></br>
      <Calendar
        onChange={() => handleDayClick}
        value={value}
        onClickDay={handleDayClick}
      />

      {chosenDay && (
        <div>
          <br></br> <br></br>
          {`${format(chosenDay, "do LLLL yyyy", { locale })}`}
          <br></br> <br></br>
          {t.expenses}
          {/* 'tu sie z bazy maja wyswietlac koszty dla tego dnia' */}
          <DayExpenses thisDay={value} />
          <br></br>
          <Form1 thisDay={value} />
          {/* <button onClick={sendSelectedDateExpense}>Send</button> */}
          <br></br>
          <br></br>
          {t.incomes}
          <DayIncomes thisDay={value} />
          <br></br>
          <Form3 thisDay={value} />
          <br></br>
          <br></br>
          {/* <button onClick={sendSelectedDateIncome}>Send</button> */}
        </div>
      )}

      <CheckForDuplicates
        year={undefined}
        type={""}
        amount={""}
        category={""}
        day={0}
        description={""}
        id={0}
        invoiceName={""}
        invoiceNum={""}
        itid={""}
        month={""}
        paid={false}
        paymentForm={""}
        sellerName={""}
      />
    </div>
  );
};

export default CalendarElement;

// //https://www.npmjs.com/package/react-calendar
