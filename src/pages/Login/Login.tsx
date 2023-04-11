
import { useContext } from 'react'
import { AuthContext } from '../../contexts/Auth/AuthContext'
import { yupResolver } from '@hookform/resolvers/yup'

import loginImg from '../../assets/financa.jpg'
import { useForm } from 'react-hook-form';
import { object, string } from 'yup'
import { Link } from 'react-router-dom';

const schema = object({
    email: string().required("Campo obrigatório").email("Você precisa usar um e-mail válido"),
    password: string().required("Campo obrigatório").min(6, "Você precisa inserir o mínimo de 6 caracteres")
})


export default function Login() {

    const { register, handleSubmit: onSubmit, watch, formState: { errors } } = useForm({ resolver: yupResolver(schema) });


    const auth = useContext(AuthContext)



    const handleSubmit = async (data: any) => {
        const { email, password } = data
        await auth.signin(email, password)
    };


    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 h-screen w-full'>
            <div className='hidden sm:block'>
                <img className='w-full h-full object-cover' src={loginImg} alt="Imagem de Finanças" />
            </div>

            <div className='bg-gradient-to-tr from-green-700 via-green-700 to-green-500 flex flex-col justify-center'>
                <form className='max-w-[400px] w-full mx-auto bg-white p-4' onSubmit={onSubmit(handleSubmit)}>
                    <h2 className='text-4xl font-bold text-center py-6 text-primary'>Finanças</h2>
                    <div className='flex flex-col py-2 '>
                        <label className={`text-primary ${errors.email ? "text-red-500" : ''}`}>Email</label>
                        <input className={`border rounded-lg p-2 outline-primary ${errors.email ? "border border-red-500 outline-red-500" : ''}`} type="text"  {...register("email")} id="email" />
                        <span className="text-red-500">{errors?.email?.message?.toString()}</span>
                    </div>
                    <div className='flex flex-col py-2'>
                        <label className={`text-primary ${errors.password ? "text-red-500" : ''}`}>Password</label>
                        <input className={`border rounded-lg p-2 outline-primary ${errors.password ? "border border-red-500 outline-red-500" : ''}`} type="password" {...register("password")} id="password" />
                        <span className="text-red-500">{errors?.password?.message?.toString()}</span>
                    </div>
                    <button type="submit" className='border w-full my-5 py-2 hover:bg-[#8FC5A3] bg-primary text-white'>Entrar</button>

                    <div className='flex justify-end text-primary'>
                        <Link style={{ textDecoration: "none" }} to={"/register"}>Criar uma conta?</Link>
                    </div>
                </form>
            </div>


        </div>
    )
}