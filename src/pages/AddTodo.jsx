import { useNavigate } from "react-router";
import { routes } from "../routes/routes";
import useUpdateAdd from "./customHooks/useUpdateAdd";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, clearStateAddTodo } from "../redux/slices/addTodoSlice";
import { useEffect } from "react";
import { getAllTodos } from "../redux/slices/getAllTodos";

const AddTodo = () => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const loginState = useSelector((state) => state.loginReducer);
  const addTodoState = useSelector((state) => state.addTodoReducer);
  const { errors, details, handleChange, checkEmpty } =
    useUpdateAdd();

  //unmount
  useEffect(() => {
    return () => dispatch(clearStateAddTodo());
  }, []);

  //handle success or failure .
  useEffect(() => {
    if (addTodoState.success) {
        dispatch(getAllTodos(loginState.userId)) ;
      setTimeout(() => {
        nav(routes.HOME);
      }, 1000);
    }
  }, [addTodoState]);

  //handle submit
  function handleSubmit() {
    if (checkEmpty()) {
      return;
    }
    dispatch(
      addTodo({
        title: details.title,
        description: details.description,
        userId: loginState.userId,
      })
    );
  }

  //handle success
  if (addTodoState.success) {
    return (
      <div className="min-h-[80vh] flex justify-center items-center text-2xl font-bold text-green-600">
        Added Successfully!
      </div>
    );
  }

  //handle loading
  if (addTodo.loading) {
    return (
      <div className="min-h-[80vh] flex justify-center items-center text-2xl font-bold text-violet-600">
        Adding...
      </div>
    );
  }

  return (
    <div className="p-4">
      <p className="text-center font-bold text-xl">Add you task</p>
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
        { addTodoState.error && <p className="text-red-600 font-bold my-2">{addTodoState.error}</p>}
        <button
          className="p-2 cursor-pointer bg-green-600 font-bold text-white rounded-md  hover:scale-[1.1] mt-12"
          onClick={handleSubmit}
        >
          Add Todo
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

export default AddTodo;
