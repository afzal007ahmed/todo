import { Routes, Route } from "react-router";
import { Register } from "../Register";
import { routes } from "./routes";
import { Login } from "../Login";
import Home from "../Home";
import AddTodo from "../pages/AddTodo";
import HomeTodo from "../pages/HomeTodo";
import SingleTodo from "../pages/SingleTodo";
import UpdateTodo from "../pages/UpdateTodo";

const RouteManager = () => {
  return (
    <Routes>
      <Route path={routes.REGISTER} element={<Register />} />
      <Route path={routes.LOGIN} element={<Login />} />
      <Route path={routes.HOME} element={<Home />}>
        <Route path={routes.ADD_TODO} element={<AddTodo />} />
         <Route index element={<HomeTodo/>} />
         <Route path={routes.TODO} element={<SingleTodo/>} />
         <Route path={ routes.UPDATE_TODO} element={<UpdateTodo/>}/>
      </Route>
    </Routes>
  );
};

export default RouteManager;
