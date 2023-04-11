
import { object, string } from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import CurrencyInput from 'react-currency-input-field';
import { PageContext } from '../contexts/Page/PageContext';
import { Debit } from '../types/Debit';
import { Categories } from '../types/Categories';
import { useContext, useEffect, useState } from 'react';
import ItemCredit from './ItemCredit';
import CreditServices from '../services/credit.services';

const schema = object({
    type: string().required("Campo obrigatório"),
    value: string().required(),
})

export interface LauchProps {
    listCredit: Array<Debit>
    categories: Array<Categories>
}



export default function LauchCredit({ ...props }) {
    const { listCredit, update } = props
    useEffect(() => {
        setDate(getDiasMes(toDay.getMonth(), toDay.getFullYear()))

    }, []);

    const { reset, register, handleSubmit: onSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) });
    const page = useContext(PageContext)
    const [date, setDate] = useState<Array<number>>([])
    const [toDay, setToday] = useState<Date>(new Date());
    const [day, setDay] = useState<number>(1);
    const creditServices = new CreditServices()



    const handleSubmit = async (data: any) => {
        data.month = page.id_month;
        data.year = page.year
        data.day = day

        await creditServices.createCredit(data)
        await update()
        reset()


    }

    function getDiasMes(month: number, year: number) {
        month--;

        var date = new Date(year, month, 1);
        var days = [];
        while (date.getMonth() === month) {
            days.push(date.getDate());
            date.setDate(date.getDate() + 1);
        }
        return days;
    }



    return (
        <div>
            <form onSubmit={onSubmit(handleSubmit)} className='px-8'>
                <h2 className='text-2xl font-bold text-center pt-2 text-primary'>Lançamentos Créditos</h2>
                <div className='flex gap-2 mt-4'>
                    <div className='flex flex-col w-full'>
                        <label className={`text-primary ${errors.type ? "text-red-500" : ''} + text-sm`}>Tipo</label>
                        <input className={`border rounded-lg  outline-primary focus:outline-green-400 px-1 ${errors.type ? "border border-red-500 outline-red-500" : ''}`} type="text"  {...register("type")} id="type" />
                        <span className="text-red-500">{errors?.type?.message?.toString()}</span>
                    </div>
                    <div className='flex flex-col w-full'>
                        <label className={`text-primary ${errors.day ? "text-red-500" : ''} + text-sm`}>Data</label>
                        <select defaultValue={toDay.getDate()} className="border rounded-lg  outline-primary focus:outline-green-400  px-1" onChange={(e) => setDay(parseInt(e.target.value))} >
                            {
                                date.map((val, key) => {

                                    if (val == toDay.getDate()) {
                                        return (
                                            <option value={val} key={key}>{val}</option>
                                        )
                                    } else {
                                        return (
                                            <option value={val} key={key}>{val}</option>
                                        )
                                    }
                                })
                            }
                        </select>
                        <span className="text-red-500">{errors?.value?.message?.toString()}</span>
                    </div>
                    <div className='flex flex-col w-full'>
                        <label className={`text-primary ${errors.value ? "text-red-500" : ''} + text-sm`}>Valor</label>
                        <input type='number' id='value' {...register("value")} className='border rounded-lg  outline-primary focus:outline-green-400  px-1' />
                        <span className="text-red-500">{errors?.value?.message?.toString()}</span>
                    </div>
                </div>

                <div className='flex justify-end'>
                    <button type="submit" className='border just mt-4 w-1/6   hover:bg-[#8FC5A3] bg-primary text-white'>Lançar</button>
                </div>
            </form >
            <div className='px-8'>
                <ItemCredit list={listCredit} update={update} />
            </div>
        </div>
    );
} 