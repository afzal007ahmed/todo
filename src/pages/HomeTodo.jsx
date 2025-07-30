import { useSelector } from "react-redux"

const HomeTodo = () => {
    const loginState = useSelector(( state ) => state.loginReducer) ;
  return (
    <div className="min-h-[80vh] flex justify-center items-center text-2xl font-bold">Hi {loginState.name}. What's you Todo today ?</div>
  )
}

export default HomeTodo