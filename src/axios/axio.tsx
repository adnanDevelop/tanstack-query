import axios from "axios";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

export const fetchData = async () => {
  const response = await api.get("/postss/");
  return response.status === 200 ? response?.data : [];
};
