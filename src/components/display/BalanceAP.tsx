import { useEffect, useState } from "react";
import useMoneyAssetsQuery from "../../hooks/useMoneyAssetsQuery";
import useDataBaseQuery from "../../hooks/useDatabaseQuery";
import useCounting from "../../hooks/useCounting";

export interface IBalanceAP{}

const BalanceAP: React.FunctionComponent<IBalanceAP> = (props) => {

    const [totalCash, setTotalCash] = useState(0);
    const [totalAssets, setTotalAssets] = useState(0);
    //const [totalObligation, setTotalObligation] = useState(0);

    const assets = useMoneyAssetsQuery("assets");
    const cash = useMoneyAssetsQuery("cash");
    //const obligation = useMoneyAssetsQuery("obligation");
    //dodac cash skad sie wzial 

    const zaplacone = useDataBaseQuery("expenses","paid",true);
    const niezaplacone = useDataBaseQuery("expenses","paid",false);
   // const naleznosci = useDataBaseQuery("incomes","paid",false);
    const przychody = useDataBaseQuery("incomes");
    const koszty = useDataBaseQuery("expenses")
   const pozyczki = useDataBaseQuery("incomes","loan",true);

   //console.log("pozyczki",pozyczki)

    const yearZaplacone = useCounting(zaplacone);
    const yearNiezaplacone = useCounting(niezaplacone);
    //const yearNaleznosci = useCounting(naleznosci);
    const yearPrzychody = useCounting(przychody);
    const yearKoszty = useCounting(koszty);
    const yearPozyczki = useCounting(pozyczki);

  // console.log("niezaplacone",niezaplacone)

    const sumuOfCash =()=>{
        //let totalCash = 0;
        Object.values(cash).forEach((exp, index) => {   
            setTotalCash(exp.cashInBank + exp.cashInHand)
        })
    }

    const stateOfAssets = ()=>{
        Object.values(assets).forEach((exp, index) => {   
            setTotalAssets(exp.assetsextra)
        })
    }

    // const stateOfObligations =()=>{
    //     Object.values(obligation).forEach((exp, index) => {   
    //         setTotalObligation(exp.obligation)
    //        // console.log("exp",exp.obligation)
    //     })

    // }

    useEffect(()=>{    
        sumuOfCash();
        stateOfAssets();
        //stateOfObligations();
    },[cash,assets])

//zapasy czyli kosztowe faktury zapłacone
//kosztowe faktury niezaplacome
//do pasywow zobowiazan


//console.log("totcash",totalCash)
    // let totalExpenses = 0;
    // Object.values(datafromBase).forEach((exp, index) => {
    //    // console.log("suma wydatków", exp.amount);
    //     totalExpenses += parseFloat(exp.amount);
    //    // setYearExpenses((prevState) => prevState + exp.amount);
    // });
  
    // return totalExpenses;

    //srodki trwale śa z assets
    //srodki finansowe w kasie i na rachunku

    
    //znajdz wszytskie expenses opłacone 
    //to beda zapasy w akt obrotowych

    //DODAJ:
//incomes nieoplacone czyli naleznosci

///PASYWA FUNDUSZ WLASNY 
//suma przychodów to fundusz statutowy


    //nieopłacone faktury kosztowe 
    //plus obligation jesli sa
    // to zadluzenie czyli zobowiązania

    //do tego zysk lub strata
 
    //w kapital wlsny
    //srodki trwale
    //


    //

    return(<div>
        <br></br>
        <h1>Bilans</h1>
        <h2>AKTYWA</h2>
        <p>Srodki trwałe:{totalAssets} zł</p>
        <p>Srodki pieniężne:{totalCash} zł </p>
        <p>Zapasy:{yearPrzychody + yearPozyczki}zł</p>
        {/* <p>Naleznosci: {yearNaleznosci}</p> */}
        <br></br>
        <h2>PASYWA </h2>
        <p>Fundusz statutowy: {yearZaplacone  + totalAssets +totalCash }</p>
        <p>Zobowiazania:{ yearNiezaplacone + yearPozyczki}</p> 
        <p>Wynik: {yearPrzychody - yearKoszty }</p>

<h2>Suma Bilansowa</h2>
<p>Aktywa {totalAssets + totalCash + yearPrzychody + yearPozyczki}</p>
<p>Pasywa { yearZaplacone + totalAssets + totalCash + yearNiezaplacone + yearPozyczki + (yearPrzychody - yearKoszty) }</p>

    </div>)
}  

export default BalanceAP;
