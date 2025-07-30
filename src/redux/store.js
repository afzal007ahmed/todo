import { configureStore } from "@reduxjs/toolkit";
import registerReducer from './slices/registerSlice' ;
import emailCheckReducer from "./slices/checkEmailSlice";
import loginReducer from "./slices/loginSlice";
import addTodoReducer from "./slices/addTodoSlice" ;
import getAllTodosReducer from "./slices/getAllTodos";
import deleteTodoReducer from "./slices/deleteTodo" ;
import checkTodoReducer from "./slices/checkTodoSlice" ;
import getATodoReducer from "./slices/getATodoSlice";
import updateTodoReducer from "./slices/updateTodo"

const store = configureStore({
    reducer : {
        emailCheckReducer,
        registerReducer,
        loginReducer,
        addTodoReducer,
        getAllTodosReducer,
        deleteTodoReducer,
        checkTodoReducer,
        getATodoReducer,
        updateTodoReducer
    }
})


export default store ;