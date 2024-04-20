import CalendarElement from "../components/Calendar";
import Calendar from "../components/Calendar";
import CheckForDuplicates from "../components/display/CheckForDuplicate";

export interface ICalendar{}

const CalendarPage: React.FunctionComponent<ICalendar> =() => {

    console.log("czy to ta strona")

    return(<div>

 {/* <CalendarElement/> */}
hej
<br></br>
    <CheckForDuplicates/>
    </div>)
}

export default CalendarPage;