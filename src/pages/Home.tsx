

import { To, useNavigate } from "react-router-dom";
//import DynamicForm3 from "../forms/Form3";

export interface IHome {}

const Home: React.FunctionComponent<IHome> =() => {
 

  const navigate = useNavigate();
  
  const redirectTo =(localisation: To)=>{
    navigate(localisation);

  }

    return(<>
 
 <p>Zapisywanie faktur:</p>
 <button onClick={()=>{redirectTo(`/calendar`)}} className='btn'>Calendar</button>
 <br></br><br></br>
 <p>Bilans:</p>
  <button onClick={()=>{redirectTo(`/balance`)}} className='btn'>Balance</button>
  <br></br><br></br>
 <p>Zestawienie roczne faktur</p>
 <button onClick={()=>{redirectTo(`/year`)}} className='btn'>Year</button>
 <br></br><br></br>
 <p>Rejestr kontrahentów:</p>
 <button onClick={()=>{redirectTo(`/contractor`)}} className='btn'>Contractors</button>
 <p>Logowanie:</p>
 
 <button onClick={()=>{redirectTo(`/loginout`)}} className='btn'>Login</button>
 {/* <button onClick={redirectToAdminPanel}>Calendar</button> */}
    </>)
}

export default Home;