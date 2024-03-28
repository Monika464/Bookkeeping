import BalanceExtraInfo from "../components/display/BalanceExtraInfo";

export interface IBalance {}

const Balance: React.FunctionComponent<IBalance> =() => {

    return(<div>Balance

        <BalanceExtraInfo/>
    </div>)
}

export default Balance;