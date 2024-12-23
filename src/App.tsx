import { AuthContextProvider } from "./context/AuthContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./components/loginout/Login";
import Signup from "./components/loginout/Signup";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";
import { config } from "./config";
import { UserContextProvider } from "./context/UserContext";
import YearDisplay from "./components/display/YearDisplay";
import Balance from "./pages/Balance";
import { YearContextProvider } from "./context/YearContextType";
import ContractorsPage from "./pages/ContractorsPage";
import Navbar from "./components/Navbar";
import CalendarPage from "./components/Calendar";
import CheckForDuplicates from "./components/display/CheckForDuplicate";
import "./app.css";
import Userpanel from "./components/Userpanel";
import Manual from "./components/Manual";
import { LanguageProvider } from "./context/LanguageContext";
import ForgotPass from "./components/loginout/Forgotpass";
export const app = initializeApp(config.firebaseConfig);
//console.log("app",app)
export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();
export const analytics = getAnalytics(app);

// dopisac zabepieczenie routes

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <LanguageProvider>
          <AuthContextProvider>
            <UserContextProvider>
              <YearContextProvider>
                <div className="container">
                  <Navbar />
                  <Routes>
                    <Route path="/" element={<Home />} />

                    <Route path="/year" element={<YearDisplay />} />

                    <Route path="/balance" element={<Balance />} />

                    <Route path="/contractor" element={<ContractorsPage />} />

                    <Route path="/signup" element={<Signup />} />
                    <Route path="/login" element={<Login />} />

                    <Route path="/calendar" element={<CalendarPage />} />

                    <Route path="/userpanel" element={<Userpanel />} />
                    <Route path="/manual" element={<Manual />} />
                    <Route path="forgotpass" element={<ForgotPass />} />

                    <Route
                      path="/dup"
                      element={
                        <CheckForDuplicates
                          year={undefined}
                          type={""}
                          amount={""}
                          category={""}
                          day={0}
                          description={""}
                          id={0}
                          invoiceName={""}
                          invoiceNum={""}
                          itid={""}
                          month={""}
                          paid={false}
                          paymentForm={""}
                          sellerName={""}
                        />
                      }
                    />

                    {/* <Route 
        path="/loans" 
        element={
         <FormLoansCredits/>  
               }              
         /> */}

                    <Route path="/login2" element={<Login />} />

                    <Route path="/signup2" element={<Signup />} />
                  </Routes>
                </div>
              </YearContextProvider>
            </UserContextProvider>
          </AuthContextProvider>
        </LanguageProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
