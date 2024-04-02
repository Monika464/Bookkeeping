import BalanceAP from "../components/display/BalanceAP";
import BalanceExtraInfo from "../components/display/BalanceExtraInfo";
import { YearSelector } from "../context/YearContextType";
import CashForm from "../forms/CashForm";
import FormLoansCredits from "../forms/FormLoansCredits";
import FormMoneyResultStart from "../forms/FormMoneyResultStart";

export interface IBalance {}

const Balance: React.FunctionComponent<IBalance> =() => {

    return(<div>Balance
<br></br><br></br>
<YearSelector/>
<br></br><br></br>

        <BalanceExtraInfo/>
        <FormLoansCredits/>
        <br></br><br></br>
        <FormMoneyResultStart/>
        <BalanceAP/>
        <CashForm/>
    </div>)
}

export default Balance;