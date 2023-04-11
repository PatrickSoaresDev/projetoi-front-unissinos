
import axios from "../api";
import { Debit } from "../types/Debit";

class CreditServices {
  async getListByMonthAndYear(month: number, year: number) {
    
    return await axios.get(`/credit/${month}/${year}`);
  }

  async createCredit(debit: Debit ) {
    return await axios.post("/credit", debit);
  }

  async deleteCredit(id: number ) {
    return await axios.delete(`/credit/${id}`, );
  }


}

export default CreditServices;