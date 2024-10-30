import { useState } from "react";
import { NavLink } from "react-router-dom";

// Components
import {
  Pagination,
  PaginationItem,
  PaginationNext,
  PaginationContent,
  PaginationPrevious,
  PaginationLink,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Skeleton } from "@/components/ui/skeleton";
import { deleteCard, fetchData } from "@/axios/axio";
import {
  keepPreviousData,
  useQueryClient,
  useMutation,
  useQuery,
} from "@tanstack/react-query";

const Home = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const queryClient = useQueryClient();

  const { isLoading, data, isError, error } = useQuery({
    queryKey: ["posts", page, limit],
    queryFn: () => fetchData(page, limit),
    // staleTime: 5000,
    // refetchInterval: 500,
    // refetchIntervalInBackground: true,
    placeholderData: keepPreviousData,
  });

  const deleteMutation = useMutation({
    mutationKey: ["posts"],
    mutationFn: (deleteId: string) => deleteCard(deleteId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

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
          data?.data?.map(
            (
              element: {
                title: string;
                body: string;
                it: string;
                _id: string;
              },
              index: number
            ) => {
              return (
                <li
                  key={index}
                  className="p-[30px] bg-[#182232] text-white mb-3 rounded-md border-l-[3px] border-l-green-500"
                >
                  <span className="text-lg text-white w-[40px] h-[40px] rounded-md bg-green-500 flex items-center justify-center">
                    {element?.it}
                  </span>
                  <NavLink to={`/fetchData/${element?._id}`}>
                    <h2 className="text-2xl font-medium">{element?.title}</h2>
                    <p className="mt-2 text-base text-justify text-slate-300">
                      {element?.body}
                    </p>
                  </NavLink>
                  <button
                    onClick={() => deleteMutation.mutate(element?._id)}
                    className="h-[30px] leading-[25px] text-sm  mt-4 inline-block px-[20px] text-center text-white bg-red-500 rounded-md"
                  >
                    Delete
                  </button>
                </li>
              );
            }
          )
        )}
      </ul>
      <div className="py-[40px] flex items-center justify-between">
        <div>
          <Select onValueChange={(value) => setLimit(parseInt(value))}>
            <SelectTrigger className="w-[60px] px-2 border-white text-white">
              <SelectValue placeholder="10" />
            </SelectTrigger>
            <SelectContent className="bg-[#182232] text-white border-green-500">
              <SelectGroup>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="25">25</SelectItem>
                <SelectItem value="50">50</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => setPage((page) => (page > 1 ? page - 1 : 1))}
                  className="select-none"
                />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink className="text-white cursor-pointer focus:bg-green-500 hover:bg-green-500 hover:text-white">
                  {page}
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext
                  onClick={() => {
                    if (page < data?.pages) setPage((page) => page + 1);
                  }}
                  className="select-none"
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
};

export default Home;
