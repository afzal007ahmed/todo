import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { routes } from "./routes/routes";
import { useDispatch, useSelector } from "react-redux";
import { login } from "./redux/slices/loginSlice";

export const Login = () => {
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });
  const nav = useNavigate();
  const loginState = useSelector((state) => state.loginReducer);
  const dispatch = useDispatch();
   
  // Redirecting if already logged in 
  useEffect(() => {
     if( loginState.userId ) {
        nav(routes.HOME)
     }
  } ,[])

  //login success or not
  useEffect(() => {
    if (loginState.exists) {
      setTimeout(() => {
        nav(routes.HOME);
      }, 1000);
    }
  }, [loginState]);

  //loading
  if (loginState.loading) {
    return (
      <div className="h-[90vh] font-bold text-3xl flex justify-center items-center text-violet-700">
        Checking...
      </div>
    );
  }

  //success
  if (loginState.exists) {
    return (
      <div className="h-[90vh] font-bold text-3xl flex justify-center items-center text-green-700">
        Welcome {loginState.name}. Letting you in...
      </div>
    );
  }


  //handle Submit
  const handleSubmit = () => {
    dispatch(login(loginDetails));
  };

  return (
    <div>
      <h1 className="font-bold text-3xl text-purple-800 text-center p-4">
        Login
      </h1>
      <div className="max-w-[400px]  mx-auto mt-12">
        <div className="flex flex-col mb-4">
          <label htmlFor="email" className="font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            placeholder="Please enter your Email."
            id="email"
            className="border p-2 rounded-md"
            value={loginDetails.email}
            onChange={(e) =>
              setLoginDetails((prev) => ({ ...prev, email: e.target.value }))
            }
          />
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="password" className="font-bold mb-2">
            Password
          </label>
          <input
            type="password"
            placeholder="Please enter your password."
            id="password"
            className="border p-2 rounded-md"
            value={loginDetails.password}
            onChange={(e) =>
              setLoginDetails((prev) => ({ ...prev, password: e.target.value }))
            }
          />
        </div>
        { loginState.exists === false && (
          <p className="text-red-600 font-bold text-sm">
            Invalid Email/Password
          </p>
        )}
        {loginState.error && (
          <p className="text-red-600 font-bold text-sm">
            {loginState.error}
          </p>
        )}
        <p className="text-sm font-bold">
          New here?{" "}
          <button
            type="button"
            className="text-blue-500 underline cursor-pointer"
            onClick={() => nav(routes.REGISTER)}
          >
            Register
          </button>
        </p>
        <button
          type="button"
          className="block mt-8 cursor-pointer hover:scale-[1.1] p-2 rounded-md bg-red-400 font-bold text-white"
          onClick={handleSubmit}
        >
          Login
        </button>
      </div>
    </div>
  );
};
