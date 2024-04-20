
import { useContext } from 'react'
import { UserContext } from '../context/UserContext';
import { To, useNavigate } from "react-router-dom";
//import DynamicForm3 from "../forms/Form3";

export interface IHome {}

const Home: React.FunctionComponent<IHome> =() => {
 

  const navigate = useNavigate();
  
  const redirectTo =(localisation: To)=>{
    navigate(localisation);

  }

    return(<>
 
 <button onClick={()=>{redirectTo(`/calendar`)}} className='btn'>Calendar</button>
 <button onClick={()=>{redirectTo(`/balance`)}} className='btn'>Balance</button>
 <button onClick={()=>{redirectTo(`/year`)}} className='btn'>Year</button>
 <button onClick={()=>{redirectTo(`/contractor`)}} className='btn'>Contractors</button>
 <button onClick={()=>{redirectTo(`/loginout`)}} className='btn'>Login</button>
 {/* <button onClick={redirectToAdminPanel}>Calendar</button> */}
    </>)
}

export default Home;