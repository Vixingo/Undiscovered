import { Link, useNavigate } from "react-router-dom";
import AuthTop from "../../components/AuthPage/AuthTop";
import "./AuthPage.css";
import { useState } from "react";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { BASE_URL } from "../../baseurl/baseurl";
import Navbar from "../../shared/Navbar3/Navbar";
import { IoEye, IoEyeOff } from "react-icons/io5";

const Login = () => {
    const [state, setState] = useState({
        email: "",
        password: "",
    });
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    const login = async (e) => {
        e.preventDefault();
        try {
            let response = await axios.post(`${BASE_URL}/login`, state);

            toast.success("Successfully toasted!", {
                position: "top-right",
                style: {
                    background: "#333",
                    color: "#fff",
                },
            });
            let { userData } = response.data;
            localStorage.setItem("user", JSON.stringify(userData));

            if (userData?.user?.role === "user") {
                navigate("/");
            } else {
                navigate("/available-players");
            }
        } catch (error) {
            if (error?.response && error?.response?.data) {
                toast.error(error?.response?.data?.error);
            } else {
                toast.error("Server error please try again");
            }
        }
    };

    return (
        <>
            <Toaster />
            <div className="flex items-center gap-28 2xl:gap-44 ">
                <div className="hidden lg:block">
                    <img
                        src="./img/auth.png"
                        alt=""
                        className="w-full object-cover"
                    />
                </div>
                <div className="relative flex-1 lg:max-w-[470px] 2xl:max-w-2xl justify-center">
                    <div className="absolute z-0 top-0 left-0 lg:hidden w-full">
                        <img
                            src="./img/mobAuth.png"
                            alt=""
                            height={"242px"}
                            width={"100%"}
                        />
                    </div>

                    <div className="h-screen w-full flex flex-col   justify-start lg:pt-16 pt-36  px-4 z-10">
                        <div>
                            <img
                                src="./img/logo.svg"
                                alt=""
                                className="w-0 md:w-44 mb-4 "
                            />
                        </div>
                        <div className="z-10 mb-7">
                            <AuthTop
                                title={"Welcome back!"}
                                subtitle={
                                    "Login to your account to get started!"
                                }
                            />
                        </div>

                        <form
                            onSubmit={login}
                            className="flex flex-col auth--form w-full "
                        >
                            <div className="">
                                <p className="pt-3 pb-1 pl-1 text-black">
                                    Email
                                </p>
                                <div className="w-full relative">
                                    <input
                                        value={state.email}
                                        onChange={(e) =>
                                            setState({
                                                ...state,
                                                [e.target.name]: e.target.value,
                                            })
                                        }
                                        type="email"
                                        name="email"
                                        id="email"
                                        placeholder="Email"
                                    />
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

                                <p className="pt-3 pb-1 pl-1 text-black">
                                    Password
                                </p>
                                <div className="w-full relative">
                                    <input
                                        value={state.password}
                                        onChange={(e) =>
                                            setState({
                                                ...state,
                                                [e.target.name]: e.target.value,
                                            })
                                        }
                                        type={
                                            showPassword ? "text" : "password"
                                        }
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
                                    <div
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-xl text-gray-500"
                                        onClick={() =>
                                            setShowPassword(!showPassword)
                                        }
                                    >
                                        {showPassword ? (
                                            <IoEyeOff />
                                        ) : (
                                            <IoEye />
                                        )}
                                    </div>
                                </div>

                                <Link className="justify-end lg:justify-center ml-auto text-sm leading-6 text-[#0E0E0E] flex  pt-[10px] mb-[36px]">
                                    Forget password?
                                </Link>

                                <button className="submit bg-primaryColor lg:mt-2.5 rounded-xl">
                                    Login
                                </button>
                            </div>
                        </form>

                        <div className=" mt-7">
                            <p className="text-center text-[#0E0E0E] text-base leading-6 pt-48 lg:pt-0 lg:mt-12 pb-14">
                                Don’t have an account?{" "}
                                <Link to={"/sign-up"} className="font-bold text-black">
                                    {" "}
                                    Sign up
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
