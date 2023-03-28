import  {createContext, ReactNode, useState} from "react";

import {useNavigate} from 'react-router-dom'

interface Props {
    children?: ReactNode
}

interface GlobalContent {
    authenticated: Boolean,
    user: {
        id: string,
        email: string
    } | null   

 logout: () => void
 login: (username: string, password: string) => void
}


export const AuthContext = createContext<GlobalContent>({authenticated: false, user: null, login(username, password) {
    
},logout() {
    
}, });

export const AuthProvider = ({children, ...props}: Props) => {
    const navigate =  useNavigate();

    const [user, setUser] =  useState<{id: string, email: string } | null>(null)

    function login(email: string, password: string): Boolean {
        if(password == '123456'){
            setUser({id: "999999", email})
            navigate('/')
            return true
        }
        alert("Use qualquer username com o password 123456 para logar")
        return false
    }

    const logout = () => {
        setUser(null)
        navigate('/login')
    }

    return  (
        <AuthContext.Provider
        value={{authenticated: !!user, user,login, logout}}>{children}</AuthContext.Provider>
    )
}