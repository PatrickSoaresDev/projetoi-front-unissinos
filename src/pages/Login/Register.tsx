import { yupResolver } from '@hookform/resolvers/yup'

import loginImg from '../../assets/financa.jpg'
import { useForm } from 'react-hook-form';
import { object, string, ref } from 'yup'
import { Link, useNavigate } from 'react-router-dom';
import UserServices from '../../services/user.services';
import { toast } from 'react-toastify';
import { AxiosError, isAxiosError } from 'axios';

const schema = object({
    name: string().required("Campo obrigatório").min(3, "Você precisa inserir o mínimo de 3 caracteres"),
    email: string().required("Campo obrigatório").email("Você precisa usar um e-mail válido"),
    password: string().required("Campo obrigatório").min(6, "Você precisa inserir o mínimo de 6 caracteres"),
    passwordConfirmation: string().required('Password confirmation is required').oneOf([ref('password')], 'Passwords não conferem'),
})


export default function Register() {
    const { register, handleSubmit: onSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) });

    const navigate = useNavigate();
    const handleSubmit = async (data: any) => {
        try {
            const userService = new UserServices()

            await userService.createUser(data)

            toast.success('Register successfuly')

            navigate('/login')
        }
        catch (e: unknown | AxiosError) {
            if (isAxiosError(e)) {
                const { response } = e
                return toast.error(response?.data)
            }
            toast.error("Falha de comunicação com o servidor, por favor, tente mais tarde")
        }
    };



    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 h-screen w-full'>
            <div className='hidden sm:block'>
                <img className='w-full h-full object-cover' src={loginImg} alt="Imagem de Finanças" />
            </div>

            <div className='bg-gradient-to-tr from-green-700 via-green-700 to-green-500 flex flex-col justify-center'>
                <form className='max-w-[400px] w-full mx-auto bg-white p-4' onSubmit={onSubmit(handleSubmit)}>
                    <h2 className='text-4xl font-bold text-center py-6 text-primary'>Registrar</h2>
                    <div className='flex flex-col py-2 '>
                        <label className={`text-primary ${errors.name ? "text-red-500" : ''}`}>Nome</label>
                        <input className={`border rounded-lg p-2 outline-primary ${errors.name ? "border border-red-500 outline-red-500" : ''}`} type="text"  {...register("name")} id="name" />
                        <span className="text-red-500">{errors?.email?.message?.toString()}</span>
                    </div>
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
                    <div className='flex flex-col py-2'>
                        <label className={`text-primary ${errors.passwordConfirmation ? "text-red-500" : ''}`}>Confirmar Password</label>
                        <input className={`border rounded-lg p-2 outline-primary ${errors.passwordConfirmation ? "border border-red-500 outline-red-500" : ''}`} type="password" {...register("passwordConfirmation")} id="passwordConfirmation" />
                        <span className="text-red-500">{errors?.passwordConfirmation?.message?.toString()}</span>
                    </div>
                    <button type="submit" className='border w-full my-5 py-2 hover:bg-[#8FC5A3] bg-primary text-white'>Entrar</button>

                    <div className='flex justify-end text-primary'>
                        <Link to="/login">Já tem uma conta?</Link>
                    </div>
                </form>
            </div>


        </div>
    )
}