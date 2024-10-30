import { fetchData } from "@/axios/axio";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { NavLink } from "react-router-dom";

const Home = () => {
  const { isLoading, data, isError, error } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchData,
    // staleTime: 5000,
    refetchInterval: 1000,
    // refetchIntervalInBackground: true,
  });

  console.log(data, "home data");

  if (isError)
    return (
      <div className="flex items-center justify-center w-full h-screen text-lg text-white ">
        Error: {error?.message || "Something went wrong"}
      </div>
    );

  return (
    <div className="px-[20px] pt-[100px] w-[900px] mx-auto ">
      <ul className="grid grid-cols-2 gap-4">
        {isLoading ? (
          <>
            {[1, 2, 3, 4, 5].map((element) => {
              return (
                <Skeleton
                  key={element}
                  className="h-[100px] rounded-xl bg-[#182232] mb-3"
                />
              );
            })}
          </>
        ) : (
          data?.map(
            (
              element: { title: string; body: string; id: string },
              index: number
            ) => {
              return (
                <li
                  key={index}
                  className="p-[30px] bg-[#182232] text-white mb-3 rounded-md border-l-[3px] border-l-green-500"
                >
                  <span className="text-lg text-white w-[40px] h-[40px] rounded-md bg-green-500 flex items-center justify-center">
                    {element?.id}
                  </span>
                  <NavLink to={`/fetchData/${element?.id}`}>
                    <h2 className="text-2xl font-medium">{element?.title}</h2>
                    <p className="mt-2 text-base text-justify text-slate-300">
                      {element?.body}
                    </p>
                  </NavLink>
                </li>
              );
            }
          )
        )}
      </ul>
    </div>
  );
};

export default Home;
