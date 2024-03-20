import { createContext, useEffect, useState, ReactNode } from "react";
import { NextOrObserver, User, onAuthStateChanged } from "firebase/auth";
import { auth } from "../App";

interface Props {
  children?: ReactNode
}

export const UserContext = createContext({
  // "User" comes from firebase auth-public.d.ts
  currentUser: {} as User | null ,
  setCurrentUser: (_user:User) => {},

});

export const UserContextProvider = ({ children }: Props) => {
    
     const [currentUser, setCurrentUser] = useState<User | null>(null)

  const userStateListener = (callback:NextOrObserver<User>) => {
    return onAuthStateChanged(auth, callback)
  }

  useEffect(() => {
    const unsubscribe = userStateListener((user) => {
      if (user) {
        setCurrentUser(user)
      }
    });
    return unsubscribe
  }, [setCurrentUser]);

  const currentUserData = {
    currentUser, 
    setCurrentUser,
  }

  return (
    <UserContext.Provider value={currentUserData}>
      {children}
    </UserContext.Provider>
  );
};
  //to stad:
  //https://www.udemy.com/course/build-web-apps-with-react-firebase/learn/lecture/29068930#overview

//https://www.youtube.com/watch?v=nTQ-PfUqDvM&t=744s