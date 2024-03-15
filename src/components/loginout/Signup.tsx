
import React, { ChangeEvent, FormEvent, useContext, useState } from 'react';
import './login.css';
import { 
  createUserWithEmailAndPassword, 
  getAuth,
   signOut
  } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import { useSignup } from '../../hooks/useSignup';


export interface IApplicationProps {};
//interface URL {}


const Signup: React.FunctionComponent<IApplicationProps> =() => {
    const auth = getAuth();
    const navigate = useNavigate();
   

    const { currentUser} = useContext(UserContext);
    
    const {error, isPending, signup} = useSignup();


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

const logout=()=> {
  navigate('/login');
    return signOut(auth);
    }
    
const handleSubmit = async(event: FormEvent<HTMLFormElement>) => {
  event.preventDefault()   
  //setError('');

  // Usunięcie spacji z emaila i hasła 
  const cleanedEmail = email.trim();
  const cleanedPassword = password.trim();
  signup(cleanedEmail,cleanedPassword );
    // // Send the email and password to firebase
    // await createUserWithEmailAndPassword(auth, cleanedEmail, cleanedPassword)
    // .then((response) =>{
    //   navigate('/');
    //   console.log("data created", response);
    //       })

  
    //  .catch(error =>{
    //   console.log("blad",error);
    //   setError(error)
    //   setAuthing(false);   
    // })

   
}


    return (  
      

     <div id="main" className="login-form"> 
        <div className='title'>Załóż konto</div>
        <br/>
      
         <div id="fields">
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
          <button className="btn" disabled={isPending} >Załóż konto </button>
          </form>
       
   
            {/* <p>Google</p>
            <button onClick={signInWithGoogle} disabled={authing}>signInWithGoogle</button>
        */}

        {/* <button onClick={logout}>logout</button> */}
        {/* {error && <p>{error.toString()}</p>} */}
        {error && <p>{error.toString().split('Firebase: ')[1]}</p>}
</div> 
    )
}


export default Signup;