import { useNavigate, useParams } from "react-router";
import { routes } from "../routes/routes";
import useUpdateAdd from "./customHooks/useUpdateAdd";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { clearStateUpdateTodo, updateTodo } from "../redux/slices/updateTodo";
import { getAllTodos } from "../redux/slices/getAllTodos";

const UpdateTodo = () => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const loginState = useSelector((state) => state.loginReducer);
  const { id } = useParams();
  const addTodoState = useSelector((state) => state.addTodoReducer);
  const allTodos = useSelector((state) => state.getAllTodosReducer);
  const { errors, details, handleChange, checkEmpty, setDetails } =
    useUpdateAdd();
  const updateTodoState = useSelector((state) => state.updateTodoReducer);

  //cleanUp
  useEffect(() => {
    return () => dispatch(clearStateUpdateTodo());
  }, []);

  //done 
  useEffect(() => {
    if( updateTodoState.success ) {
        dispatch(getAllTodos(loginState.userId)) ;
        setTimeout(() => {
           nav(routes.HOME);
        },1000)
    }
  } , [updateTodoState])

  useEffect(() => {
    if (!allTodos || !allTodos.data || allTodos.data.length === 0) {
      dispatch(clearStateUpdateTodo());
      nav(routes.HOME);
      return;
    }
    let item = allTodos.data.filter((i) => i._id === id && !i.checked);
    if (item.length === 0) {
      dispatch(clearStateUpdateTodo());
      nav(routes.HOME);
      return;
    }
    item = item[0];
    setDetails({
      title: item.task,
      description: item.description,
    });
  }, [allTodos]);

  //handle submit
  function handleSubmit() {
    if (checkEmpty()) {
      return;
    }
    dispatch(
      updateTodo({
        title: details.title,
        description: details.description,
        id: id,
        userId: loginState.userId,
      })
    );
  }

  //loading
  if (updateTodoState.loading) {
    return (
      <div className="min-h-[80vh] flex justify-center items-center text-2xl font-bold">
        Updating...
      </div>
    );
  }

  if (updateTodoState.success) {
    return (
      <div className="min-h-[80vh] flex justify-center items-center text-2xl font-bold text-green-600">
        Updated Successfully!
      </div>
    );
  }

  return (
    <div className="p-4">
      <p className="text-center font-bold text-xl">Update you task</p>
      <div>
        <div className="flex flex-col gap-2 mt-4">
          <label className="text-sm font-bold" htmlFor="title">
            Task Title
          </label>
          <input
            type="text"
            id="title"
            placeholder="Enter your task title here."
            className="p-2 border rounded-md"
            name="title"
            onChange={(e) => handleChange("title", e.target.value)}
            value={details.title}
          />
          {errors.title && (
            <p className="text-red-600 font-bold text-sm">{errors.title}</p>
          )}
        </div>
        <div className="flex flex-col gap-2 mt-4">
          <label className="text-sm font-bold" htmlFor="description">
            Task Description
          </label>
          <textarea
            id="description"
            name="description"
            placeholder="Enter your task desription here."
            className="p-2 border rounded-md"
            onChange={(e) => handleChange("description", e.target.value)}
            value={details.description}
          />
          {errors.description && (
            <p className="text-red-600 font-bold text-sm">
              {errors.description}
            </p>
          )}
        </div>
        {updateTodoState.error && (
          <p className="text-red-600 font-bold my-2">{updateTodoState.error}</p>
        )}
        <button
          className="p-2 cursor-pointer bg-green-600 font-bold text-white rounded-md  hover:scale-[1.1] mt-12"
          onClick={handleSubmit}
        >
          Update Todo
        </button>
        <button
          className="p-2 cursor-pointer bg-red-600 ml-4 font-bold text-white rounded-md  hover:scale-[1.1] mt-12"
          onClick={() => nav(routes.HOME)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default UpdateTodo;
