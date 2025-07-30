import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router";
import { routes } from "./routes/routes";
import { useEffect } from "react";
import SideBar from "./pages/SideBar";

const Home = () => {
  const loginState = useSelector((state) => state.loginReducer);
  const nav = useNavigate();

  //redirecting if not logged in
  useEffect(() => {
     if( !loginState.userId){
        nav(routes.LOGIN) ;
     }
  } , [])

  return (
    <div>
      <p className="font-bold text-red-600 text-center pt-2">
        Please do not refresh the page.Otherwise you have to login again.
      </p>
      <h1 className="font-bold text-3xl text-purple-800 text-center p-4 shadow-md">
        Todo List{" "}
        <span className="text-sm">( logged in as : {loginState.name})</span>
      </h1>
      <div className="flex flex-wrap">
        <div className="pt-8 flex-1 shrink-0 min-w-[300px]">
          <p className="font-bold text-sm">YOUR TODO'S</p>
          <SideBar/>
          <button
            className=" flex items-center cursor-pointer border p-2 rounded-md bg-green-600 font-bold text-white hover:scale-[1.1] mt-4"
            type="button"
            onClick={() => nav(routes.ADD_TODO)}
          >
            + Add Task
          </button>
        </div>
        <div className="min-w-[400px] flex-2">
          { loginState.userId && <Outlet/>}
        </div>
      </div>
    </div>
  );
};

export default Home;
