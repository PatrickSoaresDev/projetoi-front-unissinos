import { useEffect, useState } from "react"
import { PageContext } from "./PageContext"
import { faList } from "@fortawesome/free-solid-svg-icons"
import DebitServices from "../../services/debit.services"
import CategoryServices from "../../services/category.services"
import { Categories } from "../../types/Categories"
import { Debit } from "../../types/Debit"

export const PageProvider = ({ children }: { children: JSX.Element }) => {
    const [month, setMonth] = useState<string>('')
    const [idMonth, setIdMonth] = useState<number>(0)
    const [year, setYear] = useState<number>(2023)
    const [categories, setCategories] = useState<Array<Categories>>([])
    const [debits, setDebits] = useState<Array<Debit>>([])

    const monthString = ['Janeiro', "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]


    useEffect(() => {
        const today = new Date()
        const mont = today.getMonth()
        setIdMonth(mont + 1)
        setMonth(monthString[mont])
        setYear(today.getFullYear())


    }, [])






    const setCategoriesList = (categories: Array<Categories>) => {
        setCategories(categories)
    }




    return (
        <PageContext.Provider value={{ year: year, month: month, id_month: idMonth, setCategories: setCategoriesList }} >
            {children}
        </PageContext.Provider>
    )


} 