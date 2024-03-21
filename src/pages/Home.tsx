import Calendar from "../components/Calendar";
import Form1 from "../forms/Form1";
import Form2 from "../forms/Form2";
 
import { useContext } from 'react'
import { UserContext } from '../context/UserContext';
import Test from "../components/TESTFirebase";
//import DynamicForm3 from "../forms/Form3";

export interface IHome {}

const Home: React.FunctionComponent<IHome> =() => {
  const { currentUser} = useContext(UserContext);

  //console.log("currentUser",currentUser?.uid)
    return(<>
      <Form1/>
    <Form2/>
 

    <Calendar/>

    <Test/>
    </>)
}

export default Home;