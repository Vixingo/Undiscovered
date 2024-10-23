import { Link, useNavigate, useParams } from "react-router-dom";
import AuthTop from "../../components/AuthPage/AuthTop";
import "./AuthPage.css";
import { useState } from "react";
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import axios from 'axios'
import { BASE_URL } from "../../baseurl/baseurl";
const ChangePassword = () => {
let {token}=useParams()
  const [state,setState]=useState({
    password:'',
    token
  })
  const navigate=useNavigate()

const login=async(e)=>{
e.preventDefault();
try{
  let response=await axios.post(`${BASE_URL}/changePassword`,state)
  
      toastr.success(response.data.message)
      navigate('/login')
  
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
            subtitle={"Change your password!"}
          />
        </div>

        {/* input wrapper */}
        <form onSubmit={login} className="mt-8 flex flex-col items-center gap-5 auth--form w-full lg:w-[50%] ">

          <div className="w-full relative">
            <input
            value={state.password}
            onChange={(e)=>{
              setState({
                ...state,
                [e.target.name]:e.target.value
              })
            }}
              type="password"
              name="password"
              id="password"
              placeholder="Password"
            />

            <div className="icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="20"
                viewBox="0 0 18 20"
                fill="none"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M14.5227 5.39601V6.92935C16.2451 7.46696 17.5 9.02614 17.5 10.8884V15.8253C17.5 18.1308 15.5886 20 13.2322 20H4.7688C2.41136 20 0.5 18.1308 0.5 15.8253V10.8884C0.5 9.02614 1.75595 7.46696 3.47729 6.92935V5.39601C3.48745 2.41479 5.95667 0 8.98476 0C12.0535 0 14.5227 2.41479 14.5227 5.39601ZM9.00508 1.73904C11.0678 1.73904 12.7445 3.37871 12.7445 5.39601V6.7137H5.25553V5.37613C5.26569 3.36878 6.94232 1.73904 9.00508 1.73904ZM9.88912 14.4549C9.88912 14.9419 9.49283 15.3294 8.99492 15.3294C8.50717 15.3294 8.11088 14.9419 8.11088 14.4549V12.2488C8.11088 11.7718 8.50717 11.3843 8.99492 11.3843C9.49283 11.3843 9.88912 11.7718 9.88912 12.2488V14.4549Z"
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

export default ChangePassword;
