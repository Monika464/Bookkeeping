
import React, { useState } from 'react';

interface FormField {
  id: number;
  value: string;
  name: string;
  streetName: string;
  buildingNum: string;
  flatNum: string;
  postcode: string;
  city: string;
  email: string;
}

const DynamicForm2: React.FC = () => {
  const [formFields, setFormFields] = useState<FormField[]>([]);
  const [nextId, setNextId] = useState<number>(1);

  const addFormField = () => {
    setFormFields([...formFields, { 
        id: nextId, 
        value: '',
        name: '',
        streetName: '',
        buildingNum: '',
        flatNum: '',
        postcode: '',
        city: '',
        email: ''
        
        
        }]);
    setNextId(nextId + 1);
  };

  const handleInputChange = (id: number, inputName: string, value: string) => {
    const updatedFormFields = formFields.map((field) =>
      field.id === id ? { ...field, [inputName]: value } : field
    );
    setFormFields(updatedFormFields);
  };

  const submitForm =()=>{
    console.log("formFields",formFields)
  }

  return (
    <div>
        <br></br>
        Dodaj kontrahenta

      <button onClick={addFormField}>Dodaj</button>
      <form onSubmit={submitForm}>
      {formFields.map((field) => (
       
        <div key={field.id}>
          <input
            type="text"
            placeholder="name"
            value={field.name}
            onChange={(e) => handleInputChange(field.id, 'invoiceNum', e.target.value)}
          />
          <input
            type="text"
            placeholder="street"
            value={field.streetName}
            onChange={(e) => handleInputChange(field.id, 'invoiceDate', e.target.value)}
          />
          <input
            type="text"
            placeholder="num"
            value={field.buildingNum}
            onChange={(e) => handleInputChange(field.id, 'building-num', e.target.value)}
          />
          <input
            type="text"
            placeholder="poscode"
            value={field.postcode}
            onChange={(e) => handleInputChange(field.id, 'postcode', e.target.value)}
          />
 <input
            type="text"
            placeholder="city"
            value={field.city}
            onChange={(e) => handleInputChange(field.id, 'city', e.target.value)}
          />

        </div>
           
      ))}
      <br></br>
      <button>send</button>
      </form>
    </div>
  );
};

export default DynamicForm2;

// import React, { useState } from 'react';

// interface FormField {
//   id: number;
//   value: string;
//   invoiceNum: string;
//   invoiceDate: string;

// }

// const DynamicForm: React.FC = () => {
//   const [formFields, setFormFields] = useState<FormField[]>([]);
//   const [nextId, setNextId] = useState<number>(1);

//   const addFormField = () => {
//     setFormFields([...formFields, { id: nextId, value: '' ,invoiceNum: '', invoiceDate: ''}]);
//     setNextId(nextId + 1);
//   };

//   const handleInputChange = (id: number, value: string) => {
//     const updatedFormFields = formFields.map((field) =>
//       field.id === id ? { ...field, value, invoiceNum,invoiceDate} : field
//     );
//     setFormFields(updatedFormFields);
//   };

//   return (
//     <div>
//       <button onClick={addFormField}>Dodaj</button>
//       {formFields.map((field) => (
//         <div>
//         <input
//           key={field.id}
//           type="text"
//           value={field.value}
//           onChange={(e) => handleInputChange(field.id, e.target.value)}
//         />
//          {field.value}{field.id}
//         </div>
       
//       ))}
//     </div>
//   );
// };

// export default DynamicForm;