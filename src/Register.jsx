import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkEmail, clearStateCheckEmail } from "./redux/slices/checkEmailSlice";
import { clearStateRegister, register } from "./redux/slices/registerSlice";
import { useNavigate } from "react-router";
import { routes } from "./routes/routes";

export const Register = () => {
  const [registerDetails, setRegisterDetails] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [registerErrors, setRegisterErrors] = useState({
    email: null,
    password: null,
  });
  const nav = useNavigate() ;
  const dispatch = useDispatch() ;
  const emailCheckState = useSelector(( state ) => state.emailCheckReducer ) ;
  const registerState = useSelector(( state ) => state.registerReducer ) ;

  //cleanUp useEffect 
  useEffect(() => {
    return(() => {
      dispatch(clearStateCheckEmail()) ;
      dispatch(clearStateRegister()) ;
    })
  } , [])

  //useEffect for register the user 
  useEffect(() => {
     if( registerState.success ) {
       setTimeout(() => {
          nav(routes.LOGIN) ;
       },1000)
     }
  } , [registerState])

  //useEffect to check email exists or not 
  useEffect(() => {
     if( emailCheckState.exists){
        setRegisterErrors(( prev ) => ({...prev , email : 'Email already exists. Please try login.'}))
     }
     else if( emailCheckState.error ) {
        setRegisterErrors(( prev ) => ({...prev , email : emailCheckState.error})) ;
     }
  },[ emailCheckState])

  //check email exists or not 
  function checkEmailExists(){
    dispatch( checkEmail( registerDetails.email ));
  }
  
  //check password pattern
  function checkPasswordPattern() {
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z])(?=.*[!@#%^&*().,])[!@#%^&*().,A-Za-z0-9]{8,}$/;
    return passwordRegex.test(registerDetails.password);
  }

  //check email pattern
  function checkEmailPattern() {
    const emailRegex =
      /^[A-Za-z0-9]{1,}[!@#$%^&*]*@(gmail.com|yahoo.com|outlook.com)$/;
    return emailRegex.test(registerDetails.email);
  }

  //function to check email errors
  function handleEmailOnBlur() {
    if (registerDetails.email.length === 0) {
      setRegisterErrors((prev) => ({
        ...prev,
        email: "Please enter email address.",
      }));
    } else if (!checkEmailPattern()) {
      setRegisterErrors((prev) => ({
        ...prev,
        email: "Please enter valid email.",
      }));
    } else {
        checkEmailExists(); 
    }
  }

  //check password error
  function handlePasswordOnBlur() {
    if (registerDetails.password.length === 0) {
      setRegisterErrors((prev) => ({
        ...prev,
        password: "Please enter you password.",
      }));
    } else if (!checkPasswordPattern()) {
      setRegisterErrors((prev) => ({
        ...prev,
        password: "Please follow the rules given below",
      }));
    }
  }

  function handleSubmit() {
    dispatch( register(registerDetails) );
  }
  
  //loading state
  if( registerState.loading ) {
    return <div className="h-[90vh] font-bold text-3xl flex justify-center items-center text-violet-700">Registering...</div>
  }
  
  //Error 
  if( registerState.error ) {
    return <div className="h-[90vh] font-bold text-3xl flex justify-center items-center text-red-700">{registerState.error}</div>
  }

  //success
  if( registerState.success ) {
    return <div className="h-[90vh] font-bold text-3xl flex justify-center items-center text-green-700">Redirecting to Login Page...</div>
  }

  return (
    <div>
      <h1 className="font-bold text-3xl text-purple-800 text-center p-4">
        Register
      </h1>
      <div className="max-w-[400px] mx-auto mt-12">
        <div className="flex flex-col mb-4">
          <label htmlFor="name" className="font-bold mb-2">
            Name
          </label>
          <input
            type="text"
            placeholder="Please enter your name."
            id="name"
            className="border p-2 rounded-md"
            value={registerDetails.name}
            onChange={(e) =>
              setRegisterDetails((prev) => ({ ...prev, name: e.target.value }))
            }
          />
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="email" className="font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            placeholder="Please enter your email."
            id="email"
            className="border p-2 rounded-md"
            value={registerDetails.email}
            onChange={(e) =>
              setRegisterDetails((prev) => ({ ...prev, email: e.target.value }))
            }
            onBlur={handleEmailOnBlur}
          />
          {registerErrors.email && (
            <p className="text-red-600 font-bold text-sm mt-2">
              {registerErrors.email}
            </p>
          )}
          <p className="text-sm mt-2">
            xxx@(gmail.com,yahoo.com,outlook.com) allowed.
          </p>
        </div>
        <div className="flex flex-col">
          <label htmlFor="password" className="font-bold mb-2">
            Password
          </label>
          <input
            type="password"
            placeholder="Please enter your password."
            id="password"
            className="border p-2 rounded-md"
            value={registerDetails.password}
            onChange={(e) =>
              setRegisterDetails((prev) => ({
                ...prev,
                password: e.target.value,
              }))
            }
            onBlur={handlePasswordOnBlur}
          />
          {registerErrors.password && (
            <p className="text-red-600 font-bold text-sm mt-2">
              {registerErrors.password}
            </p>
          )}
          <p className="text-sm mt-2">
            A password must contain minimum 8 characters and must have atleast
            one Uppercase(A-Z), one Lowercase(a-z),one digit(0-9) and one
            Special character(!@#$%^&*())
          </p>
        </div>
        <p className="font-bold text-sm">
          Already registered?{" "}
          <button type="button" className="underline text-blue-500 cursor-pointer" onClick={()=>nav(routes.LOGIN)}>
            Login
          </button>
        </p>
        <button
          type="button"
          className="block mt-8 cursor-pointer hover:scale-[1.1] p-2 rounded-md bg-red-400 font-bold text-white"
          disabled={
            registerErrors.email ||
            registerErrors.password ||
            registerDetails.name.length === 0
          }
          onClick={handleSubmit}
        >
          Register
        </button>
      </div>
    </div>
  );
};
