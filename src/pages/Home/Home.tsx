import React, { useContext }  from "react"
import { AuthContext } from "../../contexts/auth";


export default function Home(){
    const {logout} = useContext(AuthContext);
    return (
        <div className="flex flex-col justify-center items-center w-full h-[100vh] bg-[#91bc84]">

            <h1 className="text-4xl text-primary text-center">Organização Financeira Pessoal</h1>
            <button className="bg-primary mt-10 hover:bg-green-800 text-white font-bold py-2 px-4 rounded w-28" onClick={logout}>
            Sair
            </button>
        </div>
        

        )
}