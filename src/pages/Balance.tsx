import BalanceExtraInfo from "../components/display/BalanceExtraInfo";
import FormLoansCredits from "../forms/FormLoansCredits";

export interface IBalance {}

const Balance: React.FunctionComponent<IBalance> =() => {

    return(<div>Balance

        <BalanceExtraInfo/>
        <FormLoansCredits/>
    </div>)
}

export default Balance;