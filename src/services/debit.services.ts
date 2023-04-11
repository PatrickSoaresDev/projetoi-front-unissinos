import { useContext } from "react";
import axios from "../api";
import { PageContext } from "../contexts/Page/PageContext";
import { Debit } from "../types/Debit";

class DebitServices {
  async getListByMonthAndYear(month: number, year: number) {
    
    return await axios.get(`/debit/${month}/${year}`);
  }

  async createDebit(debit: Debit ) {
    return await axios.post("/debit", debit);
  }

  async deleteDebit(id: number ) {
    return await axios.delete(`/debit/${id}`, );
  }


}

export default DebitServices;