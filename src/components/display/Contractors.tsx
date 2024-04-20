import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";

import {  deleteDoc, doc} from "firebase/firestore";
import { db } from "../../App";
import useGetContractors from "../../hooks/useGetContractors";
import { useNavigate } from "react-router-dom";

export interface IContractorsProps {
};

const Contractors : React.FunctionComponent<IContractorsProps> =(props) =>{
     const {currentUser} = useContext(UserContext);
    const userId = currentUser?.uid;
    // const { editedYear } = useYear();
    // const editedYearNum = parseInt(editedYear)
    // const [contractors, setContractors] = useState({})
 const [selectedContractors, setSelectedContractors]= useState([])
const contractors = useGetContractors()
//console.log("selectedContractors",selectedContractors)
const [isEditMode, setIsEditMode] = useState(false);
//zrob wyswietlanie i delete jak w day tutaj


// Funkcja do obsługi zaznaczania i odznaczania checkboxów
const handleCheckboxChange = (e) => {
    const value = e.target.value;
   // console.log("value",value)
    if (e.target.checked) {
        setSelectedContractors([...selectedContractors, value]);
    } else {
        setSelectedContractors(selectedContractors.filter(invoice => invoice !== value));
    }
  };

  // Funkcja do zmiany nazwy przycisku delete
const getButtonLabel = () => {
    return isEditMode ? "Finish editing for delete" : "Edit for delete";
  };

    // Funkcja obsługująca kliknięcie przycisku "Delete"
    const handleDeleteClick = () => {
        // const usersCollectionRef = collection(db, `${userId}`);
         selectedContractors.map(async(item)=>{
            console.log("iterms to delete", item)
            await deleteDoc(doc(db, `${userId}contractors`, item))
           .then(()=>{console.log("sussecfuly deleted")})   
          
     })
 
       };

return(<div>Contractors

{Object.values(contractors).map((contractor, index) => (
    <div key={index}>

{isEditMode && (
            <>
        <input
          type="checkbox"
          id={`contractor-checkbox-${index}`}
          value={contractor.itid}
          onChange={handleCheckboxChange}
        />
        <label htmlFor={`invoice-checkbox-${index}`}>
          {`
           nazwa ${contractor.companyName}, adres ${contractor.street}, 
          ${contractor.buildingNumber},${contractor.flatNumber}, 
          ${contractor.postCode}, ${contractor.city},${contractor.country}
          ${contractor.nip}
          `}
        </label>
        </>)} 
     

        nazwa: {contractor.companyName},
        adres: {contractor.street},
        {contractor.buildingNumber},
        {contractor.flatNumber},
        {contractor.postCode},
        {contractor.city},
        {contractor.country},
        NIP: {contractor.nip},


        
    </div>
))}
{isEditMode && (
        <button onClick={handleDeleteClick} className="btn">usun wybranego konrahenta</button>
    )}
<button onClick={() => setIsEditMode(!isEditMode)} className="btnsmall">
      {getButtonLabel()}
    </button>
    

    </div>)

}

export default Contractors;