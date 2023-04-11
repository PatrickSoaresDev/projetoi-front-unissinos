import { Debit } from "./Debit"

export type Categories = {
    category: string
    id?:number
    debits: Debit[]
}