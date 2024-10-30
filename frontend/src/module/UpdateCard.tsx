import { getDataById, updateCard } from "@/axios/axio";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

const UpdateCard = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ["posts", id],
    queryFn: () => getDataById(id),
  });

  const updateMutation = useMutation({
    mutationKey: ["posts"],
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: { title: string; body: string };
    }) => updateCard(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      navigate("/");
    },
  });

  const submitData = (data) => {
    updateMutation.mutate({ id, data });
  };

  return (
    <div className="px-[20px] pt-[150px] w-[900px] mx-auto ">
      <form onSubmit={handleSubmit(submitData)}>
        <Input
          type="title"
          placeholder="Title"
          className="mb-4 text-xs text-white"
          defaultValue={data?.title}
          {...register("title")}
        />
        <Textarea
          placeholder="Type your message here."
          className="h-[100px] resize-none text-xs text-white"
          defaultValue={data?.body}
          {...register("body")}
        />
        <div className="flex items-center justify-center mt-6">
          <button
            type="submit"
            className="h-[30px] leading-[25px] text-sm  mt-4 inline-block px-[20px] text-center text-white bg-green-500  rounded-md"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateCard;
