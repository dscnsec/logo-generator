import React, { useContext, useState, useEffect } from 'react'
import { auth } from '../firebase'

const AuthContext = React.createContext({});

export function useAuth(){
    return useContext(AuthContext)
}

export function AuthProvider({ children }: any) {

    const [currentUser, setCurrentUser] = useState()

    function signup(email:any, password:any) {
        return auth.createUserWithEmailAndPassword(email, password)
    }
    
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user:any) => {
            setCurrentUser(user)
        })

        return unsubscribe
    }, [])
    
    const value = {
        currentUser,
        signup
    }
    
    return (

        <AuthContext.Provider value={{currentUser}}>
            {children}
        </AuthContext.Provider>

    )
}
