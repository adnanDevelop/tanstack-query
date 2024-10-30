import { Link, useParams } from "react-router-dom";
import { getDataById } from "@/axios/axio";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";

const PostDetail = () => {
  const { id } = useParams();

  const { isLoading, data, isError, error } = useQuery({
    queryKey: ["posts", id],
    queryFn: () => getDataById(id),
  });

  if (isError)
    return (
      <div className="flex items-center justify-center w-full h-screen text-lg text-white ">
        Error: {error?.message || "Something went wrong"}
      </div>
    );

  return (
    <div className="px-[20px] pt-[100px] w-[900px] mx-auto ">
      <ul>
        {isLoading ? (
          <Skeleton className="h-[100px] rounded-xl bg-[#182232] mb-3" />
        ) : (
          <li className="p-[30px] bg-[#182232] text-white mb-3 rounded-md border-l-[3px] border-l-green-500">
            <span className="text-lg text-white w-[40px] h-[40px] rounded-md bg-green-500 flex items-center justify-center">
              {data?.it}
            </span>
            <h2 className="text-2xl font-medium">{data?.title}</h2>
            <p className="mt-2 text-base text-justify text-slate-300">
              {data?.body}
            </p>
            <Link
              to="/"
              className="h-[30px] leading-[25px] text-sm  mt-4 inline-block px-[20px] text-center text-white bg-green-500 rounded-md"
            >
              Go Back
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
};

export default PostDetail;
