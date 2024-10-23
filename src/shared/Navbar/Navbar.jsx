import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.svg";
import { Twirl as Hamburger } from "hamburger-react";
import { useEffect, useRef, useState } from "react";

const Navbar = () => {
  const [navOpen, setNavOpen] = useState(false);
  const [isHamburgerActive, setIsHamburgerActive] = useState(false);
  const user = localStorage?.getItem("user");
  const navBody = useRef(null);
  const hamburger = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (navOpen) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }
  }, [navOpen]);

  // closing the nav on outside click
  useEffect(() => {
    document.addEventListener("click", (event) => {
      if (
        !navBody.current.contains(event.target) &&
        !hamburger.current.contains(event.target)
      ) {
        setNavOpen(false);
        setIsHamburgerActive(false);
      }
    });
  }, []);

  const turnOffNav = () => {
    setNavOpen(false);
    setIsHamburgerActive(false);
  };

  return (
    <header className="relative">
      <div className="flex items-center justify-between lg:justify-start gap-[30px]  py-5 lg:py-8  lg:pb-[50px]">
        {/* logo */}
        <a href="/" className=" w-[80px] h-[60px] lg:w-[100px] lg:h-[70px]">
          <img className="w-full h-full" src={logo} alt="" />
        </a>

        {/* menu area */}
        <div
          ref={navBody}
          className={`flex fixed top-0 flex-grow lg:justify-between lg:relative  lg:items-center lg:flex-row flex-col gap-8 lg:gap-[55px] z-20 bg-[#fff] lg:bg-none lg:h-auto lg:w-fit w-[80%] h-screen pt-[30px] px-3 lg:pt-0 lg:px-0 shadow-2xl lg:shadow-none duration-300 ease-in-out  ${
            navOpen ? "left-0" : "-left-full lg:left-auto"
          }`}>
          <div className=" w-[80px] h-[60px] lg:hidden">
            <img className="w-full h-full" src={logo} alt="" />
          </div>
          {/* link wrapper */}
          <div className=" text-black leading-6  flex lg:items-center flex-col lg:flex-row gap-3  sm:gap-7">
            <NavLink onClick={turnOffNav} to={"/"}>
              Home
            </NavLink>
            <NavLink onClick={turnOffNav} to={"/player-list"}>
              Player Search
            </NavLink>
            <NavLink onClick={turnOffNav} to={"/pricing"}>
              Plans & Pricing
            </NavLink>
            <NavLink onClick={turnOffNav} to={"/about"}>
              About
            </NavLink>
            <NavLink onClick={turnOffNav} to={"/contact"}>
              Contact us
            </NavLink>
            {localStorage.getItem("user") ? (
              <NavLink
                onClick={turnOffNav}
                to={
                  JSON.parse(user)?.role === "coach"
                    ? "/create-coach-profile"
                    : "/create-player-profile"
                }>
                Create Profile
              </NavLink>
            ) : (
              ""
            )}
            <NavLink onClick={turnOffNav} to={"/available-players"}>
              Available Players
            </NavLink>
            {JSON.parse(user)?.role === "coach" ? (
              <>
                <NavLink onClick={turnOffNav} to={"/favourite-players"}>
                  Favourite Players
                </NavLink>

                <NavLink onClick={turnOffNav} to={"/watch-list"}>
                  Watch list
                </NavLink>
              </>
            ) : null}

            <NavLink onClick={turnOffNav} to={"/newsFeed"}>
              NewsFeed
            </NavLink>
          </div>

          {/* button wrapper */}
          <div className="flex lg:items-center gap-4 flex-col lg:flex-row">
            {/* download button */}
            <button className="text-sm leading-6 text-[#fff] py-2 px-6 bg-primaryColor rounded-[30px] w-fit">
              Download App
            </button>
            {/* login button */}
            {localStorage?.getItem("user") ? (
              <button
                onClick={() => {
                  localStorage.removeItem("user");
                  window.location.reload(true);
                }}
                className="text-sm leading-6 text-primaryColor py-2 px-6 bg-[#fff] rounded-[30px] border border-solid border-primaryColor w-fit">
                Log out
              </button>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="text-sm leading-6 text-primaryColor py-2 px-6 bg-[#fff] rounded-[30px] border border-solid border-primaryColor w-fit">
                Login/Sign up
              </button>
            )}
          </div>
        </div>

        {/* hamburger icon */}
        <div
          ref={hamburger}
          onClick={() => setNavOpen(!navOpen)}
          className="w-fit lg:hidden">
          <Hamburger
            toggle={setIsHamburgerActive}
            toggled={isHamburgerActive}
            size={24}
            direction="right"
          />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
