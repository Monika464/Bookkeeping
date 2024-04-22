import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react"
import { auth } from "../App";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
     const [error, setError] = useState<string>('');
     const [isPending, setIsPending] = useState(false)
     const { dispatch } = useAuthContext()
     const navigate = useNavigate();
     
     const signup  = async (email: string, password: string) =>{
        setError('');
        setIsPending(true);


        await createUserWithEmailAndPassword(auth, email, password)
        
        .then((response) =>{
          navigate('/');
          console.log("credentials created", response);
          setIsPending(false);  
           // dispatch login action
      dispatch({ type: 'LOGIN', payload: response.user })
              })
              // .then((userCredential) => {
              //   // Signed in 
              //   //const user = userCredential.user;
              //   // ...
              //   console.log("userCredential",userCredential)
              // })

              // .then((response) =>{
            
              //  })
        
            .catch(error =>{
             console.log(error);
             setError(error)
             setIsPending(false);       
            })




     }
        return {error, isPending, signup}
 }

//
