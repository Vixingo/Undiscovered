import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.svg";
import appstore from "../../assets/images/app-store.png";
import playstore from "../../assets/images/google-play.png";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
const Footer = () => {
    return (
        <>
            <footer className="relative pt-8 lg:pt-[20px] mt-4">
                {/* Background image wrapper with white overlay */}
                <div
                    className="lg:hidden absolute inset-0 bg-no-repeat bg-top bg-[url('./img/footerbg.jpeg')]"
                    style={{ backgroundSize: "280%" }}
                >
                    <div className="absolute inset-0 bg-white opacity-50"></div>
                </div>

                {/* Container for the actual content */}
                <div className="relative mx-auto z-10">
                    <div className="max-w-[1210px] flex flex-col items-center gap-[10px] justify-center mb-2 py-10 lg:bg-white lg:mx-8 rounded-xl">
                        <div className="w-[100%] md:w-[32%]">
                            <div className="w-[125px] h-[80px] scale-150 lg:scale-100 lg:w-[170px] lg:h-[120px] mx-auto mb-4 lg:mb-0">
                                <img
                                    className="w-full h-full object-contain"
                                    src={logo}
                                    alt=""
                                />
                            </div>
                        </div>

                        <hr className="border-2 hidden lg:block border-gray-500 w-full h-1" />





                        <div className="flex items-center w-full justify-center px-16">
                            {/* first div */}
                            <div className="basis-[30%] lg:flex hidden justify-center flex-col gap-3">
                                <div className="text-2xl">
                                    <p>How it works</p>
                                </div>
                                <div className="space-x-5">
                                    <button>Players</button>
                                    <button>Coaches</button>
                                    <button>Registration</button>
                                </div>
                            </div>
                            {/* mid div */}
                            <div className="basis-[30%] lg:flex hidden justify-center flex-col gap-3">
                                <div className="text-2xl">
                                    <p>About</p>
                                </div>
                                <div className="space-x-5">
                                    <button>About us</button>
                                    <button>Privacy policy</button>
                                    <button>Contact us</button>
                                </div>
                            </div>
                            {/* last div */}
                            <div className="basis-[40%] ">
                                <div className="w-full flex justify-center flex-col items-center gap-2">
                                    <div className="-ml-28 text-2xl lg:block hidden">
                                        <p>Download App</p>
                                    </div>
                                    <div className="flex lg:hidden gap-9 my-4">
                                        <Link className="text-black">Home</Link>
                                        <Link className="text-black">About</Link>
                                        <Link className="text-black">Contact us</Link>
                                    </div>
                                    <div className="flex items-center gap-6">
                                        <Link className="block w-[120px] h-[40px] overflow-hidden">
                                            <img
                                                className="w-full h-full object-contain hidden lg:block"
                                                src={appstore}
                                                alt=""
                                            />
                                            <img
                                                className="w-full h-full object-contain lg:hidden block rounded-lg"
                                                src="./img/gplay.png"
                                                alt=""
                                            />
                                        </Link>
                                        <Link className="block w-[120px] h-[40px] overflow-hidden">
                                            <img
                                                className="w-full h-full object-contain hidden lg:block"
                                                src={playstore}
                                                alt=""
                                            />
                                            <img
                                                className="w-full h-full object-contain lg:hidden block rounded-lg"
                                                src="./img/astore.png"
                                                alt=""
                                            />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>








                    </div>

                    <hr className="border-2 lg:hidden block border-gray-500  h-1 mx-3" />
                    <div className="px-10 lg:bg-white lg:gap-0 text-sm lg:text-base flex gap-4 lg:flex-row items-center flex-col-reverse justify-between mt-7 py-7">
                        <p className="text-center">
                            © 2024 Undiscovered Recruits. | All Rights Reserved
                        </p>
                        <p className="lg:hidden block">Privacy Policy | Terms & Conditions</p>
                        <div className=" gap-3 text-2xl lg:flex hidden">
                            <FaFacebookF />
                            <FaTwitter />
                            <FaInstagram />
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default Footer;
