
import CheckForDuplicates from "../components/display/CheckForDuplicate";

export interface ICalendar{}

const CalendarPage: React.FunctionComponent<ICalendar> =() => {

    console.log("czy to ta strona")

    return(<div>

 {/* <CalendarElement/> */}
hej
<br></br>
    <CheckForDuplicates year={undefined} type={""} amount={""} category={""} day={0} description={""} id={0} invoiceName={""} invoiceNum={""} itid={""} month={""} paid={false} paymentForm={""} sellerName={""}/>
    </div>)
}

export default CalendarPage;