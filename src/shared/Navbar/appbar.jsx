import { NavLink, useNavigate } from "react-router-dom";
import "./appbar.css";
import logo from "../../assets/images/logo.svg";
import { Twirl as Hamburger } from "hamburger-react";
import { useEffect, useRef, useState } from "react";
import {
  MDBDropdown,
  MDBDropdownMenu,
  MDBDropdownToggle,
  MDBDropdownItem,
  MDBBadge,
  MDBBtn,
} from "mdb-react-ui-kit";

const Appbar = () => {
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
        !navBody?.current?.contains(event.target) &&
        !hamburger?.current?.contains(event.target)
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
  const Userdata = localStorage?.getItem("user");
  console.log("🚀 ~ Appbar ~ Userdata:", Userdata);

  const logout = (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      id="profileico"
      xmlns="http://www.w3.org/2000/svg">
      <g clip-path="url(#clip0_17_4182)">
        <path
          d="M5 22C4.73478 22 4.48043 21.8946 4.29289 21.7071C4.10536 21.5196 4 21.2652 4 21V3C4 2.73478 4.10536 2.48043 4.29289 2.29289C4.48043 2.10536 4.73478 2 5 2H19C19.2652 2 19.5196 2.10536 19.7071 2.29289C19.8946 2.48043 20 2.73478 20 3V6H18V4H6V20H18V18H20V21C20 21.2652 19.8946 21.5196 19.7071 21.7071C19.5196 21.8946 19.2652 22 19 22H5ZM18 16V13H11V11H18V8L23 12L18 16Z"
          fill="#14161B"
        />
      </g>
      <defs>
        <clipPath id="clip0_17_4182">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
  const profile_icon = (
    <svg
      width="27"
      height="27"
      viewBox="0 0 27 27"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M13.2956 0C5.95085 0 0 5.95085 0 13.2956C0 20.6403 5.95085 26.5912 13.2956 26.5912C20.6403 26.5912 26.5912 20.6403 26.5912 13.2956C26.5912 5.95085 20.6403 0 13.2956 0ZM13.2956 5.14668C15.9011 5.14668 18.0134 7.25896 18.0134 9.86447C18.0134 12.47 15.9011 14.5823 13.2956 14.5823C10.6901 14.5823 8.5778 12.47 8.5778 9.86447C8.5778 7.25896 10.6901 5.14668 13.2956 5.14668ZM13.2956 23.5889C10.1486 23.5889 7.32866 22.1629 5.44154 19.9327C6.44943 18.0348 8.42233 16.7267 10.7222 16.7267C10.8509 16.7267 10.9796 16.7482 11.1029 16.7857C11.7998 17.0108 12.5289 17.1556 13.2956 17.1556C14.0622 17.1556 14.7967 17.0108 15.4883 16.7857C15.6116 16.7482 15.7403 16.7267 15.8689 16.7267C18.1688 16.7267 20.1417 18.0348 21.1496 19.9327C19.2625 22.1629 16.4426 23.5889 13.2956 23.5889Z"
        fill="#000"
      />
    </svg>
  );

  return (
    <header
      className="sticky top-0 z-[100] w-full "
      style={{
        background: "rgba(255, 235, 235, 1)",
      }}>
      <div className="flex items-center justify-between lg:justify-start gap-[30px] py-2 max-w-[1440px] mx-auto px-3 lg:px-0">
        {/* logo */}
        <a href="/" className=" w-[80px] h-[60px] lg:w-[80px] lg:h-[60px]">
          <img className="w-full h-full" src={logo} alt="" />
        </a>

        {/* menu area */}
        <div
          ref={navBody}
          className={`flex fixed top-0 flex-grow lg:justify-between lg:relative  lg:items-center lg:flex-row flex-col gap-8 lg:gap-[55px] z-20  lg:bg-none lg:h-auto lg:w-fit w-[80%] h-screen pt-[30px] px-3 lg:pt-0 lg:px-0 shadow-2xl lg:shadow-none duration-300 ease-in-out  lg:bg-transparent  ${
            navOpen ? "left-0" : "-left-full lg:left-auto"
          }`}>
          <div className=" w-[80px] h-[60px] lg:hidden">
            <img className="w-full h-full" src={logo} alt="" />
          </div>
          {/* link wrapper */}
          <div className="main_app_bar_text_div text-black leading-6  flex lg:items-center flex-col lg:flex-row gap-3  sm:gap-7">
            <NavLink className="NavLink" onClick={turnOffNav} to={"/"}>
              Home
            </NavLink>
            <NavLink
              className="NavLink"
              onClick={turnOffNav}
              to={"/player-list"}>
              Player Search
            </NavLink>
            <NavLink className="NavLink" onClick={turnOffNav} to={"/pricing"}>
              Plans & Pricing
            </NavLink>
            <NavLink className="NavLink" onClick={turnOffNav} to={"/about"}>
              About
            </NavLink>
            <NavLink className="NavLink" onClick={turnOffNav} to={"/contact"}>
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

          {/* <button
            onClick={() => navigate("/")}
            className="text-sm leading-6 text-black uppercase p-2  rounded-[30px] hover:bg-gray-100 w-fit">
            <svg
              width="20"
              height="21"
              viewBox="0 0 20 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M0 10.6875C0 5.1685 4.48 0.6875 10 0.6875C15.53 0.6875 20 5.1685 20 10.6875C20 16.2085 15.53 20.6875 10 20.6875C4.48 20.6875 0 16.2085 0 10.6875ZM9.12 6.8975C9.12 6.4185 9.52 6.0175 10 6.0175C10.48 6.0175 10.87 6.4185 10.87 6.8975V11.3175C10.87 11.7985 10.48 12.1875 10 12.1875C9.52 12.1875 9.12 11.7985 9.12 11.3175V6.8975ZM10.01 15.3685C9.52 15.3685 9.13 14.9685 9.13 14.4885C9.13 14.0085 9.52 13.6185 10 13.6185C10.49 13.6185 10.88 14.0085 10.88 14.4885C10.88 14.9685 10.49 15.3685 10.01 15.3685Z"
                fill="#FF3333"
              />
            </svg>
          </button>
          <button
            onClick={() => navigate("/")}
            className="text-sm leading-6 text-black uppercase p-2  rounded-[30px] hover:bg-gray-100 w-fit">
            <svg
              width="21"
              height="22"
              viewBox="0 0 21 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <circle
                cx="9.7659"
                cy="10.4534"
                r="8.98856"
                stroke="#130F26"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M16.0176 17.1719L19.5416 20.6867"
                stroke="#130F26"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button> */}
          <div className="flex lg:items-center gap-4 flex-col lg:flex-row">
            {/* login button */}
            {localStorage?.getItem("user") ? (
              <MDBDropdown group>
                <MDBDropdownToggle color="dark" className="main_dropdown_div">
                  <span>
                    {Userdata.name}
                    {/* {adminDATA?.type === "Admin" || adminDATA?.type === "Employee"
                    ? profiledata?.FirstName
                    : profiledata?.BussinessName} */}
                  </span>
                </MDBDropdownToggle>
                <MDBDropdownMenu>
                  <MDBDropdownItem link>
                    <span
                      className="inner_item"
                      onClick={() => {
                        turnOffNav();
                        if (JSON.parse(user)?.role === "coach") {
                          navigate("/create-coach-profile");
                        } else {
                          navigate("/create-player-profile");
                        }
                      }}>
                      {profile_icon} Create Profile
                    </span>
                  </MDBDropdownItem>
                  <MDBDropdownItem link>
                    <span className="inner_item">Available Players</span>
                  </MDBDropdownItem>
                  <MDBDropdownItem link>
                    <span
                      className="inner_item"
                      onClick={() => {
                        localStorage.removeItem("user");
                        window.location.reload(true);
                      }}>
                      {logout} Log out
                    </span>
                  </MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            ) : (
              <div className="flex lg:items-center gap-2 flex-col lg:flex-row">
                <button
                  onClick={() => navigate("/login")}
                  className="text-sm leading-6 text-black uppercase py-2 px-4 rounded-[30px] hover:bg-gray-100 w-fit">
                  Login
                </button>
                <button
                  onClick={() => navigate("/sign-up")}
                  className="text-sm leading-6 text-black uppercase py-2 px-4 rounded-[30px] hover:bg-gray-100 w-fit">
                  Join
                </button>
              </div>
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

export default Appbar;
