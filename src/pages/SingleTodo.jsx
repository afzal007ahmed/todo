import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearStateGetATodo, getATodo } from "../redux/slices/getATodoSlice";
import { useNavigate, useParams } from "react-router";
import { routes } from "../routes/routes";

const SingleTodo = () => {
  const dispatch = useDispatch();
  const loginState = useSelector((state) => state.loginReducer);
  const todo = useSelector((state) => state.getATodoReducer);
  const { id } = useParams();
  const nav = useNavigate();
  const allTodos = useSelector((state) => state.getAllTodosReducer);

  useEffect(() => {
    return () => dispatch(clearStateGetATodo());
  }, []);

  useEffect(() => {
    dispatch(getATodo({ id: id, userId: loginState.userId }));
  }, [id]);

  //checking its deletd or not

  useEffect(() => {

    if ( !allTodos || allTodos?.data?.length === 0 ) {
      dispatch(clearStateGetATodo());
      nav(routes.HOME);
      return ;
    }
    const res = allTodos?.data?.filter((item) => item._id === id && !item.checked);
    if (!res.length) {
      dispatch(clearStateGetATodo());
      nav(routes.HOME);
      return ;
    }
  }, [allTodos]);

  //loading
  if (todo.loading) {
    return (
      <div className="mt-8 bg-gray-500 mx-4 p-4 text-white rounded-md min-h-[75vh] flex justify-center items-center text-2xl font-bold">
        Loading...
      </div>
    );
  }

  //error
  if (todo.error) {
    return (
      <div className="min-h-[75vh] flex justify-center items-center text-2xl font-bold text-red-600">
        {todo.error}
      </div>
    );
  }

  return (
    <div className="mt-8 bg-gray-500 mx-4 p-4 text-white rounded-md min-h-[75vh]">
      <div className="flex justify-between items-center">
        <div></div>
        <div>
          <h1 className="text-center font-bold text-xl">{todo.data?.task}</h1>
          <p className="text-xs text-center font-bold">
            {todo.data?.timeDateStamp}
          </p>
        </div>
        <button
          type="button"
          className="text-sm font-bold bg-purple-500 p-2 rounded-md hover:scale-[1.1] cursor-pointer"
          onClick={() => nav(routes.UPDATE_TODO.slice( 0 , routes.UPDATE_TODO.length - 3 ) + todo?.data?._id)}
        >
          Update
        </button>
      </div>
      <p className="mt-12 text-xl">{todo.data?.description}</p>
    </div>
  );
};

export default SingleTodo;
