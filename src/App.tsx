
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
   <Routes>
       <Route 
        path="/" 
        element={
         <Home />        
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
   </BrowserRouter> 
   
    </div>
    </>)
}

export default App
