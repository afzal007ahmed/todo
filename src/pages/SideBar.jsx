import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTodos } from "../redux/slices/getAllTodos";
import { clearStateDeleteTodo, deleteTodo } from "../redux/slices/deleteTodo";
import { checkTodo, clearStateCheckTodo } from "../redux/slices/checkTodoSlice";
import { login } from "../redux/slices/loginSlice";
import { useNavigate } from "react-router";
import { routes } from "../routes/routes";

const SideBar = () => {
  const allTodos = useSelector((state) => state.getAllTodosReducer);
  const loginState = useSelector((state) => state.loginReducer);
  const dispatch = useDispatch();
  const nav = useNavigate() ;
  const [deleteId, setDeleteId] = useState(null);
  const deleteStatus = useSelector((state) => state.deleteTodoReducer);
  const checkTodoState = useSelector((state) => state.checkTodoReducer);

  //mount dispatch
  useEffect(() => {
    dispatch(getAllTodos(loginState.userId));
    return () => {
      dispatch(clearStateDeleteTodo());
      dispatch(clearStateCheckTodo());
    };
  }, []);

  //update list
  useEffect(() => {
    if (deleteStatus.success) {
      setDeleteId(null);
      dispatch(getAllTodos(loginState.userId));
    }
  }, [deleteStatus]);

  //update list
  useEffect(() => {
    if (checkTodoState.success) {
      dispatch(getAllTodos(loginState.userId));
    }
    return(() => dispatch(clearStateCheckTodo())) ;
  }, [checkTodoState]);

  if (allTodos.loading) {
    return <p className="my-2">Fetching...</p>;
  }
  return (
    <div className="mt-6 flex flex-col gap-2">
      {allTodos.data &&
        allTodos.data.length > 0 &&
        allTodos.data.map(
          (item) =>
            !item.checked && (
              <div
                className="flex items-center gap-4 p-4 bg-gray-500 text-white rounded-xl cursor-pointer hover:scale-[1.05]"
                onClick={() => nav( routes.TODO.slice( 0 , routes.TODO.length - 3 ) + item._id)}
                key={item._id}
              >
                <input
                  type="checkbox"
                  className="h-[20px] w-[20px]"
                  onChange={(e) => {
                    e.stopPropagation() ;
                    if (e.target.checked) {
                      dispatch(
                        checkTodo({
                          id: item._id,
                          userId: loginState.userId,
                        })
                      );
                    }
                  }}
                  onClick={(e) => e.stopPropagation()}
                />
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <h1 className="text-lg font-bold">{item.task}</h1>
                    <span className="text-xs font-bold">
                      {item.timeDateStamp}
                    </span>
                  </div>
                  <div className="justify-between flex items-center">
                    <p className="text-sm">
                      {item.description.slice(0, 20)}...
                    </p>
                    <button
                      type="button"
                      className="p-1 text-sm bg-red-600 text-white font-bold rounded-md cursor-pointer"
                      onClick={(e) => {
                       e.stopPropagation() ;
                        setDeleteId(item._id);
                        dispatch(
                          deleteTodo({
                            id: item._id,
                            userId: loginState.userId,
                          })
                        );
                      }}
                    >
                      {deleteId === item._id ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                </div>
              </div>
            )
        )}
      {deleteStatus.error && (
        <p className="text-sm font-bold text-red-600 my-2">
          {deleteStatus.error}
        </p>
      )}
      {checkTodoState.error && (
        <p className="text-sm font-bold text-red-600 my-2">
          {checkTodoState.error}
        </p>
      )}
    </div>
  );
};

export default SideBar;
