import axios from "../api";
import { User } from "../types/User";

class UserServices {
  async createUser(user: User) {
    return await axios.post("/users", user);
  }

  async createSession(data: { email: string; password: string }) {
    return await axios.post("users/login", data);
  }


}

export default UserServices;
