import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import Button from './Button';
import { Debit } from '../types/Debit';
import DebitServices from '../services/debit.services';

interface ItemCategory {
    status?: string;
    list: Array<Debit>
    label: string
    update: Function
}

export default function ItemCategory(props: ItemCategory) {
    const { status, list, label, update } = props;



    async function handleDelete(item: Debit) {
        const service = new DebitServices()
        await service.deleteDebit(item.id!)
        update()
    }
    const sum = () => {
        const sum = list.reduce((a, b) => a + b.value, 0)
        return sum
    }


    return (
        <div className={`w-full  bg-green-800  h-1/4 border-green-700 border-1 rounded my-2`} >
            <h1 className='font-bold text-gray-100 pl-4'>{label}</h1>
            <div className="custom-table">
                <table>
                    <thead >
                        <tr>
                            <th scope="col" >
                                Data
                            </th>
                            <th scope="col" >
                                Descrição
                            </th>
                            <th scope="col" >
                                Valor
                            </th>

                            {status ?
                                <th scope="col" >
                                    Status
                                </th> : ''
                            }
                            <th scope="col" className='acao'>
                                Ação
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {list ? list.map((val, key) => {
                            return (
                                <tr key={key}>
                                    <td scope="row">
                                        {val.day}
                                    </td>
                                    <td scope="row">
                                        {val.description}
                                    </td>
                                    <td scope="row">
                                        R$ {parseFloat(val.value.toString()).toFixed(2)}
                                    </td>
                                    {status ?
                                        <td scope="row">
                                            Pago
                                        </td>
                                        : ''}
                                    <td scope="row" className='acaoTd'>
                                        <Button title='Excluir' icon='fa-solid fa-trash' color='red' onClick={() => handleDelete(val)} />
                                    </td>
                                </tr>
                            )
                        }) : ''
                        }
                        <tr className='text-center'>
                            <td colSpan={4}>TOTAL R${sum().toFixed(2)}</td>
                        </tr>

                    </tbody>
                </table>
            </div>
        </div >
    );
}