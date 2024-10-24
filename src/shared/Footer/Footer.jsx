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
      <footer className="relative pt-8 lg:pt-[60px]">
        {/* Background image wrapper with white overlay */}
        <div className="lg:hidden absolute inset-0 bg-no-repeat bg-top bg-[url('./img/footerbg.jpeg')]"
          style={{ backgroundSize: '280%' }}>
          <div className="absolute inset-0 bg-white opacity-50"></div>
        </div>

        {/* Container for the actual content */}
        <div className="relative mx-auto z-10">
          <div className="flex flex-col items-center gap-[10px] justify-center mb-2 py-10 lg:bg-white lg:mx-8 rounded-xl">
            <div className="w-[100%] md:w-[32%]">
              <div className="w-[125px] h-[80px] scale-150 lg:scale-100 lg:w-[170px] lg:h-[120px] mx-auto mb-4 lg:mb-0">
                <img className="w-full h-full object-contain" src={logo} alt="" />
              </div>
            </div>

            <hr className="border-2 hidden lg:block border-gray-500 w-full h-1" />
            <div className="w-[100%] flex flex-col items-center">
              <div className="flex gap-10 mb-4">
                <Link className="text-black">Home</Link>
                <Link className="text-black">About</Link>
                <Link className="text-black">Contact Us</Link>
              </div>
              <div className="flex items-center gap-6">
                <Link className="block w-[120px] h-[40px] overflow-hidden">
                  <img className="w-full h-full object-contain" src={appstore} alt="" />
                </Link>
                <Link className="block w-[120px] h-[40px] overflow-hidden">
                  <img className="w-full h-full object-contain" src={playstore} alt="" />
                </Link>
              </div>
            </div>
          </div>

          <hr className="border-2 lg:hidden block border-gray-500  h-1 mx-3" />
          <div className="px-10 lg:bg-white lg:gap-0 text-sm lg:text-base flex gap-4 lg:flex-row items-center flex-col-reverse justify-between mt-7 py-7">
            <p className="text-center">© 2024 Undiscovered Recruits. | All Rights Reserved</p>
            <p>Privacy Policy | Terms & Conditions</p>
          </div>
        </div>
      </footer>

    </>
  );
};

export default Footer;
