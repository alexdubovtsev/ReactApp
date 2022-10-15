import axios from "axios";
export default class PostService {
  // функция, которая возвращает список постов
  static async getAll(limit = 10, page = 1) {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/posts?limit=10", 
        // передаем параметры в запрос
        {params: {
          _limit: limit,
          _page: page,
        }}
      );
      return response;
  }
}
