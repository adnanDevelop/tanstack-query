import { useRoutes } from "react-router-dom";

// Main Layout
import Layout from "../module/Layout";
import Home from "../module/Home";
import FetchData from "../module/FetchData";

export const Routes = () => {
  return useRoutes([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", index: true, element: <Home /> },
        { path: "fetchData", element: <FetchData /> },
      ],
    },
  ]);
};
