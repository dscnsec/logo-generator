import React, { useContext, useState, useEffect } from 'react'
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

const AuthContext = React.createContext({});

export function useAuth(){
    return useContext(AuthContext)
}

export function AuthProvider({ children }: any) {

    const [currentUser, setCurrentUser] = useState()

    function signup(email:string, password:string) {
        return createUserWithEmailAndPassword(auth, email, password)
    }
   
    function login(email:string, password:string) {
        return signInWithEmailAndPassword(auth, email, password)
    }

    function logout(){
        return auth.signOut()
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user:any) => {
            setCurrentUser(user)
        })

        return unsubscribe
    }, [])
    
    const value = {
        currentUser,
        signup,
        login,
        logout
    }
    console.log(value)
    
    return (

        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>

    )
}
