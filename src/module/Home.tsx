import { fetchData } from "@/axios/axio";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";

const Home = () => {
  const { isLoading, data, isError, error } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchData,
  });

  if (isError)
    return (
      <div className="flex items-center justify-center w-full h-screen text-lg text-white">
        Error: {error?.message || "Something went wrong"}
      </div>
    );

  return (
    <div className="px-[20px] py-[60px] w-[900px] mx-auto">
      <ul>
        {isLoading ? (
          <div>
            {[1, 2, 3, 4, 5].map((element) => {
              return (
                <Skeleton
                  key={element}
                  className="h-[100px] rounded-xl bg-[#182232] mb-3"
                />
              );
            })}
          </div>
        ) : (
          data?.map(
            (element: { title: string; body: string }, index: number) => {
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
            }
          )
        )}
      </ul>
    </div>
  );
};

export default Home;
