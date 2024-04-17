import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "../App";

export interface IContractorsFormProps{}

interface FormField {
    id: number;
    companyName: string;
    street: string;
    buildingNumber: string;
    flatNumber: string;
    postCode: string; 
    city: string;
    country: string;
    nip: string;
  }

const ContractorsForm: React.FunctionComponent<IContractorsFormProps> = (props) => {

    const [formFields, setFormFields] = useState<FormField[]>([]);
    const [nextId, setNextId] = useState<number>(1);
    const {currentUser} = useContext(UserContext);

    const addFormField = () => {
        setFormFields([...formFields, 
          { id: nextId, 
            companyName: '',
            street: '',
            buildingNumber: '',
            flatNumber: '',
            postCode: '',
            city: '',
            country: '',
            nip: '',
            }]);
        setNextId(nextId + 1);
      };
    
      const handleInputChange = (id: number, inputName: string, value: string) => {
        // Sprawdzamy, czy wartość jest liczbą z dwoma miejscami po przecinku
        // const regex = /^\d+(\.\d{0,2})?$/; // Wyrażenie regularne dopuszczające maksymalnie dwie cyfry po przecinku
        // if (inputName === 'amount' && !regex.test(value)) {
        //   return; // Jeśli wartość nie spełnia wymagań, nie aktualizujemy stanu
        // }
      
        const updatedFormFields = formFields.map((field) =>
         field.id === id ? { ...field, [inputName]: value } : field
        );
        setFormFields(updatedFormFields);
      };
    
      const resetForm = () => {
        // Reset form fields to default state
        setFormFields([]);
        setNextId(1);
      }
 console.log("formFields", formFields);


 const sendToBase = async (e)=>{
    e.preventDefault();
    
    // Sprawdź, czy wszystkie pola "kwota w zł" są wypełnione
    const isćompanyNameFilled = formFields.every(field => field.companyName.trim() !== '');
    
    // Jeśli nie wszystkie pola "kwota w zł" są wypełnione, zatrzymaj wysyłanie formularza
    if (!isćompanyNameFilled) {
      alert("Proszę wypełnić pole 'companyName'!");
      return;
    }
    
        //const uid = currentUser?.uid;
        //console.log("currentUser?.uid",currentUser?.uid)
        //const uid = "user1id";
        const userId = currentUser?.uid;
         const collectionRef = collection(db, `${userId}contractors`);
    
      // Tworzymy tablicę do przechowywania danych z wszystkich pól formularza
      const formData = formFields.map(field => ({
       
       userId: userId,
       id:field.id,
       companyName: field.companyName,
       street: field.street,
       buildingNumber: field.buildingNumber,
       flatNumber: field.flatNumber,
       postCode: field.postCode,
      city: field.city,
      country: field.country,
      nip: field.nip,
        
      }));
    
    
      formData.forEach(async (data) => {
        await setDoc(doc(collectionRef), data);
      });
    
      resetForm();
      }
    









    return(<>
        <button onClick={addFormField}>Dodaj kontrahenta</button>
      {formFields.map((field) => (
        <div key={field.id}>
          {field.id}.
          <input
            type="text" 
            placeholder="companyName"
            value={field.companyName}
            onChange={(e) => handleInputChange(field.id, 'companyName', e.target.value)}
          />
          <input
            type="text" 
            placeholder="street"
            value={field.street}
            onChange={(e) => handleInputChange(field.id, 'street', e.target.value)}
          />
            <input
            type="text" 
            placeholder="buildingNumber"
            value={field.buildingNumber}
            onChange={(e) => handleInputChange(field.id, 'buildingNumber', e.target.value)}
            />
           <input
            type="text" 
            placeholder="flatNumber"
            value={field.flatNumber}
            onChange={(e) => handleInputChange(field.id, 'flatNumber', e.target.value)}
            />
           <input
            type="text" 
            placeholder="postCode"
            value={field.postCode}
            onChange={(e) => handleInputChange(field.id, 'postCode', e.target.value)}
            />
             <input
            type="text" 
            placeholder="city"
            value={field.city}
            onChange={(e) => handleInputChange(field.id, 'city', e.target.value)}
            />
             <input
            type="text" 
            placeholder="country"
            value={field.country}
            onChange={(e) => handleInputChange(field.id, 'country', e.target.value)}
            />
            <input
            type="text" 
            placeholder="nip"
            value={field.nip}
            onChange={(e) => handleInputChange(field.id, 'nip', e.target.value)}
            />

        </div>
      ))}
      <button onClick={sendToBase}>nowy wyslij koszt</button>
  
    </>)
}

export default ContractorsForm;