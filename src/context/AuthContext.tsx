import {Dispatch, ReactNode, createContext,useReducer } from 'react'

interface Props {
    children?: ReactNode
  }
  
  // interface IAuthState {
  //   user: any
  // }
  interface IUser {
    // definicja użytkownika
    providerId: string; 
uid: string;  

  }
  
  interface IAuthState {
    // definicja stanu autentykacji
    user: IUser | null;
  }
  export interface IAuthContext {
    state: IAuthState;
    dispatch: Dispatch<{ type: string; payload: IUser }>; // zmień na odpowiedni typ akcji
  }
  
// export const AuthContext= createContext('authcontext')
///

//export const AuthContext = createContext<IAuthContext | undefined>(undefined);

export const AuthContext = createContext<{
    state: IAuthState;
    dispatch: React.Dispatch<{ type: string; payload: IUser }>;
  }>
  ({
    state: { user: null },
    dispatch: () => null
  });

  ////

export const authReducer =(state: IAuthState, action: any) =>{
    switch(action.type) {

        case 'LOGIN':
             return {...state, user: action.payload}

        case 'LOGOUT':
             return{...state, user: null}

        default: return state;
    }
}

export interface IState {
    count: number;
  }

// export const AuthContextProvider: React.FC<{children: React.ReactNode}> =({children}) =>{

export const AuthContextProvider: React.FC<Props> =({children}) =>{

    const [state,dispatch] = useReducer(authReducer,{
 user: null
 })

console.log("auth context", state)


//https://react.dev/reference/react/createContext
//https://react.dev/reference/react/useReducer
return (


  <AuthContext.Provider value={{state: state, dispatch: dispatch }}> 
    {children}
    </AuthContext.Provider>
)
}
