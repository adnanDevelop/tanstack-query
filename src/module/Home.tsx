import { fetchData } from "@/axios/axio";
import { useEffect, useState } from "react";

const Home = () => {
  const [post, setPost] = useState([]);

  const FetchClientData = async () => {
    try {
      const response = await fetchData();
      setPost(response?.data);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(post);

  useEffect(() => {
    FetchClientData();
  }, []);

  return (
    <div className="px-[20px] py-[60px] w-[900px] mx-auto">
      <ul>
        {post?.map((element: { title: string; body: string }, index) => {
          return (
            <li
              key={index}
              className="p-[30px] bg-[#182232] text-white mb-3 rounded-md border-l-[3px] border-l-[#2b5ca9]"
            >
              <h2 className="text-xl font-medium">{element?.title}</h2>
              <p className="mt-2 text-base text-justify text-white">
                {element?.body}
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Home;
