
import ItemCategory from './ItemCategory';
import { Categories } from '../types/Categories';



export default function Category({ ...props }) {
    const { listCategories, update } = props

    return (
        <div className='px-8'>
            <h1 className='text-2xl font-bold text-center pt-2 text-primary mb-9'>Categorias</h1>
            {
                listCategories.map((el: Categories) => {
                    if (el.debits.length)
                        return (
                            <div key={el.id}>
                                <ItemCategory list={el.debits} label={el.category} update={update} />
                            </div>
                        )
                })
            }

        </div>
    );
}