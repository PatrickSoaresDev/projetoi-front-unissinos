import React, { useState, useContext } from 'react'
import {AuthContext} from '../../contexts/auth'

import loginImg from '../../assets/financa.jpg'
import { ToastContainer } from 'react-toastify';



export default function Login(){
    const { login} = useContext(AuthContext);


    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();   
        login(username, password)
    };



    return (
       <div className='grid grid-cols-1 sm:grid-cols-2 h-screen w-full'>
        <div className='hidden sm:block'>
            <img className='w-full h-full object-cover' src={loginImg} alt="Imagem de Finanças" />
        </div>

        <div className='bg-gradient-to-tr from-green-700 via-green-700 to-green-500 flex flex-col justify-center'>
            <form className='max-w-[400px] w-full mx-auto bg-white p-4' onSubmit={handleSubmit}>
                <h2 className='text-4xl font-bold text-center py-6 text-primary'>Finanças</h2>
                <div className='flex flex-col py-2 '>
                    <label className='text-primary'>Username</label>
                    <input className='border rounded-lg p-2 outline-primary' type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className='flex flex-col py-2'>
                    <label className='text-primary'>Password</label>
                    <input className='border rounded-lg p-2 outline-primary' type="password" onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="submit" className='border w-full my-5 py-2 hover:bg-[#8FC5A3] bg-primary text-white'>Entrar</button>
               <ToastContainer />
                {/* <div className='flex justify-between'>
                    <p className='flex items-center'><input className='mr-2' type="checkbox" /> Esqueceu a Senha</p>
                    <p>Criar uma conta</p>
                </div> */}
            </form>
        </div>


    </div>
    )
}