import useQuerySrodkiTrwale from "../../hooks/useQuerySrodkiTrwale";
import useQueryToBase from "../../hooks/useQuerySrodkiTrwale";

export interface IBalanceExtraInfoProps {

}

const BalanceExtraInfo: React.FunctionComponent<IBalanceExtraInfoProps> =(props) => {

const dataFromSrodkiTrwaleMod = useQuerySrodkiTrwale();
//dataFromSrodkiTrwale.map((el)=>{console.log("hej",el)})
console.log("mapoa", dataFromSrodkiTrwaleMod)

//koszty podzielic na dzialnosc odpłatna, nieodplatna





//wyszukac zakupy drozsze niz 10 000, 
//query z bazy na > 10000;
//potem zmapowac tablice
//do kazdego przycisk 'amortyzacja'
//formularz wartość na ostatni dzien bilansu
//czy zanotowac amortyzacje
//wartosc przedmiotu w ostanim dniu bilansowym

//zakup za wlasne srodki czy kredyt
//czy kredyt dluzszy niz 12mcs
//bedzie do zobowiązań

//czy pozyczki ma do spłaty lub inne zobowiazania
// dluzszy niz 12mcs 


//ilosc pieniedzy na koncie
//ilosc piniędzy w kasie 
//lub zadłużenie
//w dniu rozpoczynajacym bilans

//bilans

//wszystkie koszty to aktywa obrotowe
//podzial na dzialnosci i administracyjne

//pasywa zysk strata z ubiegłego roku 

//zysk strata z tego roku









    return(<div>BalanceExtraInfo


    </div>)
}

export default BalanceExtraInfo;