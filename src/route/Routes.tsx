import { useRoutes } from "react-router-dom";

// Main Layout
import Layout from "../module/Layout";
import Home from "../module/Home";
import FetchData from "../module/FetchData";
import PostDetail from "@/module/PostDetail";

export const Routes = () => {
  return useRoutes([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", index: true, element: <Home /> },
        { path: "fetchData", element: <FetchData /> },
        { path: "fetchData/:id", element: <PostDetail /> },
        // { path: "fetchRQ", element: <FetchData /> },
      ],
    },
  ]);
};
