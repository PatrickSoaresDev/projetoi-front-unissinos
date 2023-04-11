import { useEffect, useState } from "react"
import { AuthContext } from "./AuthContext"
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom"
import { AxiosError, isAxiosError } from "axios"
import { toast } from "react-toastify"
import UserServices from "../../services/user.services";
import { User } from "../../types/User";
import { tokenData } from "../../types/TokenData";


export const AuthProvider = ({ children }: { children: JSX.Element }) => {
    const navigate = useNavigate();
    const userServices = new UserServices()
    const [user, setUser] = useState<User | null>(null)

    useEffect(() => {
        const validateToken = () => {
            const storagedata = sessionStorage.getItem('token')
            if (storagedata) {
                userSet(storagedata)
            }

        }
        validateToken()
    }, [])


    const signin = async (email: string, password: string) => {
        try {
            const { data } = await userServices.createSession({ email, password })



            userSet(data.token)
            setToken(data.token)

            navigate('/')

        } catch (e: unknown | AxiosError) {
            if (isAxiosError(e)) {
                const { response } = e
                toast.error(response?.data)
            } else {
                toast.error("Falha de comunicação com o servidor, por favor, tente mais tarde")
            }
        }

    }

    const signout = () => {
        setUser(null)
        sessionStorage.removeItem("token")
    }

    const userSet = (token: string) => {
        const tokenData: tokenData = jwt_decode(token)

        setUser(tokenData.user)
    }

    const setToken = (token: string) => {
        sessionStorage.setItem('token', token)
    }

    return (
        <AuthContext.Provider value={{ user, signin, signout }}>
            {children}
        </AuthContext.Provider>

    )
}