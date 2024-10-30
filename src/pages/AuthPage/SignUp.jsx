import { Link, useNavigate } from "react-router-dom";
import AuthTop from "../../components/AuthPage/AuthTop";
import "./AuthPage.css";
import { useState } from "react";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import axios from "axios";
import { BASE_URL } from "../../baseurl/baseurl";
import Navbar from "../../shared/Navbar3/Navbar";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
const SignUp = () => {
    const navigate = useNavigate();
    const [isAgreed, setIsAgreed] = useState(false);
    const [state, setState] = useState({
        firstName: "",
        lastName: "",
        phoneNumber: "",
        email: "",
        password: "",
        role: "",
    });

    const register = async (e) => {
        e.preventDefault();
        console.log(state);
        try {
            let response = await axios.post(`${BASE_URL}/register`, state);
            toastr.success(response.data.message);
            console.log("🚀 ~ register ~ BASE_URL:", BASE_URL);
            console.log("🚀 ~ register ~ response:", response);
            toastr.success("Account created. Login to continue");
            setState({
                firstName: "",
                lastName: "",
                phoneNumber: "",
                email: "",
                password: "",
                role: "",
            });
            navigate("/login");
        } catch (error) {
            console.log("🚀 ~ register ~ error:", error);
        }
    };
    const handleRoleChange = (e) => {
        setState({
            ...state,
            role: e.target.value,
        });
    };



    return (
        <div className="flex ">
            <div className="">
                <img src="./img/auth.png" alt="" className="w-full h-full object-cover" />
            </div>

            <div className="flex flex-col items-center justify-center w-[450px] mx-auto 2xl:w-[700px]">
                {/* top area */}
                <div className="justify-start w-full flex flex-col gap-2 mb-4">
                    <div>
                        <img src="./img/logo.svg" alt="" className="w-[162px]" />
                    </div>
                    <AuthTop
                        title={"Sign Up!"}
                        subtitle={"Let’s create new account"}
                    />
                </div>

                {/* input wrapper */}
                <form className="flex flex-col items-center auth--form gap-4">
                    <div className="flex gap-4 justify-between w-full">
                        <div className="w-full relative">
                            <p className="text-black pb-2">First Name</p>
                            <div className="relative">
                                <input
                                    value={state.firstName}
                                    onChange={(e) =>
                                        setState({
                                            ...state,
                                            [e.target.name]: e.target.value,
                                        })
                                    }
                                    type="text"
                                    name="firstName"
                                    id="firstName"
                                    placeholder="First name"
                                />

                                <div className="icon">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="20"
                                        viewBox="0 0 16 20"
                                        fill="none"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M13.294 5.29105C13.294 8.22808 10.9391 10.5831 8 10.5831C5.0619 10.5831 2.70601 8.22808 2.70601 5.29105C2.70601 2.35402 5.0619 0 8 0C10.9391 0 13.294 2.35402 13.294 5.29105ZM8 20C3.66237 20 0 19.295 0 16.575C0 13.8539 3.68538 13.1739 8 13.1739C12.3386 13.1739 16 13.8789 16 16.599C16 19.32 12.3146 20 8 20Z"
                                            fill="#898989"
                                        />
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div className="w-full relative">
                            <p className="text-black pb-2">Last Name</p>
                            <div className="relative">
                                <input
                                    value={state.lastName}
                                    onChange={(e) =>
                                        setState({
                                            ...state,
                                            [e.target.name]: e.target.value,
                                        })
                                    }
                                    type="text"
                                    name="lastName"
                                    id="LastName"
                                    placeholder="Last name"
                                />

                                <div className="icon">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="20"
                                        viewBox="0 0 16 20"
                                        fill="none"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M13.294 5.29105C13.294 8.22808 10.9391 10.5831 8 10.5831C5.0619 10.5831 2.70601 8.22808 2.70601 5.29105C2.70601 2.35402 5.0619 0 8 0C10.9391 0 13.294 2.35402 13.294 5.29105ZM8 20C3.66237 20 0 19.295 0 16.575C0 13.8539 3.68538 13.1739 8 13.1739C12.3386 13.1739 16 13.8789 16 16.599C16 19.32 12.3146 20 8 20Z"
                                            fill="#898989"
                                        />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="w-full relative">
                        <p className="text-black pb-2">Email</p>
                        <div className="relative">
                            <input
                                onChange={(e) =>
                                    setState({
                                        ...state,
                                        [e.target.name]: e.target.value,
                                    })
                                }
                                value={state.email}
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
                    </div>

                    <div className="w-full  phone_div">
                        <p className="text-black pb-2">Phone Number</p>
                        <div className="relative">

                            <PhoneInput

                                value={state.phoneNumber}
                                international
                                countryCallingCodeEditable={false}
                                onChange={(phoneNumber) =>
                                    setState({ ...state, phoneNumber })
                                }
                                placeholder="Phone number"
                                name="phoneNumber"
                                id="phone"
                            />

                        </div>
                    </div>
                    <div className="w-full relative">
                        <p className="text-black pb-2">Password</p>
                        <div className="relative">
                            <input
                                value={state.password}
                                onChange={(e) =>
                                    setState({
                                        ...state,
                                        [e.target.name]: e.target.value,
                                    })
                                }
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
                    </div>

                    <div className="w-full relative">
                        <select
                            onChange={handleRoleChange}
                            value={state?.role}
                            className="rounded-lg border-gray-300 shadow-sm focus:border-primaryColor focus:ring focus:ring-primaryColor focus:ring-opacity-50"
                        >
                            <option value="">Select Role</option>
                            <option value="coach">Coach</option>
                            <option value="player">Player</option>
                        </select>
                    </div>

                    {/* checkbox  */}

                    <div className="checkbox--holder">
                        <input
                            onChange={() => setIsAgreed(!isAgreed)}
                            type="checkbox"
                            name="agree-terms"
                            id="agree-terms"
                        />
                        <label htmlFor="agree-terms">
                            By creating an account, you are acknowledging and
                            accepting the terms and conditions, thereby entering
                            into a legally binding contract with the service
                            provider.
                        </label>
                    </div>

                    <button
                        onClick={register}
                        className={`submit lg:my-2.5 rounded-full ${isAgreed
                            ? "pointer-events-auto bg-primaryColor"
                            : "pointer-events-none bg-[#d1d1d1]"
                            } `}
                    >
                        Agree and continue
                    </button>
                </form>

                {/* instruction text */}

                <p className="text-center text-[red] text-base leading-6 mt-12 ">
                    Already have an account?{" "}
                    <Link to={"/login"} className="font-bold text-[red]">
                        {" "}
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default SignUp;