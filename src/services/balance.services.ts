import axios from "../api";

class BalanceServices {
  async getBalance() {
    return await axios.get("/balance");
  }


}

export default BalanceServices;