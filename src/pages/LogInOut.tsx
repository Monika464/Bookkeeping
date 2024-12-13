// import { signOut } from "firebase/auth";
// import Login from "../components/loginout/Login";
// import { auth } from "../App";
// import Signup from "../components/loginout/Signup";
// import '../components/loginout/login.css'
// import { UserContext } from "../context/UserContext";
// import { useContext } from "react";
// import { useNavigate } from "react-router-dom";
// export interface ILoginOutProps{};

// const LoginOut: React.FunctionComponent<ILoginOutProps> =() => {

//     const {currentUser} = useContext(UserContext);

//     //const userId = currentUser?.uid;
//     const navigate = useNavigate();

//     const logout=()=> {
//          navigate('/loginout');
//           return signOut(auth);
//           }

//     return(<div>
//         {!currentUser &&   <Login/>}
//         {!currentUser &&  <Signup/>}

//         <div className="logout">
//         {currentUser &&<button onClick={logout} className="btn">Logout</button>}
//         </div>
//         </div>)
// }
// export default LoginOut;
