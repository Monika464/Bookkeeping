import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"

export const useAuthContext =()=>{
    const context = useContext(AuthContext)

    if(!context){
        throw new Error('useAuthContext must be inside an AuthContextprovider')
    }

    return context

}
// udemy 97 lekcja creating custom hook