import axios, { AxiosError, AxiosResponse } from "axios";
import { BASE_URL, fetchTodos } from "./todosApi";

jest.mock("axios");
const mockModuleAxios = axios as jest.Mocked<typeof axios>;

describe("todoApi", () => {
  it("should return todos list when API call is successful", async () => {
    // arrange
    const mockTodos = [
      {
        "userId": 1,
        "id": 1,
        "title": "delectus aut autem",
        "completed": false
      },
      {
        "userId": 1,
        "id": 2,
        "title": "quis ut nam facilis et officia qui",
        "completed": false
      },
    ];
    mockModuleAxios.get.mockResolvedValueOnce({ status: 200, data: mockTodos });
    // Syntactic sugar function for:
    //   mockModuleAxios.get.mockImplementationOnce(() => Promise.resolve(value));

    // act
    const result = await fetchTodos();

    // assert
    expect(mockModuleAxios.get).toHaveBeenCalledWith(`${BASE_URL}/todos`);
    expect(result).toEqual(mockTodos);
  });

  it("should return empty list when the API call fails", async () => {
    // arrange
    const axiosError = new AxiosError('Request failed with status code 500', 'ESOMETHING', { }, { }, { status: 500, data: null } as AxiosResponse<null, any>);
    mockModuleAxios.get.mockRejectedValueOnce(axiosError);
    // Syntactic sugar function for:
    //   mockModuleAxios.get.mockImplementationOnce(() => Promise.reject(value));

    // act
    const result = await fetchTodos();

    // assert
    expect(mockModuleAxios.get).toHaveBeenCalledWith(`${BASE_URL}/todos`);
    expect(result).toEqual([]);
  });
});
