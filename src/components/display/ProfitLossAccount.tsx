import { useContext, useEffect, useState } from "react";
import { useYear } from "../../context/YearContextType";
import useDataBaseQuery from "../../hooks/useDatabaseQuery";
import { UserContext } from "../../context/UserContext";
import useMoneyAssetsQuery from "../../hooks/useMoneyAssetsQuery";
import useCounting from "../../hooks/useCounting";

export interface IProfitLossAccount {}

const ProfitLossAccount: React.FunctionComponent<IProfitLossAccount> =(props) => {

    //const {currentUser} = useContext(UserContext);


   // const userId = currentUser?.uid;
    const { editedYear } = useYear();
    const editedYearNum = parseInt(editedYear)
//const [yearExpenses, setYearExpenses] = useState(0);
//const [yearIncomes, setYearIncomes] = useState(0);

    //const dane = useDataBaseQuery(editedYearNum,"expenses","paymentForm","gotowka");
    const dane = useDataBaseQuery("expenses","paymentForm","gotowka");
   // console.log("daneGotowq",dane)
    const daneprzel = useDataBaseQuery("expenses","paymentForm","przelew");
    //console.log("daneprzel",daneprzel)
    const danepPrzychInne = useDataBaseQuery("incomes","source","inne");
   // console.log("danepPrzychInne",danepPrzychInne)
    // const daneNieoplKoszty = useDataBaseQuery("expenses","paid","false");
    // console.log("daneNieoplKoszty",daneNieoplKoszty)

const yearExpense = useDataBaseQuery("expenses");
const yearIncome = useDataBaseQuery("incomes");
console.log("yearExpenses",yearExpense)

const yearExpenses = useCounting(yearExpense);
const yearIncomes = useCounting(yearIncome);
const yearResult = yearIncomes - yearExpenses;

   


 //ANALIZA PRZYCHODOW
 const dotacje  = useDataBaseQuery("incomes","source","dotacje");
 const skladki  = useDataBaseQuery("incomes","source","skladki");
 const darowizny  = useDataBaseQuery("incomes","source","darowizmy");
const inne = useDataBaseQuery("incomes","source","inne");

const yearDotacje = useCounting(dotacje);
const yearSkladki = useCounting(skladki);
//const yeardarowizny = // dokoncz to 

    const inneDane1 = useMoneyAssetsQuery("cash");
    const inneDane2 = useMoneyAssetsQuery("assets");
    const inneDane3 = useMoneyAssetsQuery("obligation")
    // console.log("inneDane1",inneDane1);
    // console.log("inneDane2",inneDane2)
    // console.log("inneDane3",inneDane3)


    //  A. Przychody z działalności statutowej
    // dotacje
    //składki
    //darowizny
    //pozostale

    //B. Koszty działalności statutowej
    // wszystkie koszty
    //podzielone na usługi i administracyjne

    // C. Zysk (strata) z działalności statutowej (A-B)




    
   console.log("dotacje",dotacje) 
    
    
    return(<div style={{fontSize: 20}}>ProfitLossAccount
        <br></br><br></br>
        Wynik: {yearResult}
        <br></br>
        Z czego
        <h2>Przychody </h2>
        <br></br>
        <p>Z dotacji: {yearDotacje}zł</p>
        <p>Ze składek: {yearSkladki}zł</p>

    </div>)
}

export default ProfitLossAccount;


