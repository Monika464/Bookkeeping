import BalanceAP from "../components/display/BalanceAP";
import BalanceExtraInfo from "../components/display/Amortization";
import { YearSelector } from "../context/YearContextType";
import CashForm from "../forms/CashForm";
import FormLoansCredits from "../forms/FormLoansCredits";
import FormMoneyResultStart from "../forms/FormMoneyResultStart";
import { useYear } from "../context/YearContextType";
import useDataBaseQuery from "../hooks/useDatabaseQuery";
import Amortization from "../components/display/Amortization";
import AssetsForAmortisation from "../forms/AssetsForAmortisation";
import IncomeLoan from "../forms/IncomeLoan";
import ExtraObligationForm from "../forms/ExtraObligationForm";
import ProfitLossAccount from "../components/display/ProfitLossAccount";

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
<CashForm/>
<br></br><br></br>
        <AssetsForAmortisation/>
        <br></br><br></br>
      <IncomeLoan/>
      <br></br><br></br>
      <ExtraObligationForm/>
        <br></br><br></br>
        <ProfitLossAccount/>
        {/* <FormMoneyResultStart/>
        <BalanceAP/> */}
        
    </div>)
}

export default Balance;