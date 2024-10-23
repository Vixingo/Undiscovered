import { useState, useEffect, useRef, useContext } from "react";
import "./Nav.css";
import logo from "../../assets/images/logo.svg";
import logo2 from "../../assets/images/logo.svg";
// import { GlobalContext } from "../../../Globalcontext";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Fade as Hamburger } from "hamburger-react";

import {
    MDBDropdown,
    MDBDropdownMenu,
    MDBDropdownToggle,
    MDBDropdownItem,
    MDBBadge,
    MDBBtn,
} from "mdb-react-ui-kit";
const Navbar = () => {
    // const {
    //   MyBusinessData,
    //   profiledata,
    //   setprofileData,
    //   setchangePasswordshow,
    //   setLogoutModalshow,
    // } = useContext(GlobalContext);
    const [screenSize, setScreenSize] = useState(getCurrentDimension());
    const [lang, setLang] = useState();

    function getCurrentDimension() {
        return {
            width: window.innerWidth,
            height: window.innerHeight,
        };
    }

    useEffect(() => {
        const updateDimension = () => {
            setScreenSize(getCurrentDimension());
        };
        window.addEventListener("resize", updateDimension);

        return () => {
            window.removeEventListener("resize", updateDimension);
        };
    }, [screenSize]);

    const navigate = useNavigate();
    const menuref = useRef();

    const [open, setIsOpen] = useState(false);
    const [onShow, setOnShow] = useState(false);
    const [Industrydata, setIndustrydata] = useState();

    useEffect(() => {
        const handler = (event) => {
            if (menuref.current && !menuref.current.contains(event.target)) {
                setIsOpen(false);
                setOnShow(false);
            }
        };
        document.addEventListener("mousedown", handler);
        document.addEventListener("scroll", handler);

        return () => {
            document.removeEventListener("mousedown", handler);
            document.removeEventListener("scroll", handler);
        };
    }, []);

    const toggle = (item) => {
        setIsOpen(false);
    };

    const handleHide = () => {
        setIsOpen(!open);
    };

    const pathname = useLocation();
    useEffect(() => {
        setLang(pathname.pathname);
    }, [pathname]);

    const langChange = (e) => {
        const link = e.target.value;
        navigate("");
    };

    const userJson = localStorage.getItem("user");
    const Userdata = userJson ? JSON.parse(userJson) : null;
    const profiledata = JSON.parse(localStorage.getItem("coaches"));

    const logout = (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            id="profileico"
            xmlns="http://www.w3.org/2000/svg"
        >
            <g clip-path="url(#clip0_17_4182)">
                <path
                    d="M5 22C4.73478 22 4.48043 21.8946 4.29289 21.7071C4.10536 21.5196 4 21.2652 4 21V3C4 2.73478 4.10536 2.48043 4.29289 2.29289C4.48043 2.10536 4.73478 2 5 2H19C19.2652 2 19.5196 2.10536 19.7071 2.29289C19.8946 2.48043 20 2.73478 20 3V6H18V4H6V20H18V18H20V21C20 21.2652 19.8946 21.5196 19.7071 21.7071C19.5196 21.8946 19.2652 22 19 22H5ZM18 16V13H11V11H18V8L23 12L18 16Z"
                    fill="#fff"
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
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M13.2956 0C5.95085 0 0 5.95085 0 13.2956C0 20.6403 5.95085 26.5912 13.2956 26.5912C20.6403 26.5912 26.5912 20.6403 26.5912 13.2956C26.5912 5.95085 20.6403 0 13.2956 0ZM13.2956 5.14668C15.9011 5.14668 18.0134 7.25896 18.0134 9.86447C18.0134 12.47 15.9011 14.5823 13.2956 14.5823C10.6901 14.5823 8.5778 12.47 8.5778 9.86447C8.5778 7.25896 10.6901 5.14668 13.2956 5.14668ZM13.2956 23.5889C10.1486 23.5889 7.32866 22.1629 5.44154 19.9327C6.44943 18.0348 8.42233 16.7267 10.7222 16.7267C10.8509 16.7267 10.9796 16.7482 11.1029 16.7857C11.7998 17.0108 12.5289 17.1556 13.2956 17.1556C14.0622 17.1556 14.7967 17.0108 15.4883 16.7857C15.6116 16.7482 15.7403 16.7267 15.8689 16.7267C18.1688 16.7267 20.1417 18.0348 21.1496 19.9327C19.2625 22.1629 16.4426 23.5889 13.2956 23.5889Z"
                fill="#fff"
            />
        </svg>
    );
    const player = (
        <svg
            width="24"
            height="24"
            viewBox="0 0 57 57"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M20.3581 28.5C22.3715 28.5 24.3398 27.9029 26.0139 26.7842C27.688 25.6656 28.9927 24.0756 29.7632 22.2154C30.5336 20.3551 30.7351 18.3082 30.3422 16.3335C29.9492 14.3587 28.9795 12.5448 27.5557 11.1212C26.1318 9.69764 24.3178 8.72824 22.343 8.33565C20.3681 7.94306 18.3213 8.14491 16.4612 8.91567C14.6011 9.68643 13.0113 10.9915 11.893 12.6658C10.7746 14.3401 10.1779 16.3084 10.1782 18.3219C10.1811 21.0207 11.2545 23.6082 13.1631 25.5164C15.0716 27.4246 17.6592 28.4976 20.3581 28.5Z"
                fill="#FBFDFF"
            />
            <path
                d="M33.6745 36.9093C31.095 34.2634 27.7852 32.4465 24.1681 31.6907C20.5509 30.935 16.7906 31.2746 13.3674 32.6662C9.94424 34.0579 7.01359 36.4384 4.94984 39.5036C2.88609 42.5689 1.78292 46.1798 1.78125 49.875C1.78125 50.3474 1.96892 50.8005 2.30297 51.1346C2.63702 51.4686 3.09008 51.6563 3.5625 51.6563H37.1569C37.6293 51.6563 38.0824 51.4686 38.4164 51.1346C38.7505 50.8005 38.9381 50.3474 38.9381 49.875C38.945 47.9862 38.6535 46.1082 38.0742 44.3104C37.2118 41.531 35.7042 38.9949 33.6745 36.9093Z"
                fill="#FBFDFF"
            />
            <path
                d="M41.8594 29.3906C46.0403 29.3906 49.4297 26.0013 49.4297 21.8203C49.4297 17.6393 46.0403 14.25 41.8594 14.25C37.6784 14.25 34.2891 17.6393 34.2891 21.8203C34.2891 26.0013 37.6784 29.3906 41.8594 29.3906Z"
                fill="#FBFDFF"
            />
            <path
                d="M41.8595 31.4747C39.4718 31.4837 37.1304 32.134 35.0801 33.3575C35.4666 33.7031 35.8567 34.0433 36.2219 34.4174C38.6473 36.9103 40.449 39.9413 41.4801 43.263C41.8333 44.3566 42.0936 45.478 42.2585 46.6154H53.4376C53.9101 46.6154 54.3631 46.4277 54.6972 46.0936C55.0312 45.7596 55.2189 45.3065 55.2189 44.8341C55.2151 41.2921 53.8064 37.8963 51.3019 35.3918C48.7973 32.8872 45.4015 31.4785 41.8595 31.4747Z"
                fill="#FBFDFF"
            />
        </svg>
    );
    const watch = (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M5 2H19C19.5523 2 20 2.44772 20 3V22.1433C20 22.4194 19.7761 22.6434 19.5 22.6434C19.4061 22.6434 19.314 22.6168 19.2344 22.5669L12 18.0313L4.76559 22.5669C4.53163 22.7136 4.22306 22.6429 4.07637 22.4089C4.02647 22.3293 4 22.2373 4 22.1433V3C4 2.44772 4.44772 2 5 2Z"
                fill="white"
            />
        </svg>
    );
    return (
        <div ref={menuref} className="Main_navbar">
            <div className="mainnav">
                <nav id="navbar">
                    <NavLink to="/" className="logo">
                        <img src={logo} alt="" style={{ width: "100%" }} />
                    </NavLink>
                    <NavLink to="/" className="logo2">
                        <img src={logo2} alt="" style={{ width: "70%" }} />
                    </NavLink>

                    <ul className={open ? "navlinks mobilemenu" : "navlinks"}>
                        <li>
                            <NavLink
                                to="/"
                                onClick={() => toggle("")}
                                className={({ isActive }) =>
                                    isActive ? "active" : ""
                                }
                            >
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/player-list"
                                onClick={() => toggle("")}
                                className={({ isActive }) =>
                                    isActive ? "active" : ""
                                }
                            >
                                Player Search
                            </NavLink>
                        </li>

                        <li>
                            <NavLink
                                to="/pricing"
                                onClick={() => toggle("")}
                                className={({ isActive }) =>
                                    isActive ? "active" : ""
                                }
                            >
                                Plans & Pricing
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/available-players"
                                onClick={() => toggle("")}
                                className={({ isActive }) =>
                                    isActive ? "active" : ""
                                }
                            >
                                Available Players
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/about"
                                onClick={() => toggle("")}
                                className={({ isActive }) =>
                                    isActive ? "active" : ""
                                }
                            >
                                About
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/contact"
                                onClick={() => toggle("")}
                                className={({ isActive }) =>
                                    isActive ? "active" : ""
                                }
                            >
                                Contact us
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/newsFeed"
                                onClick={() => toggle("")}
                                className={({ isActive }) =>
                                    isActive ? "active" : ""
                                }
                            >
                                News
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/Playerinfo"
                                onClick={() => toggle("")}
                                className={({ isActive }) =>
                                    isActive ? "active" : ""
                                }
                            >
                                Player / Coach
                            </NavLink>
                        </li>

                        <li>
                            <div className="flex lg:items-center gap-4 flex-col lg:flex-row show_in_mobile">
                                {Userdata ? (
                                    Userdata?.role === "coach" ? (
                                        <MDBDropdown group>
                                            <MDBDropdownToggle
                                                color="dark"
                                                className="main_dropdown_div"
                                            >
                                                <span>
                                                    Accounts
                                                    {/* {Userdata.name} */}
                                                    {/* {adminDATA?.type === "Admin" || adminDATA?.type === "Employee"
                ? profiledata?.FirstName
                : profiledata?.BussinessName} */}
                                                </span>
                                            </MDBDropdownToggle>
                                            <MDBDropdownMenu>
                                                <MDBDropdownItem link>
                                                    <span
                                                        className="inner_item"
                                                        onClick={() =>
                                                            navigate(
                                                                "/create-coach-profile"
                                                            )
                                                        }
                                                    >
                                                        {profile_icon} Create
                                                        Profile
                                                        {/* {Userdata.is_profile_complete
                              ? "MY profile"
                              : "Create Profile"} */}
                                                    </span>
                                                </MDBDropdownItem>
                                                {/* <MDBDropdownItem
                          link
                          onClick={() => navigate("/available-players")}>
                          <span className="inner_item">
                            {player}Available Players
                          </span>
                        </MDBDropdownItem> */}
                                                <MDBDropdownItem
                                                    link
                                                    onClick={() =>
                                                        navigate(
                                                            "/favourite-players"
                                                        )
                                                    }
                                                >
                                                    <span className="inner_item">
                                                        {" "}
                                                        {player}Favourite
                                                        Players
                                                    </span>
                                                </MDBDropdownItem>
                                                <MDBDropdownItem
                                                    link
                                                    onClick={() =>
                                                        navigate("/watch-list")
                                                    }
                                                >
                                                    <span className="inner_item">
                                                        {watch}Watch list
                                                    </span>
                                                </MDBDropdownItem>
                                                <MDBDropdownItem link>
                                                    <span
                                                        className="inner_item"
                                                        onClick={() => {
                                                            localStorage.removeItem(
                                                                "user"
                                                            );
                                                            window.location.reload(
                                                                true
                                                            );
                                                        }}
                                                    >
                                                        {logout} Log out
                                                    </span>
                                                </MDBDropdownItem>
                                            </MDBDropdownMenu>
                                        </MDBDropdown>
                                    ) : (
                                        <MDBDropdown group>
                                            <MDBDropdownToggle
                                                color="dark"
                                                className="main_dropdown_div"
                                            >
                                                <span>
                                                    Accounts
                                                    {/* {Userdata.name} */}
                                                    {/* {adminDATA?.type === "Admin" || adminDATA?.type === "Employee"
                ? profiledata?.FirstName
                : profiledata?.BussinessName} */}
                                                </span>
                                            </MDBDropdownToggle>
                                            <MDBDropdownMenu>
                                                <MDBDropdownItem link>
                                                    <span
                                                        className="inner_item"
                                                        onClick={() =>
                                                            navigate(
                                                                "/create-player-profile"
                                                            )
                                                        }
                                                    >
                                                        {profile_icon} Create
                                                        Profile
                                                        {/* {Userdata.is_profile_complete
                              ? "MY profile"
                              : "Create Profile"} */}
                                                    </span>
                                                </MDBDropdownItem>
                                                {/* <MDBDropdownItem
                          link
                          onClick={() => navigate("/available-players")}>
                          <span className="inner_item">Available Players</span>
                        </MDBDropdownItem> */}

                                                <MDBDropdownItem link>
                                                    <span
                                                        className="inner_item"
                                                        onClick={() => {
                                                            localStorage.removeItem(
                                                                "user"
                                                            );
                                                            window.location.reload(
                                                                true
                                                            );
                                                        }}
                                                    >
                                                        {logout} Log out
                                                    </span>
                                                </MDBDropdownItem>
                                            </MDBDropdownMenu>
                                        </MDBDropdown>
                                    )
                                ) : (
                                    <div className="flex lg:items-center gap-2 flex-col lg:flex-row">
                                        <button
                                            onClick={() => navigate("/login")}
                                            className="text-sm leading-6 text-black uppercase py-2 px-4 rounded-[30px] hover:bg-gray-100 w-fit"
                                        >
                                            Login
                                        </button>
                                        <button
                                            onClick={() => navigate("/sign-up")}
                                            className="text-sm leading-6 text-black uppercase py-2 px-4 rounded-[30px] hover:bg-gray-100 w-fit"
                                        >
                                            Join
                                        </button>
                                    </div>
                                )}
                            </div>
                        </li>
                    </ul>
                    <div className="flex lg:items-center gap-4 flex-col lg:flex-row show_in_web">
                        {Userdata ? (
                            Userdata?.role === "coach" ? (
                                <MDBDropdown group>
                                    <MDBDropdownToggle
                                        color="dark"
                                        className="main_dropdown_div"
                                    >
                                        <span>
                                            Accounts
                                            {/* {Userdata.name} */}
                                            {/* {adminDATA?.type === "Admin" || adminDATA?.type === "Employee"
                ? profiledata?.FirstName
                : profiledata?.BussinessName} */}
                                        </span>
                                    </MDBDropdownToggle>
                                    <MDBDropdownMenu>
                                        <MDBDropdownItem link>
                                            <span
                                                className="inner_item"
                                                onClick={() =>
                                                    navigate(
                                                        "/create-coach-profile"
                                                    )
                                                }
                                            >
                                                {profile_icon} Create Profile
                                                {/* {Userdata.is_profile_complete
                          ? "MY profile"
                          : "Create Profile"} */}
                                            </span>
                                        </MDBDropdownItem>
                                        {/* <MDBDropdownItem
                      link
                      onClick={() => navigate("/available-players")}>
                      <span className="inner_item">
                        {" "}
                        {player}Available Players
                      </span>
                    </MDBDropdownItem> */}
                                        <MDBDropdownItem
                                            link
                                            onClick={() =>
                                                navigate("/favourite-players")
                                            }
                                        >
                                            <span className="inner_item">
                                                {" "}
                                                {player}Favourite Players
                                            </span>
                                        </MDBDropdownItem>
                                        <MDBDropdownItem
                                            link
                                            onClick={() =>
                                                navigate("/watch-list")
                                            }
                                        >
                                            <span className="inner_item">
                                                {watch}Watch list
                                            </span>
                                        </MDBDropdownItem>

                                        <MDBDropdownItem link>
                                            <span
                                                className="inner_item"
                                                onClick={() => {
                                                    localStorage.removeItem(
                                                        "user"
                                                    );
                                                    window.location.reload(
                                                        true
                                                    );
                                                }}
                                            >
                                                {logout} Log out
                                            </span>
                                        </MDBDropdownItem>
                                    </MDBDropdownMenu>
                                </MDBDropdown>
                            ) : (
                                <MDBDropdown group>
                                    <MDBDropdownToggle
                                        color="dark"
                                        className="main_dropdown_div"
                                    >
                                        <span>
                                            Accounts
                                            {/* {Userdata.name} */}
                                            {/* {adminDATA?.type === "Admin" || adminDATA?.type === "Employee"
                ? profiledata?.FirstName
                : profiledata?.BussinessName} */}
                                        </span>
                                    </MDBDropdownToggle>
                                    <MDBDropdownMenu>
                                        <MDBDropdownItem link>
                                            <span
                                                className="inner_item"
                                                onClick={() =>
                                                    navigate(
                                                        "/create-player-profile"
                                                    )
                                                }
                                            >
                                                {profile_icon} Create Profile
                                                {/* {Userdata.is_profile_complete
                          ? "MY profile"
                          : "Create Profile"} */}
                                            </span>
                                        </MDBDropdownItem>
                                        {/* <MDBDropdownItem
                      link
                      onClick={() => navigate("/available-players")}>
                      <span className="inner_item">
                        {" "}
                        {player}Available Players
                      </span>
                    </MDBDropdownItem> */}

                                        <MDBDropdownItem link>
                                            <span
                                                className="inner_item"
                                                onClick={() => {
                                                    localStorage.removeItem(
                                                        "user"
                                                    );
                                                    window.location.reload(
                                                        true
                                                    );
                                                }}
                                            >
                                                {logout} Log out
                                            </span>
                                        </MDBDropdownItem>
                                    </MDBDropdownMenu>
                                </MDBDropdown>
                            )
                        ) : (
                            <div className="flex lg:items-center gap-2 flex-col lg:flex-row">
                                <button
                                    onClick={() => navigate("/login")}
                                    className="text-sm leading-6 text-black uppercase py-2 px-4 rounded-[30px] hover:bg-gray-100 w-fit"
                                >
                                    Login
                                </button>
                                <button
                                    onClick={() => navigate("/sign-up")}
                                    className="text-sm leading-6 text-black uppercase py-2 px-4 rounded-[30px] hover:bg-gray-100 w-fit"
                                >
                                    Join
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="menubtn">
                        <Hamburger onToggle={handleHide} toggled={open} />
                    </div>
                </nav>
            </div>
        </div>
    );
};

export default Navbar;
