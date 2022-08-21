import axios from "axios";

export const BASE_URL = "https://jsonplaceholder.typicode.com";

export interface User {
  id : number;
  name : string;
  username : boolean;
  email: string;
}

export const fetchUser = async (id: number): Promise<User | null> => {
  try {
    const axiosResponse = await axios.get<User>(`${BASE_URL}/users/${id}`);
    return axiosResponse.data;
  } catch (e) {
    return null;
  }
};
