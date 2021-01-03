import React, { useContext, useState, useEffect } from 'react'
import { auth } from '../firebase'

const AuthContext = React.createContext({});

export function useAuth(){
    return useContext(AuthContext)
}

export function AuthProvider({ children }: any) {

    const [currentUser, setCurrentUser] = useState()

    function signup(email:string, password:string) {
        return auth.createUserWithEmailAndPassword(email, password)
    }
   
    function login(email:string, password:string) {
        return auth.signInWithEmailAndPassword(email, password)
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
        login
    }
    console.log(value)
    
    return (

        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>

    )
}
