import React, { useCallback, useContext, useEffect, useState } from "react";
import { useYear } from "../context/YearContextType";
import { collection, deleteField, doc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore";
import { db } from "../App";
import { UserContext } from "../context/UserContext";

export interface IExtraObligationProps {}

const ExtraObligationForm: React.FunctionComponent<IExtraObligationProps> = (props) => {
    const [extraobliState, setExtraobliState] = useState(0);
    const [isSend, setIssend] = useState(false);
    const [isEmptyObligation, setIsEmptyObligation] = useState(false);
    const [obligationStateInBase, setObligationStateInBase] = useState(0);

    const { editedYear } = useYear();
    const {currentUser} = useContext(UserContext);
    const uid = currentUser?.uid


    const handleExtraObligationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIssend(false)
        const totalAssets = parseInt(event.target.value);
        setExtraobliState(totalAssets);
    }

    const saveInBase = async()=>{
       
        if(editedYear){
            const itemRefI = doc(db, uid, `obligation ${editedYear}`)  
              await setDoc(itemRefI, {
                obligation: extraobliState,
                id:  `obligation ${editedYear}`
           
                })
                .then(()=>{setIssend(true)})
            }
        }  
        //DOKONCZYC WYSWIETLANIE I UKRYWANIE JAK
        //W ASSETS I SRODKI TRWALE
     
        const readOblibations =useCallback(async() =>{
            //  const itemRefI = doc(db, uid, `cash ${editedYear}`) 
              const userCollectionRef = collection(db, `${uid}`);
              const q = query(userCollectionRef,
                // where("id", "==", `assets ${editedYear}`)
                where("id", "==", `obligation ${editedYear}`)
              )
          
              let newData = {}
                      const querySnapshot1 = await getDocs(q);
                      //console.log("querySnapshot1",querySnapshot1.docs)
                     if(querySnapshot1.empty){
                        setIsEmptyObligation(true)
                     } else {
         
                      querySnapshot1.forEach((doc) => {
                          // doc.data() is never undefined for query doc snapshots
                          //console.log("nasz rok",doc.id, " => ", doc.data());
                          newData[doc.id] = { ...doc.data(), itid: doc.id };
                        });
                       // console.log("new data", newData)
                        setObligationStateInBase(newData)
                       // console.log("dataFromBaseIncLong",dataFromBaseIncLoan)
                       setIsEmptyObligation(false)
                     }
                    
          
                     
                // console.log("assetsStateInBase",assetsStateInBase)
          },[uid,editedYear])
        
          useEffect(()=>{
            readOblibations();
            
          },[uid,editedYear,readOblibations])
 
       // console.log("obligationStateInBase", setObligationStateInBase)
    
        const removeObligations =async ()=>{

          if(editedYear){
              const itemRefI = doc(db, uid, `obligation ${editedYear}`) 
          await updateDoc(itemRefI, {
              cashInHand: deleteField(),
              cashInBank: deleteField(),
              id:deleteField()
          });
      }
      
      }


    return (
        <div>
         {isEmptyObligation && <div>
          <label>
                Pozostałe zobowiazania nieuwzlędnione na liscie faktur(w tym przychody przyszłych okresów
                jak dotacje na rok przyszły)

                <input type="number" value={extraobliState} onChange={handleExtraObligationChange} />
            </label>
            <br></br>
            {extraobliState}
            <button onClick={saveInBase}>wyslij</button>
            {isSend && <p>zapisano w bazie</p>}
          </div>}  
     

            {!isEmptyObligation && <div>
              {Object.values(obligationStateInBase).map((element, index) => (
              <div key={index}>
              Pozostałe zobowiazania nieuwzlędnione na liscie faktur(w tym przychody przyszłych okresów
                jak dotacje na rok przyszły): {element.obligation}
            </div>
               ))}
               <button onClick={removeObligations}>wyczysc stan zobowiązań</button>
              </div>} 
          
        </div>
    );
}

export default ExtraObligationForm;