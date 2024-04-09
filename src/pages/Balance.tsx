import BalanceAP from "../components/display/BalanceAP";
import BalanceExtraInfo from "../components/display/Amortization";
import { YearSelector } from "../context/YearContextType";
import CashForm from "../forms/CashForm";
import FormLoansCredits from "../forms/FormLoansCredits";
import FormMoneyResultStart from "../forms/FormMoneyResultStart";
import { useYear } from "../context/YearContextType";
import useDataBaseQuery from "../hooks/useDatabaseQuery";
import Amortization from "../components/display/Amortization";

export interface IBalance {}

const Balance: React.FunctionComponent<IBalance> =() => {
    const { editedYear } = useYear();
    const editedYearNum = parseInt(editedYear)
    const dataFromBaseE = useDataBaseQuery(editedYearNum,"expenses");
    const dataFromBaseI = useDataBaseQuery(editedYearNum,"incomes");
    const dataFromBaseLongTermE = useDataBaseQuery(editedYearNum,"expenses","longTerm",true);
    const dataFromBaseLongTermI = useDataBaseQuery(editedYearNum,"incomes","longTerm",true);

   // console.log("dataFromBaseE",dataFromBaseE)
    return(<div>Balance
<br></br><br></br>
<YearSelector/>
<br></br><br></br>

        <Amortization/>
        <FormLoansCredits  />
        <br></br><br></br>
        <FormMoneyResultStart/>
        <BalanceAP/>
        <CashForm/>
    </div>)
}

export default Balance;