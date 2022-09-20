import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useCreate from "../hooks/useCreate";

function Create() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const post = useCreate(async (res) => {
    const id = await res.text();
    navigate("../" + id, { replace: true });
  }, console.error);
  const create = handleSubmit(post);

  return (
    <div>
      <h1 className="text-xl">Create a room</h1>
      <form onSubmit={create} className="flex flex-col space-y-2">
        <input
          {...register("roomname", { required: true })}
          className="border rounded p-2 inline-block"
          placeholder="roomname"
        />
        <input
          type="number"
          {...register("players", { required: true, max: 4, min: 2 })}
          className="border rounded p-2 inline-block"
          placeholder="# players"
        />
        <button type="submit" className="border rounded">
          Create
        </button>
      </form>
    </div>
  );
}

export default Create;
