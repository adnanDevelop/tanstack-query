import axios from "axios";

const api = axios.create({
  // baseURL: "https://jsonplaceholder.typicode.com",
  baseURL: "http://localhost:3000",
});

export const fetchData = async (
  page: number,
  limit: number
  // search: string
) => {
  // const response = await api.get(`/posts?_limit=4&_start=${page}`);
  // `/api/data?page=${page}&limit=${limit}&search=${search}`
  const response = await api.get(`/api/data?page=${page}&limit=${limit}`);
  return response.status === 200 ? response?.data : [];
};

export const getDataById = async (id: number) => {
  const response = await axios.get(`http://localhost:3000/api/data/${id}`);
  return response.status === 200 ? response?.data : [];
};

export const deleteCard = async (id: string) => {
  const response = await axios.delete(
    `http://localhost:3000/api/data/delete/${id}`
  );
  return response.status === 200
    ? "Card deleted successfully "
    : "Error while deleting card";
};

{
  /*
  
  What is gcTime?
  GcTime stand for garbage collection time. If we are using the useQuery hook, to get the data from the server reactQuery will store that data in local cache. Whenever we need the same data it'll not call the api again. It  return the saved data intead of calling the api again. The cache update the data automatically if the data changes.
  
  */
}
