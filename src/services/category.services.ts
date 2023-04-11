import axios from "../api";

class CategoryServices {
  async getList() {
    return await axios.get("/category");
  }

  async createCategory(data: {category: string }) {
    return await axios.post("/category", data);
  }


}

export default CategoryServices;