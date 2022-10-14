import axios from "axios";
export default class PostService {
  // функция, которая возвращает список постов
  static async getAll() {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/posts"
      );
      return response.data;
  }
}
