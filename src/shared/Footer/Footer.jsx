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
    <footer className="w-full pt-8 lg:pt-[60px] pb-5 bg-cover bg-no-repeat bg-center">
      {/* container */}
      <div className="mx-auto px-3 lg:px-0 ">
        <div class="flex flex-col md:flex-row gap-[30px] max-w-[1140px] mx-auto mb-10">
          <div className="w-[100%] md:w-[32%]">
            <div className=" w-[125px] h-[80px]  lg:w-[170px] lg:h-[120px] mx-auto">
              <img className="w-full h-full object-contain" src={logo} alt="" />
            </div>
            {/* menu list */}
            <div className="flex mt-5 items-center gap-8 text-[#000] text-base leading-6 justify-center">
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
              {/* <a href="" target="_blank">
                <img src={linkdin} alt="" />
              </a> */}
            </div>
          </div>
          <div className="w-[100%] md:w-[20%] ">
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
          </div>
          <div className="w-[100%] md:w-[20%] ">
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
          </div>
          <div className="w-[100%] md:w-[28%] ">
            <h2 className="mb-3 text-[24px]">Download App</h2>
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

        {/* lower */}
        <div className=" px-10  lg:gap-0 text-sm lg:text-base justify-between border-t border-solid border-[rgba(114,114,114,0.50)]  pt-4 lg:pt-5">
          <p className="text-center">
            © 2024 Undiscovered. | All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
