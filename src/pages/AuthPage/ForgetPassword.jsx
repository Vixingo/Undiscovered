import { Link, useNavigate } from "react-router-dom";
import AuthTop from "../../components/AuthPage/AuthTop";
import "./AuthPage.css";
import { useState } from "react";
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import axios from 'axios'
import { BASE_URL } from "../../baseurl/baseurl";
const  ForgetPassword = () => {

  const [state,setState]=useState({
    email:'',
  })
  const navigate=useNavigate()

const login=async(e)=>{
e.preventDefault();
try{
  let response=await axios.post(`${BASE_URL}/forgetPassword`,state)

  toastr.success("Reset Password link sent via email")

}catch(error){
  if(error?.response && error?.response?.data){
    toastr.error(error?.response?.data?.error)
    }else{
    toastr.error("Server error please try again")
    
    }
}

}

  return (
    <div>
      {/* content wrapper */}
      <div className="h-screen w-full flex flex-col items-center justify-center">
        {/* top area */}
        <div>
          <AuthTop
            title={"Welcome back!"}
            subtitle={"Change your password"}
          />
        </div>

        {/* input wrapper */}
        <form onSubmit={login} className="mt-8 flex flex-col items-center gap-5 auth--form w-full lg:w-[50%] ">
          <div className="w-full relative">
            <input value={state.email} onChange={(e)=>{
              setState({
                ...state,
                [e.target.name]:e.target.value
              })
            }}  type="email" name="email" id="email" placeholder="Email" />

            <div className="icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="18"
                viewBox="0 0 20 18"
                fill="none"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M14.939 0C16.28 0 17.57 0.53 18.519 1.481C19.469 2.43 20 3.71 20 5.05V12.95C20 15.74 17.73 18 14.939 18H5.06C2.269 18 0 15.74 0 12.95V5.05C0 2.26 2.259 0 5.06 0H14.939ZM16.53 6.54L16.61 6.46C16.849 6.17 16.849 5.75 16.599 5.46C16.46 5.311 16.269 5.22 16.07 5.2C15.86 5.189 15.66 5.26 15.509 5.4L11 9C10.42 9.481 9.589 9.481 9 9L4.5 5.4C4.189 5.17 3.759 5.2 3.5 5.47C3.23 5.74 3.2 6.17 3.429 6.47L3.56 6.6L8.11 10.15C8.67 10.59 9.349 10.83 10.06 10.83C10.769 10.83 11.46 10.59 12.019 10.15L16.53 6.54Z"
                  fill="#818181"
                />
              </svg>
            </div>
          </div>

       

          <button className="submit bg-primaryColor lg:mt-2.5">Login</button>
        </form>

        {/* instruction text */}

        <p className="text-center text-[#0E0E0E] text-base leading-6 mt-12 ">
          Don’t have an account?{" "}
          <Link to={"/sign-up"} className="font-bold">
            {" "}
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgetPassword;
