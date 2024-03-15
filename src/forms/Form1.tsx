
import { format } from 'date-fns';
import React, { useState } from 'react';

interface FormField {
  id: number;
  value: string;
  invoiceNum: string;
  invoiceDate: string;
  paymentDate: string;
  sellerName: string;
  paymentForm: string;
}

interface IForm1 {
  thisDay: ValuePiece
}

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const DynamicForm: React.FC<IForm1> = (props) => {
  const [formFields, setFormFields] = useState<FormField[]>([]);
  const [nextId, setNextId] = useState<number>(1);

  const addFormField = () => {
    setFormFields([...formFields, { id: nextId, value: '', invoiceNum: '', invoiceDate: '', paymentDate: '', sellerName: '' ,paymentForm: ''}]);
    setNextId(nextId + 1);
  };

  const handleInputChange = (id: number, inputName: string, value: string) => {
    const updatedFormFields = formFields.map((field) =>
      field.id === id ? { ...field, [inputName]: value } : field
    );
    setFormFields(updatedFormFields);
  };

  console.log("jakie props", props.thisDay)
  return (
    <div>
      <button onClick={addFormField}>Dodaj pozycję</button>
     
      {/* {`${format(props.thisDay, 'yyyy')}`}   */}
      {formFields.map((field) => (
        
        <div key={field.id}>

            {field.id}
            .
            
                
{`${format(props.thisDay, 'dd-MM-yyyy')}`}
<input
            type="text"
            placeholder="amount"
            value={field.paymentForm}
            onChange={(e) => handleInputChange(field.id, 'sellerName', e.target.value)}
          />
          <input
            type="text"
            placeholder="Invoice Num"
            value={field.invoiceNum}
            onChange={(e) => handleInputChange(field.id, 'invoiceNum', e.target.value)}
          />
          {/* <input
            type="text"
            placeholder="Invoice Date"
            value={field.invoiceDate}
            onChange={(e) => handleInputChange(field.id, 'invoiceDate', e.target.value)}
          /> */}
          <input
            type="text"
            placeholder="Seller Name"
            value={field.sellerName}
            onChange={(e) => handleInputChange(field.id, 'sellerName', e.target.value)}
          />
        
        </div>
      ))}
    </div>
  );
};
//payment amount, payment date, vat,// przychody to co na glowny //forma platnosci

export default DynamicForm;

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