
import React, { ChangeEvent, FormEvent,useState } from 'react';
import './login.css';
//import {   signInWithEmailAndPassword} from 'firebase/auth';
import { Link} from 'react-router-dom';
import { useLogin } from '../../hooks/useLogin';


export interface ILoginProps {};


const Login: React.FunctionComponent<ILoginProps> =() => {

    //const [authing, setIsAuthing] = useState(false)
    
const {error, isPending, login} = useLogin();
    
    const defaultFormFields = {
      email: '',
      password: '',
    }

    const [formFields, setFormFields] = useState(defaultFormFields)
    const { email, password } = formFields


const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
  const { name, value } = event.target
  
  setFormFields({...formFields, [name]: value })

}

const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  //setError('');

    // Usunięcie spacji z emaila i hasła
    const cleanedEmail = email.trim();
    const cleanedPassword = password.trim();

  login(cleanedEmail,cleanedPassword)


  
};
// const resetFormFields = () => {
//   return (
//     setFormFields(defaultFormFields)
//   );
// }




    return (
      

        <div id="main" className="login-form"> 
        <div className='title'>Login</div>
      
         <div id="fields">
          <br/>
         </div>
         
         
         <form onSubmit={handleSubmit}>
        
              <input
                type="email"
                name="email"
                value={email}
                onChange={handleChange}
                placeholder="Email"
                required
              />
          
              <input
                type='password'
                name='password'
                value={password}
                onChange={handleChange}
                placeholder="Password"
                required
              />
           
              {/*<input id='recaptcha' type="submit" />*/}
              <br/>
          <button className="btn" disabled={isPending} >Zaloguj </button>
          </form>

          {/* <ForgotPass/> */}
          <Link to={'/forgotpass'} style={{fontSize: 'small'}}>Nie pamiętam hasła</Link>
 
         {error && <p>{error.toString().split('Firebase: ')[1]}</p>}  
         {/* {error && typeof error === 'object' && <p>{error.toString().split('Firebase: ')[1]}</p>} */}
    </div>
    )
}

export default Login;
