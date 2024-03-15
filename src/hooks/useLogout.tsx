import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export const useLogout = () => {
    const auth = getAuth();
    const navigate = useNavigate();
    
    const logout=()=> {
        navigate('/');
          return signOut(auth);
          }

return logout
}