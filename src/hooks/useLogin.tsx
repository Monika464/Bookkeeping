 import {  signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react"
import { auth } from "../App";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
     const [error, setError] = useState<string>('');
     const [isPending, setIsPending] = useState(false)
     const { dispatch } = useAuthContext()
     const navigate = useNavigate();
     
     const login  = async (email: string, password: string) =>{
        setError('');
        setIsPending(true);


       await signInWithEmailAndPassword(auth, email, password)
        
        .then((response) =>{
          navigate('/');
          console.log("credentials created", response);
          setIsPending(false); 
          // dispatch login action
      dispatch({ type: 'LOGIN', payload: response.user })
      
              })
              //.then((userCredential) => {

             //   console.log("userCredential",userCredential)
             // })

        //       .then((response) =>{
             
        //  })

        .catch(error =>{
          console.log(error);
          setError(error)
          setIsPending(false); 
         
        })




     }
        return {error, isPending, login}
 }