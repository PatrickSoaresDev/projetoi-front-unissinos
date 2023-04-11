import Button from './Button';
import { Credit } from '../types/Credit';
import CreditServices from '../services/credit.services';

interface ItemCategory {
    list: Array<Credit>
    update: Function
}

export default function ItemCredit(props: ItemCategory) {
    const { list, update } = props;

    async function handleDelete(item: Credit) {
        const service = new CreditServices()
        await service.deleteCredit(item.id!)
        update()
    }

    const sum = () => {
        const sum = list.reduce((a, b) => a + b.value, 0)
        return sum
    }



    return (
        <div className={`w-full  bg-green-800  h-1/4 border-green-700 border-1 rounded my-2`} >
            <h1 className='font-bold text-gray-100 pl-4'>Créditos mês Atual</h1>
            <div className="custom-table">
                <table>
                    <thead >
                        <tr>
                            <th scope="col" >
                                Data
                            </th>
                            <th scope="col" >
                                Tipo
                            </th>
                            <th scope="col" >
                                Valor
                            </th>
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
                                        {val.type}
                                    </td>
                                    <td scope="row">
                                        R$ {parseFloat(val.value.toString()).toFixed(2)}
                                    </td>
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