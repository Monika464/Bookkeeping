import React, { useCallback, useContext, useEffect, useState } from "react";
import { useYear } from "../context/YearContextType";
import { collection, deleteField, doc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore";
import { db } from "../App";
import { UserContext } from "../context/UserContext";
import ShowData from "../components/ShowData";
import { is } from "date-fns/locale/is";

export interface IAssetsForAmortisationProps {}

const AssetsForAmortisation: React.FunctionComponent<IAssetsForAmortisationProps> = (props) => {
    const [assetsState, setAssetsState] = useState(0);
    const [assetsStateInBase, setAssetsStateInBase] = useState(0);
    const [isSend, setIssend] = useState(false)
    const { editedYear } = useYear();
    const {currentUser} = useContext(UserContext);
    const uid = currentUser?.uid
    const editedYearNum = parseInt(editedYear);
    const [isEmptyAsset, setIsEmptyAsset] = useState(false);

    const handleTotalAssetsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIssend(false)
        const totalAssets = parseInt(event.target.value);
        setAssetsState(totalAssets);
    }

    const saveInBase = async()=>{
       
        if(editedYear){
            const itemRefI = doc(db, uid, `assets ${editedYear}`)  
              await setDoc(itemRefI, {
                assetsextra: assetsState,
                id: `assets ${editedYear}`
                })
                .then(()=>{setIssend(true)})
            }
        }  


        const readAssets =useCallback(async() =>{
            //  const itemRefI = doc(db, uid, `cash ${editedYear}`) 
              const userCollectionRef = collection(db, `${uid}`);
              const q = query(userCollectionRef,
                // where("id", "==", `assets ${editedYear}`)
                where("id", "==", `assets ${editedYear}`)
              )
          
              let newData = {}
                      const querySnapshot1 = await getDocs(q);
                     if(querySnapshot1.empty){
                        setIsEmptyAsset(true)
                     } else {
          
                      querySnapshot1.forEach((doc) => {
                          // doc.data() is never undefined for query doc snapshots
                          //console.log("nasz rok",doc.id, " => ", doc.data());
                          newData[doc.id] = { ...doc.data(), itid: doc.id };
                        });
                       // console.log("new data", newData)
                        setAssetsStateInBase(newData)
                       // console.log("dataFromBaseIncLong",dataFromBaseIncLoan)
                       setIsEmptyAsset(false)
                     }
                    
          
                     
                // console.log("assetsStateInBase",assetsStateInBase)
          },[uid,editedYear])
        
          useEffect(()=>{
            readAssets();
            
          },[uid,editedYear,readAssets])

          //console.log("assetsStateInBase",assetsStateInBase)
          
          const removeAssets =async ()=>{

            if(editedYear){
                const itemRefI = doc(db, uid, `assets ${editedYear}`) 
            await updateDoc(itemRefI, {
              assetsextra: deleteField(),
                id:deleteField()
            });
        }
        
        }
    
    return (
        <div>

          {isEmptyAsset && <div>
           
            <label>
                Srodki trwałe (po amortyzacji jeśli dotyczy)
                <input type="number" value={assetsState} onChange={handleTotalAssetsChange} />
            </label>
            <br></br>
            {assetsState}
            <button onClick={saveInBase}>wyslij</button>
            {isSend && <p>zapisano w bazie</p>}
            {/* {assetsStateInBase} */}
            </div>}
           
            {!isEmptyAsset && <div>
              
    {Object.values(assetsStateInBase).map((element, index) => (
      <div key={index}>
        Srodki trwałe (po amortyzacji jeśli dotyczy): {element.assetsextra}
        </div>
     ))}

<button onClick={removeAssets}>wyczysc stan środków trwałych</button>
              </div>}
        </div>
    );
}

export default AssetsForAmortisation;