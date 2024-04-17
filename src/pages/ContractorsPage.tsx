import Contractors from "../components/display/Contractors";
import ContractorsForm from "../forms/ContractorsForm";

export interface IContractorsPage{}

const ContractorsPage: React.FunctionComponent<IContractorsPage> =() => {

return(<div>

<ContractorsForm/>
<br></br>
<Contractors/>
</div>)
}

export default ContractorsPage;