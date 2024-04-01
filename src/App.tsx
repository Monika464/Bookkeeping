
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Form1 from './forms/Form1'
import Form2 from './forms/Form2'
import Home from './pages/Home'
import Login from './components/loginout/Login'
import Signup from './components/loginout/Signup'
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import { getAnalytics } from 'firebase/analytics'
import { config } from './config'
import { UserContext, UserContextProvider } from './context/UserContext'
import YearDisplay from './components/display/YearDisplay'
import MonthDisplay from './components/display/MonthDisplay'
import Balance from './pages/Balance'
import FormLoansCredits from './forms/FormLoansCredits'

export const app = initializeApp(config.firebaseConfig)
//console.log("app",app)
export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();
export const analytics = getAnalytics(app);

function App() {
  


     return (
    <>

    <div className='container'>
 <BrowserRouter>  

 <UserContextProvider>  
   <Routes>

       <Route 
        path="/" 
        element={
         <Home />        
               }              
         />


       <Route 
        path="/year" 
        element={
         <YearDisplay/>  
               }              
         />


       <Route 
        path="/month" 
        element={
         <MonthDisplay/>  
               }              
         />

<Route 
        path="/balance" 
        element={
         <Balance/>  
               }              
         />

<Route 
        path="/loans" 
        element={
         <FormLoansCredits/>  
               }              
         />


<Route 
        path="/login2" 
        element={                      
                  <Login />       
               }
       />



<Route 
        path="/signup2" 
        element={                      
                  <Signup />       
               }
       />
   </Routes>

   </UserContextProvider> 
   </BrowserRouter> 
   
    </div>
    </>)
}

export default App
