import { useContext, useEffect, useRef, useState } from "react"
import { AuthContext } from "../../contexts/Auth/AuthContext";
import Category from '../../components/Category'
import './style.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import Lauch from "../../components/LauchDebit";
import { PageContext } from "../../contexts/Page/PageContext";
import DebitServices from "../../services/debit.services";
import CategoryServices from "../../services/category.services";
import CreditServices from "../../services/credit.services";
import { Debit } from "../../types/Debit";
import { Categories } from "../../types/Categories";
import LauchCredit from "../../components/LauchCredit";
import { Credit } from "../../types/Credit";
import BalanceServices from "../../services/balance.services";



export default function Home() {
    const { signout, user } = useContext(AuthContext);
    const exitIcon = "fa-solid fa-right-from-bracket" as IconProp
    const happyIcon = "fa-solid fa-face-smile" as IconProp
    const sadIcon = "fa-solid fa-face-sad-tear" as IconProp
    const page = useContext(PageContext)
    const [debits, setListDebit] = useState<Array<Debit>>([])
    const [categories, setCategories] = useState<Array<Categories>>([])
    const [credities, setCredities] = useState<Array<Credit>>([])
    const [balance, setBalance] = useState<number>(0)

    useEffect(() => {
        const getData = async () => {
            await updateData()
        }
        getData().catch(e => {
            console.log(e)
        })

    }, [])



    async function getDebit() {

        const debit = new DebitServices()
        await debit.getListByMonthAndYear(page.id_month, page.year).then(res => {
            setListDebit(res.data)
        }).catch(e => {
            console.log(e)
        })
    }
    async function getCategories() {
        const category = new CategoryServices()
        await category.getList().then(res => {
            setCategories(res.data)
        }).catch(e => {
            console.log(e)
        })
    }
    async function getCredits() {
        const category = new CreditServices()
        await category.getListByMonthAndYear(page.id_month, page.year).then(res => {
            setCredities(res.data)
        }).catch(e => {
            console.log(e)
        })
    }
    async function getBalance() {
        const balance = new BalanceServices()
        await balance.getBalance().then(res => {
            setBalance(res.data)
        }).catch(e => {
            console.log(e)
        })
    }

    async function updateData() {
        await getDebit()
        await getCategories()
        await getCredits()
        await getBalance()
    }





    return (
        <div className="flex flex-col justify-center items-center w-full h-[100vh]">
            <div className="h-8 w-full bg-green-300 text-gray-200 flex">
                <div className="flex w-full justify-end items-center text-gray-700">
                    <p>{page.month + '/' + page.year}</p>

                </div>
                <div className="flex w-full justify-end items-center pr-10 text-gray-700">
                    {balance < 0 ?
                        <p className={`text-red-500 text-lg pr-96`}>
                            Saldo: R${balance.toFixed(2)}

                            <FontAwesomeIcon icon={sadIcon} className="cursor-pointer pl-1" color="red" />
                        </p>

                        :
                        <p className={`text-[green] text-lg pr-96`}>
                            Saldo: R${balance.toFixed(2)}

                            <FontAwesomeIcon icon={happyIcon} className="cursor-pointer pl-1" color="green" />
                        </p>
                    }
                    <p className="text-lg px-4 ">{user?.name}</p>
                    <FontAwesomeIcon icon={exitIcon} className="cursor-pointer" onClick={signout} />
                </div>
            </div>
            <div className="grid grid-cols-6 grid-flow-col h-full w-full bg-green-100">
                <div className="col-span-2 overflow-auto scrollbar" id="style">
                    {categories.length ?
                        <Category listCategories={categories} update={updateData} />
                        : ''
                    }
                </div>
                <div className="col-span-2 border border-l-green-700 border-r-green-700 border-t-transparent ">
                    <Lauch listDebit={debits} categories={categories} update={updateData} />
                </div>
                <div className="col-span-2 ">
                    <LauchCredit listCredit={credities} categories={categories} update={updateData} />
                </div>
            </div>
        </div>
    )
}