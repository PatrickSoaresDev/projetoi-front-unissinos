import { createContext } from "react";
import { Debit } from "../../types/Debit";
import { Categories } from "../../types/Categories";

export type PageContextType = {
    month: string;
    id_month: number;
    year: number;
    setCategories: (categories: Array<Categories>) => void;

}

export const PageContext = createContext<PageContextType>(null!);

