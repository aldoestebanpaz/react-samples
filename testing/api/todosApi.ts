import axios from "axios";

export const BASE_URL = "https://jsonplaceholder.typicode.com";

interface Todo {
  userId : number;
  id : number;
  title : string;
  completed : boolean;
}

export const fetchTodos = async (): Promise<Todo[]> => {
  try {
    const axiosResponse = await axios.get<Todo[]>(`${BASE_URL}/todos`);
    return axiosResponse.data;
  } catch (e) {
    return [];
  }
};
