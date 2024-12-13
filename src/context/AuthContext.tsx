import { Dispatch, ReactNode, createContext, useReducer } from "react";

interface Props {
  children?: ReactNode;
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

export const AuthContext = createContext<{
  state: IAuthState;
  dispatch: React.Dispatch<{ type: string; payload: IUser | null }>;
}>({
  state: { user: null },
  dispatch: () => null,
});

export const authReducer = (state: IAuthState, action: any) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload };

    case "LOGOUT":
      return { ...state, user: null };

    default:
      return state;
  }
};

export interface IState {
  count: number;
}

export const AuthContextProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
  });

  return (
    <AuthContext.Provider value={{ state: state, dispatch: dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
