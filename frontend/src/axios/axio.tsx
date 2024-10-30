import axios from "axios";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

export const fetchData = async (page: number) => {
  const response = await api.get(`/posts?_limit=4&_start=${page}`);
  return response.status === 200 ? response?.data : [];
};

export const getDataById = async (id: number) => {
  const response = await api.get(`/posts?id=${id}`);
  return response.status === 200 ? response?.data : [];
};

{
  /*
  
  What is gcTime?
  GcTime stand for garbage collection time. If we are using the useQuery hook, to get the data from the server reactQuery will store that data in local cache. Whenever we need the same data it'll not call the api again. It  return the saved data intead of calling the api again. The cache update the data automatically if the data changes.
  
  */
}
