import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.svg";
import appstore from "../../assets/images/app-store.png";
import playstore from "../../assets/images/google-play.png";
import footerBg from "../../assets/images/footer-bg.png";
import FB from "../../assets/images/svgs/facebook.svg";
import insta from "../../assets/images/svgs/insta.svg";
import x from "../../assets/images/svgs/x.svg";
import linkdin from "../../assets/images/svgs/linkdin.svg";

const Footer = () => {
  return (
    
    <>
    <div></div>
    <footer className="w-full pt-8 lg:pt-[60px] pb-5 bg-cover bg-no-repeat bg-center  rounded-xl">
      {/* container */}

      <div className="mx-auto px-3 lg:px-0 ">
        <div className="flex flex-col items-center w-full gap-[30px] justify-center mb-2 pb-4">
          <div className="w-[100%] md:w-[32%]">
            <div className=" w-[125px] h-[80px] scale-150 lg:scale-100 lg:w-[170px] lg:h-[120px] mx-auto mb-4">
              <img className="w-full h-full object-contain" src={logo} alt="" />
            </div>
            {/* menu list */}

            {/* <div className="flex mt-5 items-center gap-8 text-[#000] text-base leading-6 justify-center">
              <a
                href="https://www.facebook.com/people/Undiscovered-Recruits/61558933044275/"
                target="_blank">
                <img src={FB} alt="" />
              </a>
              <a
                href="https://www.instagram.com/undiscoveredhoops/"
                target="_blank">
                <img src={insta} alt="" />
              </a>
              <a href="https://x.com/undiscoverhoops" target="_blank">
                <img src={x} alt="" />
              </a>
              <a href="" target="_blank">
                <img src={linkdin} alt="" />
              </a>
            </div> */}

          </div>
          {/* <div className="w-[100%] md:w-[20%] ">
            <div className="flex flex-col gap-4 text-[#000] text-base leading-6 justify-center">
              <h2 className="mb-3 text-[24px]">How it work</h2>
              <Link
                className="inner_item  hover:text-[#4C8FE1] text-[#000] hover:underline"
                to={"/"}>
                Home
              </Link>
              <Link
                className="inner_item  hover:text-[#4C8FE1] text-[#000] hover:underline"
                to={"/about"}>
                About
              </Link>
              <Link
                className="inner_item  hover:text-[#4C8FE1] text-[#000] hover:underline"
                to={"/contact"}>
                Contact us
              </Link>
              <Link
                className="inner_item  hover:text-[#4C8FE1] text-[#000] hover:underline"
                to={"/pricing"}>
                Plans & Pricing
              </Link>
            </div>
          </div> */}
          {/* <div className="w-[100%] md:w-[20%] ">
            {" "}
            <div className="flex flex-col gap-4 text-[#000] text-base leading-6 justify-center">
              <h2 className="mb-3 text-[24px]">About</h2>
              <Link
                className="inner_item  hover:text-[#4C8FE1] text-[#000] hover:underline"
                to={"/player-list"}>
                Player Search
              </Link>
              <Link
                className="inner_item  hover:text-[#4C8FE1] text-[#000] hover:underline"
                to={"/available-players"}>
                Available Players
              </Link>
              <Link
                className="inner_item  hover:text-[#4C8FE1] text-[#000] hover:underline"
                to={"/newsFeed"}>
                News
              </Link>
              <Link
                className="inner_item  hover:text-[#4C8FE1] text-[#000] hover:underline"
                to={"/Playerinfo"}>
                Player / Coach
              </Link>
            </div>
          </div> */}
          <hr className="border-2 hidden lg:block border-gray-500 w-full h-1"/>
          <div className="w-[100%]  flex flex-col items-center">
            {/* <h2 className="mb-3 text-[24px]">Download App</h2> */}
            <div className="flex gap-10 mb-4 ">
            <Link className="text-black">Home</Link>
            <Link className="text-black">About</Link>
            <Link className="text-black">Contact Us</Link>
            </div>
            <div className="flex items-center gap-6 ">
              <Link className="block w-[120px] h-[40px] overflow-hidden">
                <img
                  className="w-full h-full object-contain"
                  src={appstore}
                  alt=""
                />
              </Link>
              <Link className="block w-[120px] h-[40px] overflow-hidden">
                <img
                  className="w-full h-full object-contain"
                  src={playstore}
                  alt=""
                />
              </Link>
            </div>
          </div>
        </div>
        <hr className="border-2 lg:hidden block border-gray-500 w-full h-1"/>
        {/* lower */}
        <div className=" px-10  lg:gap-0 text-sm lg:text-base flex gap-4 lg:flex-row items-center flex-col-reverse justify-between  pt-4 lg:pt-5">
          <p className="text-center">
            © 2024 Undiscovered Recruits. | All Rights Reserved
          </p>
          <p>
            Privacy Policy | Terms & Conditions
          </p>
        </div>
      </div>
    </footer>
    </>
  );
};

export default Footer;
