
import useDataBaseQuery from "../../hooks/useDatabaseQuery";
import useCounting from "../../hooks/useCounting";

export interface IProfitLossAccount {}

const ProfitLossAccount: React.FunctionComponent<IProfitLossAccount> =() => {

    //const {currentUser} = useContext(UserContext);


   // const userId = currentUser?.uid;
   // const { editedYear } = useYear();
   // const editedYearNum = parseInt(editedYear)
//const [yearExpenses, setYearExpenses] = useState(0);
//const [yearIncomes, setYearIncomes] = useState(0);

    //const dane = useDataBaseQuery(editedYearNum,"expenses","paymentForm","gotowka");
   // const dane = useDataBaseQuery("expenses","paymentForm","gotowka");
   // console.log("daneGotowq",dane)
    //const daneprzel = useDataBaseQuery("expenses","paymentForm","przelew");
    //console.log("daneprzel",daneprzel)
    //const danepPrzychInne = useDataBaseQuery("incomes","source","inne");
   // console.log("danepPrzychInne",danepPrzychInne)
    // const daneNieoplKoszty = useDataBaseQuery("expenses","paid","false");
    // console.log("daneNieoplKoszty",daneNieoplKoszty)

const yearExpense = useDataBaseQuery("expenses");
const yearIncome = useDataBaseQuery("incomes");
//console.log("yearExpenses",yearExpense)

const yearExpenses = useCounting(yearExpense);
const yearIncomes = useCounting(yearIncome);
const yearResult = yearIncomes - yearExpenses;

   


 //ANALIZA PRZYCHODOW
 const dotacje  = useDataBaseQuery("incomes","source","dotacje");
 const skladki  = useDataBaseQuery("incomes","source","skladki");
 const darowizny  = useDataBaseQuery("incomes","source","darowizmy");
const inne = useDataBaseQuery("incomes","source","inne");

const uslugi = useDataBaseQuery("expenses","category","service");
const administracja = useDataBaseQuery("expenses","category","administration");

const yearDotacje = useCounting(dotacje);
const yearSkladki = useCounting(skladki);
const yearDarowizny = useCounting(darowizny); 
const yearInne = useCounting(inne);
const yearUslugi = useCounting(uslugi);
const yearAdministration = useCounting(administracja);


    
    
    //return(<div style={{fontSize: 20}}>
        return(<div>
        <h1>Informacja dodatkowa do bilansu</h1>
        <br></br><br></br>
        Wynik: {yearResult}
        <br></br>
        Z czego
        <h3>A. Przychody z działalności statutowej</h3>
        <br></br>
        <p>Z dotacji: {yearDotacje}zł</p>
        <p>Ze składek: {yearSkladki}zł</p>
        <p>Z darowizn: {yearDarowizny}zł</p>
        <p>Inne: {yearInne}zł</p>
        <br></br>
        <h3>B. Koszty działalności statutowej</h3>
        <p>Wszystkie koszty: {yearExpenses}zł</p>
        z czego:
        <p> koszty zadań: {yearUslugi}zł</p>
        <p>koszty administracyjne {yearAdministration}zł</p>
        <br></br>
        <h3>C. Zysk (strata) z działalności statutowej (A-B)</h3>
        {(yearIncomes - yearExpenses) >= 0 ? `zysk ${yearIncomes - yearExpenses}zł` : `strata ${yearIncomes - yearExpenses}zł` }
        <br></br>
    </div>)
}

export default ProfitLossAccount;


