import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./PlayerProfile.css";
import SwitchPlayer from "../../components/PlayerProfile/SwitchPlayer";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { Collapse } from "react-collapse";
import PlayerReels from "../../components/PlayerProfile/PlayerReels";
import PlayerPhotos from "../../components/PlayerProfile/PlayerPhotos";
import PlayerOffers from "../../components/PlayerProfile/PlayerOffers";
import PlayerNews from "../../components/PlayerProfile/PlayerNews";
import { BASE_URL } from "../../baseurl/baseurl";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import toast, { Toaster } from "react-hot-toast";
import { Helmet } from "react-helmet";
import school_icon from "../../assets/images/logo.svg";
function getUser() {
    return localStorage.getItem("user");
}

const PlayerProfile = () => {
    const isAuthenticated = JSON.parse(getUser());

    const [isCollapsed, setIsCollapsed] = useState([
        false,
        false,
        false,
        false,
        false,
    ]);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true);
    };

    // Current message to be displayed in the modal
    const [currentModalMessage, setCurrentModalMessage] = useState("");

    const handleButtonClick = (index) => {
        if (isAuthenticated?.role === "coach") {
            if ([index].includes(index)) {
                const newIsCollapsed = isCollapsed.map((item, idx) =>
                    idx === index ? !item : false
                );
                setIsCollapsed(newIsCollapsed);
            }
        } else if (isAuthenticated?.role === "player") {
            if ([0, 1, 2].includes(index)) {
                handleShow();
            } else {
                const newIsCollapsed = isCollapsed.map((item, idx) =>
                    idx === index ? !item : item
                );
                setIsCollapsed(newIsCollapsed);
            }
        } else {
            if ([index].includes(index)) {
                handleShow();
            } else {
                const newIsCollapsed = isCollapsed.map((item, idx) =>
                    idx === index ? !item : item
                );
                setIsCollapsed(newIsCollapsed);
            }
        }
    };

    const [playerData, setPlayerData] = useState(null);
    console.log("🚀 ~ PlayerProfile ~ playerData:", playerData);
    const [playersProfile, setPlayers] = useState([]);
    console.log("🚀 ~ PlayerProfile ~ playersProfile:", playersProfile);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState("");
    const [showPlayer, setShowPlayers] = useState([]);
    const navigate = useNavigate();

    const togglePopup = () => {
        setIsPopupOpen(!isPopupOpen);
    };

    const { id } = useParams();

    const flagProfile = async () => {
        // console.log("PLAYER PROFILE");
        // console.log(playerData);
        let alreadyFlagged = playerData?.flaggedBy.find(
            (u) => u === currentUser?._id
        );

        if (!currentUser) {
            toast.success("Please login to flag profile", {
                position: "top-right",
                style: {
                    background: "#fff",
                    color: "#333",
                },
            });
            return;
        }
        const headers = {
            headers: {
                authorization: `Bearer ${
                    JSON.parse(localStorage?.getItem("user"))?.token
                }`,
            },
        };
        let response = await axios.get(
            `${BASE_URL}/flagProfile/${id}`,
            headers
        );
        if (response.status === 200) {
            if (alreadyFlagged) {
                setPlayerData((prev) => {
                    let old = { ...prev };
                    let flaggedBy = old.flaggedBy.filter(
                        (u) => u != currentUser?._id
                    );
                    old = { ...old, flaggedBy };
                    return old;
                });
            } else {
                setPlayerData((prev) => {
                    let old = { ...prev };
                    old.flaggedBy.push(currentUser?._id);
                    return old;
                });
            }

            toast.success(response?.data?.message, {
                position: "top-right",
                style: {
                    background: "#fff",
                    color: "#333",
                },
            });
        }
        setIsPopupOpen(!isPopupOpen);
    };

    const fetchUser = async (id) => {
        try {
            const response = await axios.get(`${BASE_URL}/get-profile/${id}`);
            console.log("🚀 ~ fetchUser ~ response:", response);
            const { profile, players, showPlayers } = response.data;
            setPlayers(players[0]);

            setPlayerData(profile);

            setShowPlayers(showPlayers);
        } catch (error) {}
    };
    useEffect(() => {
        fetchUser(id);
        // fetch("/players.json")
        //   .then((res) => res.json())
        //   .then((data) => {
        //     const result = data.find((item) => item.player_id === id);

        //     return setPlayerData(result);
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
        //   });
    }, [id]);
    useEffect(() => {
        setCurrentUser(JSON.parse(localStorage?.getItem("user")));
    }, [localStorage?.getItem("user")]);

    // const fetchUser = async (id) => {
    //   console.log("🚀 ~ fetchUser ~ id:", id);
    //   let response = await axios.get(`${BASE_URL}/get-profile/${id}`);
    //   if (response.status == 200) {
    //     console.log("🚀 ~ fetchUser ~ response:", response);

    //     const { profile, players, showPlayers } = response.data;
    //     setPlayers(players);
    //     setPlayerData(profile);
    //     setShowPlayers(showPlayers);
    //   }
    // };

    const shareOnTwitter = () => {
        const shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
            `https://undiscoveredrecruits.com/${playerData?.auth?._id}`
        )}`;
        window.open(shareUrl, "_blank");
        setIsPopupOpen(false);
    };

    const shareOnFacebook = () => {
        const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
            `https://undiscoveredrecruits.com/${playerData?.auth?._id}`
        )}`;
        window.open(shareUrl, "_blank");
        setIsPopupOpen(false);
    };

    const copyLink = () => {
        navigator.clipboard.writeText(
            // `http://localhost:5173/undiscovered-website/player-profile/${playerData?.auth?._id}`
            `https://undiscoveredrecruits.com/player-profile/${playerData?.auth?._id}`
        );

        toast.success("copied successfully", {
            position: "top-right",
            style: {
                background: "#fff",
                color: "#333",
            },
        });
        setIsPopupOpen(false);
    };

    const currentYear = new Date().getFullYear();

    const [isContactOpen, setIsContactOpen] = useState(false);
    const [isContactDetailsOpen, setIsContactDetailsOpen] = useState(false);
    const [isAcademicsOpen, setIsAcademicsOpen] = useState(false);
    const [isAccomplishmentsOpen, setIsAccomplishmentsOpen] = useState(false);
    const [isPreviousCoachOpen, setIsPreviousCoachOpen] = useState(false);

    const contactInfo = [
        {
            label: "Name",
            value: "Name",
        },
        {
            label: "Email",
            value: "Name",
        },
        {
            label: "School",
            value: "Name",
        },
        {
            label: "Jersey number",
            value: "23",
        },
        {
            label: "Height",
            value: "Name",
        },
        {
            label: "Weight",
            value: "Name",
        },
        {
            label: "Class",
            value: "Name",
        },
        {
            label: "Birthplace",
            value: "Brooklyn, New York",
        },
    ];
    const coachInfo = [
        {
            label: "Coach Name",
            value: "Michael Bale",
        },
        {
            label: "Coach Phone",
            value: "+2558822288",
        },
        {
            label: "Coach Email",
            value: "samuel@james.com",
        },
        {
            label: "Coach Program",
            value: "NNJJA",
        },
    ];
    const academicInfo = [
        {
            label: "GPA",
            value: "5.00",
        },
        {
            label: "SAT Score",
            value: "182",
        },
        {
            label: "ACT Score",
            value: "85",
        },
        {
            label: "NCAA ID",
            value: "856545685",
        },
    ];
    const contactDetailsInfo = [
        {
            label: "Phone Number",
            value: "Name",
        },
        {
            label: "Email",
            value: "Name",
        },
    ];

    const atheleticInfo = [
        "First runner up at inter basket ball championship",
        "Highest Point on any Basket Ball turf Match",
        "Most Awarded Player in The Turf",
    ];

    const seasonString = `${currentYear}-${currentYear.toString().slice(-2)}`;

    const commonSingleItemStyle = `p-4 bg-[#fff] rounded-xl shadow-[0px_0px_13px_0px_rgba(0,0,0,0.05)] single-profile-content `;

    // player stats
    // const [stats, setStats] = useState(null);

    // useEffect(() => {
    //   fetch("/stats.json")
    //     .then((res) => res.json())
    //     .then((data) => setStats(data));
    // }, []);

    // scroll to top
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const copyToClipboard = (email) => {
        navigator.clipboard.writeText(email).then(
            () => {
                toast.success("Email copied to clipboard!", {
                    position: "top-right",
                    style: {
                        background: "#fff",
                        color: "#333",
                    },
                });
            },
            (err) => {
                console.error("Could not copy text: ", err);
            }
        );
    };

    // Function to open default mail client
    const openMailClient = (email) => {
        window.location.href = `mailto:${email}`;
    };

    // const videolink = () => ({
    //   videolink1: playersProfile?.video1,
    //   videolink2: playersProfile?.video2,
    //   videolink3: playersProfile?.video3,
    //   videolink4: playersProfile?.video4,
    // });
    const videolink = () => [
        playersProfile?.video1,
        playersProfile?.video2,
        playersProfile?.video3,
        playersProfile?.video4,
    ];

    console.log("🚀 ~ PlayerProfile ~ videolink:", videolink);

    return (
        <div>
            {/* model */}
            <Modal centered show={show} size="md" onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {isAuthenticated ? (
                            <h2 className="modal_title_h2">
                                College Coach Login Required
                            </h2>
                        ) : (
                            <h2 className="modal_title_h2"> Login Required</h2>
                        )}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="modal_main_body">
                    <div className="modal_main_div">
                        {isAuthenticated ? (
                            <p className="">
                                Are you a college coach? Please
                                <span onClick={() => navigate("/login")}>
                                    {" "}
                                    Log in
                                </span>{" "}
                                to access the complete player profile
                            </p>
                        ) : (
                            <p className="">
                                Please
                                <span onClick={() => navigate("/login")}>
                                    {" "}
                                    Log in
                                </span>{" "}
                                to access the complete player profile
                            </p>
                        )}
                    </div>
                </Modal.Body>
            </Modal>
            {/* top part */}
            <div className="flex items-center justify-content-between pb-6 pt-3">
                {/* go back */}
                <div
                    onClick={() => navigate(-1)}
                    className="w-6 h-6 cursor-pointer"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="17"
                        height="15"
                        viewBox="0 0 17 15"
                        fill="none"
                        className="w-full h-full"
                    >
                        <path
                            d="M1.25 7.27441L16.25 7.27441"
                            stroke="#130F26"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M7.2998 13.299L1.2498 7.275L7.2998 1.25"
                            stroke="#130F26"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </div>
                <p className="text-center text-[18px] font-medium text-black flex-grow">
                    Player Profile
                </p>
                <div>
                    <svg
                        className="cursor-pointer"
                        onClick={togglePopup}
                        fill="#000000"
                        height="25px"
                        width="25px"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        id="Layer_1"
                    >
                        <path d="M8,6.5A1.5,1.5,0,1,1,6.5,8,1.5,1.5,0,0,1,8,6.5ZM.5,8A1.5,1.5,0,1,0,2,6.5,1.5,1.5,0,0,0,.5,8Zm12,0A1.5,1.5,0,1,0,14,6.5,1.5,1.5,0,0,0,12.5,8Z"></path>
                    </svg>
                    {isPopupOpen && (
                        <div className="popup">
                            <div className="popup-content">
                                <div
                                    className="popup-item"
                                    onClick={flagProfile}
                                >
                                    {playerData?.flaggedBy?.find(
                                        (u) => u == currentUser?._id
                                    ) ? (
                                        <span className="svg_icone_">
                                            <svg
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <rect
                                                    width="24"
                                                    height="24"
                                                    rx="12"
                                                    fill="#FF3333"
                                                />
                                                <path
                                                    fill-rule="evenodd"
                                                    clip-rule="evenodd"
                                                    d="M8.67806 4.92316C8.67806 4.63417 8.43675 4.3999 8.13908 4.3999C7.84141 4.3999 7.6001 4.63417 7.6001 4.92316V18.8766C7.6001 19.1656 7.84141 19.3999 8.13908 19.3999C8.43675 19.3999 8.67806 19.1656 8.67806 18.8766V13.1906V6.21386V4.92316Z"
                                                    fill="#FDFDFD"
                                                />
                                                <path
                                                    d="M13.5997 6.34602L13.4533 6.28918C12.3302 5.85305 11.1007 5.74346 9.91453 5.97377L8.67798 6.21386V13.1906L9.91453 12.9505C11.1007 12.7202 12.3302 12.8298 13.4533 13.2659C14.6704 13.7385 16.0099 13.8268 17.2816 13.5181L17.4357 13.4807C17.8849 13.3718 18.2 12.9799 18.2 12.5304V7.39062C18.2 6.84604 17.6729 6.44645 17.1287 6.57853C15.9564 6.86305 14.7216 6.78169 13.5997 6.34602Z"
                                                    fill="#FDFDFD"
                                                />
                                            </svg>
                                        </span>
                                    ) : (
                                        <span className="svg_icone_">
                                            <svg
                                                width="28"
                                                height="28"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <rect
                                                    width="24"
                                                    height="24"
                                                    rx="12"
                                                    fill="white"
                                                />
                                                <path
                                                    fill-rule="evenodd"
                                                    clip-rule="evenodd"
                                                    d="M8.67806 4.92316C8.67806 4.63417 8.43675 4.3999 8.13908 4.3999C7.84141 4.3999 7.6001 4.63417 7.6001 4.92316V18.8766C7.6001 19.1656 7.84141 19.3999 8.13908 19.3999C8.43675 19.3999 8.67806 19.1656 8.67806 18.8766V13.1906V6.21386V4.92316Z"
                                                    fill="#FF3333"
                                                />
                                                <path
                                                    d="M13.5997 6.34602L13.4533 6.28918C12.3302 5.85305 11.1007 5.74346 9.91453 5.97377L8.67798 6.21386V13.1906L9.91453 12.9505C11.1007 12.7202 12.3302 12.8298 13.4533 13.2659C14.6704 13.7385 16.0099 13.8268 17.2816 13.5181L17.4357 13.4807C17.8849 13.3718 18.2 12.9799 18.2 12.5304V7.39062C18.2 6.84604 17.6729 6.44645 17.1287 6.57853C15.9564 6.86305 14.7216 6.78169 13.5997 6.34602Z"
                                                    fill="#FF3333"
                                                />
                                            </svg>
                                        </span>
                                    )}
                                    <p>Flag Profile</p>
                                </div>
                                <div
                                    className="popup-item"
                                    onClick={shareOnTwitter}
                                >
                                    <span className="svg_icone_">
                                        <svg
                                            width="28"
                                            height="28"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <rect
                                                width="24"
                                                height="24"
                                                rx="12"
                                                fill="white"
                                            />
                                            <path
                                                d="M14.8756 7H16.4089L13.059 11.236L17 17H13.9141L11.4973 13.5041L8.73182 17H7.19744L10.7805 12.4692L7 7H10.164L12.3487 10.1953L14.8756 7ZM14.3374 15.9846H15.1871L9.7024 7.96212H8.79068L14.3374 15.9846Z"
                                                fill="#000000"
                                            />
                                        </svg>
                                    </span>
                                    <p>Share on Twitter</p>
                                </div>
                                <div
                                    className="popup-item"
                                    onClick={shareOnFacebook}
                                >
                                    <span className="svg_icone_">
                                        <svg
                                            width="28"
                                            height="28"
                                            viewBox="0 0 28 28"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <rect
                                                width="28"
                                                height="28"
                                                rx="14"
                                                fill="white"
                                            />
                                            <path
                                                d="M21 14.0257C21 10.1455 17.866 7 14 7C10.134 7 7 10.1455 7 14.0257C7 17.3207 9.26002 20.0853 12.309 20.8446V16.1727H10.8655V14.0257H12.309V13.1006C12.309 10.7093 13.3872 9.60089 15.7263 9.60089C16.1698 9.60089 16.935 9.68816 17.248 9.77544V11.7217C17.0828 11.7042 16.7958 11.6955 16.4393 11.6955C15.2915 11.6955 14.848 12.1319 14.848 13.2664V14.0257H17.1345L16.7417 16.1727H14.848V21C18.3141 20.5798 21 17.6178 21 14.0257Z"
                                                fill="#1877F2"
                                            />
                                        </svg>
                                    </span>
                                    <p>Share on Facebook</p>
                                </div>
                                <div className="popup-item" onClick={copyLink}>
                                    <span className="svg_icone_">
                                        <svg
                                            width="28"
                                            height="28"
                                            viewBox="0 0 28 28"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <rect
                                                width="28"
                                                height="28"
                                                rx="14"
                                                fill="white"
                                            />
                                            <path
                                                d="M16.4277 8.71544C17.3616 7.77789 18.7276 7.7582 19.4839 8.5174C20.2416 9.27802 20.2212 10.6527 19.2866 11.5909L17.7084 13.1752C17.5181 13.3663 17.5187 13.6755 17.7097 13.8659C17.9008 14.0562 18.2101 14.0556 18.4004 13.8645L19.9786 12.2802C21.2231 11.0309 21.3793 9.03624 20.1759 7.82811C18.971 6.61855 16.9808 6.77619 15.7357 8.02615L12.5793 11.1948C11.3348 12.4442 11.1785 14.4388 12.382 15.6469C12.5723 15.838 12.8815 15.8386 13.0726 15.6483C13.2637 15.4579 13.2642 15.1487 13.0739 14.9576C12.3162 14.197 12.3367 12.8223 13.2712 11.8841L16.4277 8.71544Z"
                                                fill="#3b82f6"
                                            />
                                            <path
                                                d="M15.618 12.3534C15.4277 12.1623 15.1185 12.1617 14.9274 12.3521C14.7363 12.5424 14.7357 12.8516 14.9261 13.0427C15.6838 13.8033 15.6633 15.178 14.7288 16.1162L11.5724 19.2849C10.6384 20.2225 9.27234 20.2421 8.51608 19.4829C7.75839 18.7223 7.7788 17.3476 8.71335 16.4094L10.2916 14.825C10.4819 14.634 10.4813 14.3248 10.2902 14.1344C10.0992 13.9441 9.78996 13.9447 9.59962 14.1357L8.0214 15.7201C6.7769 16.9694 6.62066 18.9641 7.82411 20.1722C9.02901 21.3818 11.0192 21.2242 12.2643 19.9742L15.4207 16.8055C16.6652 15.5562 16.8215 13.5616 15.618 12.3534Z"
                                                fill="#3b82f6"
                                            />
                                        </svg>
                                    </span>
                                    <p>Copy Link</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {playerData && (
                <div>
                    {/* player info part */}
                    <div className="flex p-3 lg:p-6 rounded-xl info-box items-start gap-8 flex-col lg:flex-row lg:items-center ">
                        {/* player about stats */}
                        <div className=" flex items-center gap-6 flex-col lg:flex-row justify-center lg:items-start profile_main_div ">
                            {/* image */}
                            <div
                                style={{
                                    backgroundImage: `url(${playerData?.player?.picture})`,
                                    backgroundSize: "cover",
                                }}
                                className="w-[125px]  h-[125px] bg-center rounded-full border-black border-solid border-[6px] overflow-hidden"
                            ></div>

                            <div className="space-y-8 ">
                                {/* personal info */}
                                <div className="space-y-1">
                                    <div className="flex items-center justify-center lg:justify-start gap-3">
                                        <p className="text-[22px] font-bold text-[#3b82f6] leading-8 ">
                                            {" "}
                                            {playerData?.auth?.name}
                                        </p>

                                        <div className="w6 h-6">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                className="w-full h-full"
                                            >
                                                <path
                                                    d="M10.7489 2.45031C11.4389 1.86031 12.5689 1.86031 13.2689 2.45031L14.8489 3.81031C15.1489 4.07031 15.7089 4.28031 16.1089 4.28031H17.8089C18.8689 4.28031 19.7389 5.15031 19.7389 6.21031V7.91031C19.7389 8.30031 19.9489 8.87031 20.2089 9.17031L21.5689 10.7503C22.1589 11.4403 22.1589 12.5703 21.5689 13.2703L20.2089 14.8503C19.9489 15.1503 19.7389 15.7103 19.7389 16.1103V17.8103C19.7389 18.8703 18.8689 19.7403 17.8089 19.7403H16.1089C15.7189 19.7403 15.1489 19.9503 14.8489 20.2103L13.2689 21.5703C12.5789 22.1603 11.4489 22.1603 10.7489 21.5703L9.16891 20.2103C8.86891 19.9503 8.30891 19.7403 7.90891 19.7403H6.17891C5.11891 19.7403 4.24891 18.8703 4.24891 17.8103V16.1003C4.24891 15.7103 4.03891 15.1503 3.78891 14.8503L2.43891 13.2603C1.85891 12.5703 1.85891 11.4503 2.43891 10.7603L3.78891 9.17031C4.03891 8.87031 4.24891 8.31031 4.24891 7.92031V6.20031C4.24891 5.14031 5.11891 4.27031 6.17891 4.27031H7.90891C8.29891 4.27031 8.86891 4.06031 9.16891 3.80031L10.7489 2.45031Z"
                                                    fill="#4588FF"
                                                />
                                                <path
                                                    d="M8.37891 12.0001L10.7889 14.4201L15.6189 9.58008"
                                                    stroke="white"
                                                    strokeWidth="1.5"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                        </div>
                                    </div>
                                    {/* university */}
                                    <div className="flex items-center gap-2 justify-center lg:justify-start">
                                        <div className="w-[18px] h-[18px] rounded-full overflow-hidden">
                                            <img
                                                className="w-full h-full object-cover"
                                                src={
                                                    school_icon ||
                                                    playerData?.player
                                                        ?.institute?.logo
                                                }
                                                alt=""
                                            />
                                        </div>
                                        <p className="text-base text-[#131416] leading-6">
                                            {" "}
                                            {
                                                playerData?.player?.institute
                                                    ?.universityName
                                            }{" "}
                                        </p>
                                    </div>
                                    {/* location */}
                                    <div className="flex items-center gap-2 justify-center lg:justify-start">
                                        <div className="w-[18px] h-[18px] ">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="19"
                                                height="20"
                                                viewBox="0 0 19 20"
                                                fill="none"
                                                className="w-full h-full"
                                            >
                                                <g clipPath="url(#clip0_4025_507)">
                                                    <path
                                                        d="M16.625 8.41699C16.625 13.9587 9.5 18.7087 9.5 18.7087C9.5 18.7087 2.375 13.9587 2.375 8.41699C2.375 6.52733 3.12567 4.71505 4.46186 3.37886C5.79806 2.04266 7.61033 1.29199 9.5 1.29199C11.3897 1.29199 13.2019 2.04266 14.5381 3.37886C15.8743 4.71505 16.625 6.52733 16.625 8.41699Z"
                                                        stroke="#25282B"
                                                        strokeWidth="2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                    <path
                                                        d="M9.5 10.792C10.8117 10.792 11.875 9.72867 11.875 8.41699C11.875 7.10532 10.8117 6.04199 9.5 6.04199C8.18832 6.04199 7.125 7.10532 7.125 8.41699C7.125 9.72867 8.18832 10.792 9.5 10.792Z"
                                                        stroke="#25282B"
                                                        strokeWidth="2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                </g>
                                                <defs>
                                                    <clipPath id="clip0_4025_507">
                                                        <rect
                                                            width="19"
                                                            height="19"
                                                            fill="white"
                                                            transform="translate(0 0.5)"
                                                        />
                                                    </clipPath>
                                                </defs>
                                            </svg>
                                        </div>

                                        <p className="text-base text-[#131416] leading-6">
                                            {}
                                            {playerData?.player?.location
                                                ? playerData?.player?.location
                                                      .split(", ")
                                                      .slice(0, 2)
                                                      .join(", ")
                                                : "Location not available"}
                                        </p>
                                    </div>
                                </div>

                                {/* personal stats */}
                                <div className="flex items-center w-full lg:w-auto justify-center lg:justify-start gap-10 personal-stats">
                                    <div className="holder">
                                        <p>Position</p>
                                        <p className="value">
                                            {playerData?.player?.position.toUpperCase()}
                                        </p>
                                    </div>
                                    <div className="holder">
                                        <p>Height</p>
                                        <p className="value">
                                            {playerData?.player?.height}
                                        </p>
                                    </div>
                                    <div className="holder">
                                        <p>Weight</p>
                                        <p className="value">
                                            {playerData?.player?.weight}
                                        </p>
                                    </div>
                                    <div className="holder">
                                        <p>Year</p>
                                        <p className="value">
                                            {playerData?.player?.class}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* season stats */}
                        <div className="overflow-hidden flex-grow plyear_info_div">
                            {/* top area */}
                            <div className="main_info_div_of_plyar  rounded-xl overflow-hidden ">
                                <div className="bg-primaryColor text-center py-2">
                                    <p className="text-[#fff] text-base font-semibold">
                                        {seasonString} SEASON STATS
                                    </p>
                                </div>

                                {/* bottom area */}
                                <div className="season-stats flex items-center justify-evenly py-3 px-0">
                                    <div className="holder">
                                        <p>PTS</p>
                                        <p className="value">
                                            {
                                                playerData?.stats?.find(
                                                    (u) => u.stats == "career"
                                                )?.pts
                                            }
                                        </p>
                                    </div>
                                    <div className="holder">
                                        <p>REB</p>
                                        <p className="value">
                                            {
                                                playerData?.stats?.find(
                                                    (u) => u.stats == "career"
                                                )?.reb
                                            }
                                        </p>
                                    </div>
                                    <div className="holder">
                                        <p>AST</p>
                                        <p className="value">
                                            {
                                                playerData?.stats?.find(
                                                    (u) => u.stats == "career"
                                                )?.ast
                                            }
                                        </p>
                                    </div>
                                    <div className="holder">
                                        <p>FG%</p>
                                        <p className="value">
                                            {
                                                playerData?.stats?.find(
                                                    (u) => u.stats == "career"
                                                )?.fg
                                            }
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* stats area */}
            {playerData?.stats.length > 0 && (
                <div className="overflow-x-auto rounded-t-xl ">
                    <table className="mt-6 stats-table bg-[#F8FAFC#F8FAFC]  ">
                        {/* top part */}
                        <thead>
                            <tr className="text-sm bg-[#EAF0F6] text-[#0E0E0E] leading-7 font-normal ">
                                <th>STATS</th>
                                <th>GP</th>
                                <th>FG%</th>
                                <th>3P%</th>
                                <th>FT%</th>
                                <th>REB%</th>
                                <th>AST%</th>
                                <th>BLK%</th>
                                <th>STL%</th>
                                <th>PF%</th>
                                <th>TO%</th>
                                <th>PTS%</th>
                            </tr>
                        </thead>

                        {/* bottom */}
                        <tbody>
                            {playerData?.stats.map((item, index) => (
                                <tr
                                    className=" text-sm text-[#0E0E0E] leading-7   p-2.5"
                                    key={index}
                                >
                                    <td>{item.stats}</td>
                                    <td>{item.gp}</td>
                                    <td>{item.fg}</td>
                                    <td>
                                        {item.threep == null
                                            ? "0"
                                            : item.threep}
                                    </td>
                                    <td>{item.ft}</td>
                                    <td>{item.reb}</td>
                                    <td>{item.ast}</td>
                                    <td>{item.blk}</td>
                                    <td>{item.stl}</td>
                                    <td>{item.pf}</td>
                                    <td>{item.pts}</td>
                                    <td>{item.pts}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* content area  */}
            <div className="pt-6 pb-[55px] player-content">
                <div>
                    <Tabs focusTabOnClick={false}>
                        <TabList>
                            <Tab>About</Tab>
                            <Tab>Video</Tab>
                            <Tab>Photos</Tab>
                            <Tab>Offers</Tab>
                            <Tab>News</Tab>
                        </TabList>

                        {/* bottom contents area */}

                        <div className="flex items-start pt-5 lg:pt-[50px] gap-8 flex-col-reverse lg:flex-row">
                            {/* player switching */}
                            <div className=" w-full lg:w-auto lg:min-w-[25%]">
                                <SwitchPlayer players={showPlayer} />
                            </div>

                            {/* tabs content */}
                            <div className="w-full lg:w-[75%]">
                                {/* About panel */}
                                <TabPanel className={`space-y-6`}>
                                    {/* About */}
                                    <div className={commonSingleItemStyle}>
                                        <div className="title flex items-center justify-between cursor-pointer">
                                            <span className=" text-[#888] leading-normal head_text_of_titile  font-500">
                                                &#9432; ABOUT ME{" "}
                                            </span>
                                        </div>

                                        <div className="content">
                                            {playerData?.about}
                                        </div>
                                    </div>
                                    {/* Contact */}
                                    {/* <div className="profile_info_main_container"> */}

                                    <div className={commonSingleItemStyle}>
                                        <div className="title flex items-center justify-between cursor-pointer">
                                            <span className=" text-[#888] leading-normal head_text_of_titile  font-500">
                                                &#9432; CONTACT INFORMATION{" "}
                                            </span>
                                            <button
                                                onClick={() =>
                                                    handleButtonClick(0)
                                                }
                                                className={`cursor-pointer ease-in-out duration-300 w-4 h-4 ${
                                                    isCollapsed[0]
                                                        ? "rotate-180"
                                                        : ""
                                                }`}
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="12"
                                                    height="7"
                                                    viewBox="0 0 12 7"
                                                    fill="none"
                                                    className="w-full h-full"
                                                >
                                                    <path
                                                        d="M0.979454 0.813439C1.15697 0.635928 1.43474 0.61979 1.63048 0.765027L1.68656 0.813439L5.99967 5.12633L10.3128 0.813439C10.4903 0.635928 10.7681 0.61979 10.9638 0.765027L11.0199 0.813439C11.1974 0.99095 11.2135 1.26873 11.0683 1.46447L11.0199 1.52055L6.35323 6.18721C6.17572 6.36472 5.89794 6.38086 5.7022 6.23562L5.64612 6.18721L0.979454 1.52055C0.784192 1.32528 0.784192 1.0087 0.979454 0.813439Z"
                                                        fill="black"
                                                    />
                                                </svg>
                                            </button>
                                        </div>
                                        <div
                                            className={`${
                                                isCollapsed[0]
                                                    ? "block"
                                                    : "hidden"
                                            } w-full py-4 bg-transparent`}
                                        >
                                            <Collapse isOpened={isCollapsed[0]}>
                                                <div className="content">
                                                    <div className="content space-y-4 ">
                                                        <div className="main_info_div_of_conatct">
                                                            <div className="space-y-2 contact_info_text">
                                                                <p className="text-[18px] text-[#888] leading-normal  font-500">
                                                                    Name
                                                                </p>
                                                                <p className="text-[18px] text-[#000] leading-6">
                                                                    {
                                                                        playerData
                                                                            ?.auth
                                                                            ?.name
                                                                    }
                                                                </p>
                                                            </div>
                                                            <div className="space-y-2 contact_info_text">
                                                                <p className="text-[18px] text-[#888] leading-normal  font-500">
                                                                    Email
                                                                </p>
                                                                <p className="text-[18px]text-[#000] leading-6 EMAIL_teg">
                                                                    <a
                                                                        href={`mailto:${playerData?.auth?.email}`}
                                                                    >
                                                                        {
                                                                            playerData
                                                                                ?.auth
                                                                                ?.email
                                                                        }
                                                                    </a>
                                                                    <div className="email_btn">
                                                                        <button
                                                                            onClick={() =>
                                                                                copyToClipboard(
                                                                                    playerData
                                                                                        ?.auth
                                                                                        ?.email
                                                                                )
                                                                            }
                                                                            className=""
                                                                        >
                                                                            <svg
                                                                                width="24"
                                                                                height="24"
                                                                                viewBox="0 0 20 20"
                                                                                fill="none"
                                                                                xmlns="http://www.w3.org/2000/svg"
                                                                            >
                                                                                <rect
                                                                                    width="20"
                                                                                    height="20"
                                                                                    rx="10"
                                                                                    fill="white"
                                                                                />
                                                                                <path
                                                                                    d="M6.5 9.73529C6.5 7.73876 6.5 6.74049 7.08579 6.12024C7.67157 5.5 8.61438 5.5 10.5 5.5H12.5C14.3856 5.5 15.3284 5.5 15.9142 6.12024C16.5 6.74049 16.5 7.73876 16.5 9.73529V13.2647C16.5 15.2612 16.5 16.2595 15.9142 16.8797C15.3284 17.5 14.3856 17.5 12.5 17.5H10.5C8.61438 17.5 7.67157 17.5 7.08579 16.8797C6.5 16.2595 6.5 15.2612 6.5 13.2647V9.73529Z"
                                                                                    stroke="#FF3333"
                                                                                />
                                                                                <path
                                                                                    opacity="0.5"
                                                                                    d="M6 15C4.89543 15 4 14.0519 4 12.8824V8.64706C4 5.98501 4 4.65399 4.78105 3.82699C5.5621 3 6.81917 3 9.33333 3H12C13.1046 3 14 3.94811 14 5.11765"
                                                                                    stroke="#FF3333"
                                                                                />
                                                                            </svg>
                                                                        </button>
                                                                        <button
                                                                            onClick={() =>
                                                                                openMailClient(
                                                                                    playerData
                                                                                        ?.auth
                                                                                        ?.email
                                                                                )
                                                                            }
                                                                            className=""
                                                                        >
                                                                            <svg
                                                                                width="24"
                                                                                height="24"
                                                                                viewBox="0 0 20 20"
                                                                                fill="none"
                                                                                xmlns="http://www.w3.org/2000/svg"
                                                                            >
                                                                                <rect
                                                                                    width="20"
                                                                                    height="20"
                                                                                    rx="10"
                                                                                    fill="white"
                                                                                />
                                                                                <path
                                                                                    d="M13.8525 6H6.14764C5.32981 6 4.66675 6.6769 4.66675 7.5118V12.4882C4.66675 13.3231 5.32981 14 6.14764 14H13.8525C14.6703 14 15.3334 13.3231 15.3334 12.4882V7.5118C15.3334 6.6769 14.6703 6 13.8525 6ZM8.37854 11.3977L6.30479 13.2038C6.15852 13.3313 5.93862 13.3135 5.81381 13.1641C5.68898 13.0148 5.70633 12.7903 5.85277 12.6629L7.92652 10.8568C8.07277 10.7293 8.29264 10.747 8.41748 10.8965C8.54231 11.0458 8.52496 11.2703 8.37854 11.3977ZM10.0001 10.7111C9.72271 10.7104 9.45383 10.6163 9.24362 10.4307L9.24379 10.4309L9.24312 10.4304C9.24329 10.4306 9.24348 10.4306 9.24362 10.4307L6.06179 7.61146C5.91637 7.48262 5.90089 7.25816 6.02691 7.1099C6.1531 6.96145 6.373 6.94564 6.51821 7.07429L9.70094 9.89428C9.76896 9.95608 9.88104 10.0007 10.0001 10C10.119 10.0004 10.2291 9.95695 10.3009 9.89306L10.3025 9.89168L13.4819 7.07432C13.6272 6.94567 13.8471 6.96147 13.9732 7.10992C14.0992 7.25816 14.0838 7.48264 13.9384 7.61148L10.7557 10.4316C10.5461 10.6153 10.2776 10.7108 10.0001 10.7111ZM14.1865 13.1641C14.0617 13.3135 13.8418 13.3313 13.6955 13.2038L11.6218 11.3977C11.4754 11.2703 11.458 11.0458 11.5829 10.8965C11.7077 10.747 11.9276 10.7293 12.0738 10.8568L14.1476 12.6629C14.294 12.7903 14.3113 13.0148 14.1865 13.1641Z"
                                                                                    fill="#FF3333"
                                                                                />
                                                                            </svg>
                                                                        </button>
                                                                    </div>
                                                                </p>
                                                            </div>
                                                            <div className="space-y-2 contact_info_text">
                                                                <p className="text-[18px] text-[#888] leading-normal  font-500">
                                                                    School
                                                                </p>
                                                                <p className="text-[18px]text-[#000] leading-6">
                                                                    {
                                                                        playerData
                                                                            ?.player
                                                                            ?.institute
                                                                            ?.universityName
                                                                    }
                                                                </p>
                                                            </div>
                                                            <div className="space-y-2 contact_info_text">
                                                                <p className="text-[18px] text-[#888] leading-normal  font-500">
                                                                    Jersey
                                                                    number
                                                                </p>
                                                                <p className="text-[18px]text-[#000] leading-6">
                                                                    {
                                                                        playerData
                                                                            ?.player
                                                                            ?.jerseyNumber
                                                                    }
                                                                </p>
                                                            </div>
                                                            <div className="space-y-2 contact_info_text">
                                                                <p className="text-[18px] text-[#888] leading-normal  font-500">
                                                                    Height
                                                                </p>
                                                                <p className="text-[18px]text-[#000] leading-6">
                                                                    {
                                                                        playerData
                                                                            ?.player
                                                                            ?.height
                                                                    }
                                                                </p>
                                                            </div>
                                                            <div className="space-y-2 contact_info_text">
                                                                <p className="text-[18px] text-[#888] leading-normal  font-500">
                                                                    Weight
                                                                </p>
                                                                <p className="text-[18px]text-[#000] leading-6">
                                                                    {
                                                                        playerData
                                                                            ?.player
                                                                            ?.weight
                                                                    }
                                                                </p>
                                                            </div>
                                                            <div className="space-y-2 contact_info_text">
                                                                <p className="text-[18px] text-[#888] leading-normal  font-500">
                                                                    Class
                                                                </p>
                                                                <p className="text-[18px]text-[#000] leading-6">
                                                                    {
                                                                        playerData
                                                                            ?.player
                                                                            ?.class
                                                                    }
                                                                </p>
                                                            </div>
                                                            <div className="space-y-2 contact_info_text">
                                                                <p className="text-[18px] text-[#888] leading-normal  font-500">
                                                                    Birthplace
                                                                </p>
                                                                <p className="text-[18px]text-[#000] leading-6">
                                                                    {
                                                                        playerData
                                                                            ?.player
                                                                            ?.birthPlace
                                                                    }
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Collapse>
                                        </div>
                                    </div>
                                    {/* CONTACT DETAILS */}
                                    <div className={commonSingleItemStyle}>
                                        <div className="title flex items-center justify-between cursor-pointer">
                                            <span className=" text-[#888] leading-normal head_text_of_titile  font-500">
                                                &#9432; CONTACT DETAILS{" "}
                                            </span>
                                            <button
                                                onClick={() =>
                                                    isAuthenticated &&
                                                    handleButtonClick(1)
                                                }
                                                className={`cursor-pointer ease-in-out duration-300 w-4 h-4 ${
                                                    isCollapsed[1]
                                                        ? "rotate-180"
                                                        : ""
                                                }`}
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="12"
                                                    height="7"
                                                    viewBox="0 0 12 7"
                                                    fill="none"
                                                    className="w-full h-full"
                                                >
                                                    <path
                                                        d="M0.979454 0.813439C1.15697 0.635928 1.43474 0.61979 1.63048 0.765027L1.68656 0.813439L5.99967 5.12633L10.3128 0.813439C10.4903 0.635928 10.7681 0.61979 10.9638 0.765027L11.0199 0.813439C11.1974 0.99095 11.2135 1.26873 11.0683 1.46447L11.0199 1.52055L6.35323 6.18721C6.17572 6.36472 5.89794 6.38086 5.7022 6.23562L5.64612 6.18721L0.979454 1.52055C0.784192 1.32528 0.784192 1.0087 0.979454 0.813439Z"
                                                        fill="black"
                                                    />
                                                </svg>
                                            </button>
                                        </div>
                                        <div
                                            className={`${
                                                isCollapsed[1]
                                                    ? "block"
                                                    : "hidden"
                                            } w-full py-4 bg-transparent`}
                                        >
                                            <Collapse isOpened={isCollapsed[1]}>
                                                <div>
                                                    <div className="contact_info_btn_main_div">
                                                        <div className="email_div_main_box">
                                                            <a
                                                                href={`mailto:${playerData?.auth?.email}`}
                                                            >
                                                                <span>
                                                                    <svg
                                                                        width="35"
                                                                        height="35"
                                                                        viewBox="0 0 30 30"
                                                                        fill="none"
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                    >
                                                                        <rect
                                                                            width="30"
                                                                            height="30"
                                                                            rx="15"
                                                                            fill="white"
                                                                        />
                                                                        <path
                                                                            d="M20.7787 9H9.22134C7.99459 9 7 10.0153 7 11.2677V18.7323C7 19.9846 7.99459 21 9.22134 21H20.7787C22.0054 21 23 19.9846 23 18.7323V11.2677C23 10.0153 22.0054 9 20.7787 9ZM12.5677 17.0966L9.45706 19.8057C9.23766 19.9969 8.90781 19.9703 8.72059 19.7461C8.53334 19.5221 8.55938 19.1854 8.77903 18.9943L11.8897 16.2851C12.109 16.094 12.4388 16.1206 12.6261 16.3448C12.8133 16.5688 12.7873 16.9055 12.5677 17.0966ZM15 16.0667C14.5839 16.0656 14.1806 15.9245 13.8653 15.6461L13.8656 15.6464L13.8646 15.6456C13.8648 15.6459 13.8651 15.6459 13.8653 15.6461L9.09256 11.4172C8.87444 11.2239 8.85122 10.8872 9.04025 10.6648C9.22953 10.4422 9.55938 10.4185 9.77719 10.6114L14.5513 14.8414C14.6533 14.9341 14.8214 15.0011 15 15C15.1783 15.0005 15.3436 14.9354 15.4513 14.8396L15.4536 14.8375L20.2228 10.6115C20.4406 10.4185 20.7705 10.4422 20.9598 10.6649C21.1488 10.8872 21.1256 11.224 20.9074 11.4172L16.1334 15.6474C15.8191 15.9229 15.4163 16.0661 15 16.0667ZM21.2796 19.7461C21.0924 19.9703 20.7625 19.9969 20.5432 19.8057L17.4326 17.0966C17.2129 16.9055 17.1869 16.5688 17.3742 16.3448C17.5614 16.1206 17.8912 16.094 18.1106 16.2851L21.2212 18.9943C21.4408 19.1854 21.4669 19.5221 21.2796 19.7461Z"
                                                                            fill="#FF3333"
                                                                        />
                                                                    </svg>
                                                                </span>
                                                                <p>
                                                                    {
                                                                        playerData
                                                                            ?.auth
                                                                            ?.email
                                                                    }
                                                                </p>
                                                            </a>
                                                        </div>
                                                        <div className="Phone_div_main_box">
                                                            <a
                                                                href={`tel:+:${playerData?.auth?.phoneNumber}`}
                                                            >
                                                                <span>
                                                                    <svg
                                                                        width="35"
                                                                        height="35"
                                                                        viewBox="0 0 30 30"
                                                                        fill="none"
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                    >
                                                                        <rect
                                                                            width="30"
                                                                            height="30"
                                                                            rx="15"
                                                                            fill="white"
                                                                        />
                                                                        <path
                                                                            d="M17.0378 17.5995L16.6918 17.9637C16.6918 17.9637 15.8694 18.8294 13.6248 16.4665C11.3802 14.1037 12.2025 13.238 12.2025 13.238L12.4204 13.0087C12.9571 12.4437 13.0077 11.5367 12.5394 10.8745L11.5816 9.51995C11.002 8.70037 9.88209 8.5921 9.21781 9.29136L8.02553 10.5464C7.69615 10.8931 7.47543 11.3426 7.50219 11.8412C7.57067 13.1168 8.11582 15.8613 11.1578 19.0634C14.3836 22.4591 17.4104 22.5941 18.6482 22.472C19.0397 22.4333 19.3801 22.2222 19.6545 21.9334L20.7336 20.7975C21.462 20.0308 21.2566 18.7163 20.3246 18.18L18.8734 17.3448C18.2615 16.9926 17.516 17.096 17.0378 17.5995Z"
                                                                            fill="#FF3333"
                                                                        />
                                                                        <path
                                                                            d="M15.2931 7.97835C15.3434 7.6678 15.637 7.45714 15.9476 7.50741C15.9668 7.5111 16.0287 7.52266 16.0611 7.52987C16.1259 7.54431 16.2163 7.56653 16.329 7.59936C16.5545 7.66501 16.8694 7.77317 17.2474 7.94643C18.0042 8.29334 19.0113 8.90017 20.0564 9.94509C21.1014 10.99 21.7083 11.9969 22.0553 12.7536C22.2286 13.1316 22.3368 13.4464 22.4024 13.6718C22.4352 13.7846 22.4575 13.875 22.4719 13.9398C22.4791 13.9722 22.4844 13.9982 22.4881 14.0174L22.4925 14.0411C22.5427 14.3516 22.334 14.6574 22.0233 14.7077C21.7137 14.7578 21.4219 14.5481 21.3704 14.2391C21.3688 14.2307 21.3644 14.2085 21.3598 14.1874C21.3503 14.1453 21.3342 14.0786 21.3085 13.9904C21.2571 13.814 21.1678 13.5517 21.0195 13.2284C20.7234 12.5826 20.191 11.6908 19.2506 10.7507C18.3104 9.8105 17.4185 9.27811 16.7726 8.98203C16.4492 8.83381 16.1869 8.74455 16.0104 8.69314C15.9222 8.66745 15.8113 8.642 15.7692 8.63264C15.4601 8.58112 15.243 8.28801 15.2931 7.97835Z"
                                                                            fill="#FF3333"
                                                                        />
                                                                        <path
                                                                            fill-rule="evenodd"
                                                                            clip-rule="evenodd"
                                                                            d="M15.4649 10.5981C15.5514 10.2956 15.8667 10.1205 16.1692 10.2069L16.0128 10.7546C16.1692 10.2069 16.1692 10.2069 16.1692 10.2069L16.1704 10.2072L16.1715 10.2075L16.174 10.2083L16.1799 10.21L16.195 10.2147C16.2064 10.2184 16.2207 10.2231 16.2377 10.2292C16.2719 10.2413 16.317 10.2585 16.3723 10.2822C16.4829 10.3296 16.6341 10.4029 16.8199 10.5128C17.1917 10.7328 17.6992 11.0982 18.2955 11.6944C18.8918 12.2906 19.2573 12.7981 19.4773 13.1698C19.5872 13.3555 19.6605 13.5067 19.7079 13.6174C19.7316 13.6727 19.7489 13.7177 19.761 13.7518C19.767 13.7689 19.7717 13.7832 19.7755 13.7947L19.7801 13.8097L19.7818 13.8156L19.7826 13.8181L19.7829 13.8193C19.7829 13.8193 19.7833 13.8204 19.2355 13.9768L19.7833 13.8204C19.8697 14.1228 19.6945 14.4381 19.392 14.5245C19.092 14.6102 18.7795 14.4388 18.6899 14.141L18.6871 14.1328C18.6831 14.1214 18.6747 14.0989 18.6607 14.0661C18.6326 14.0006 18.5816 13.8933 18.4968 13.7501C18.3274 13.4639 18.0215 13.0316 17.4898 12.5C16.9582 11.9684 16.5257 11.6625 16.2396 11.4932C16.0963 11.4084 15.9891 11.3574 15.9234 11.3293C15.8906 11.3153 15.8681 11.3069 15.8567 11.3028L15.8485 11.3C15.5508 11.2105 15.3792 10.898 15.4649 10.5981Z"
                                                                            fill="#FF3333"
                                                                        />
                                                                    </svg>
                                                                </span>
                                                                <p>
                                                                    {
                                                                        playerData
                                                                            ?.auth
                                                                            ?.phoneNumber
                                                                    }
                                                                </p>
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div className="content space-y-4">
                                                        <div className="contact_info_text">
                                                            <p className="text-[18px] text-[#888] leading-normal font-500">
                                                                Name
                                                            </p>
                                                            <p className="text-[18px] text-[#000] leading-6">
                                                                {
                                                                    playerData
                                                                        ?.auth
                                                                        .name
                                                                }
                                                            </p>
                                                        </div>

                                                        <div className="contact_info_text">
                                                            <p className="text-[18px] text-[#888] leading-normal font-500">
                                                                School
                                                            </p>
                                                            <p className="text-[18px] text-[#000] leading-6">
                                                                {
                                                                    playerData
                                                                        ?.player
                                                                        ?.institute
                                                                        ?.universityName
                                                                }
                                                            </p>
                                                        </div>
                                                        <div className="contact_info_text">
                                                            <p className="text-[18px] text-[#888] leading-normal font-500">
                                                                Height
                                                            </p>
                                                            <p className="text-[18px] text-[#000] leading-6">
                                                                {
                                                                    playerData
                                                                        ?.player
                                                                        ?.height
                                                                }
                                                            </p>
                                                        </div>
                                                        <div className="contact_info_text">
                                                            <p className="text-[18px] text-[#888] leading-normal font-500">
                                                                Weight
                                                            </p>
                                                            <p className="text-[18px] text-[#000] leading-6">
                                                                {
                                                                    playerData
                                                                        ?.player
                                                                        ?.weight
                                                                }
                                                            </p>
                                                        </div>
                                                        <div className="contact_info_text">
                                                            <p className="text-[18px] text-[#888] leading-normal font-500">
                                                                Class
                                                            </p>
                                                            <p className="text-[18px] text-[#000] leading-6">
                                                                {
                                                                    playerData
                                                                        ?.player
                                                                        ?.class
                                                                }
                                                            </p>
                                                        </div>
                                                        {playerData?.socialLinks
                                                            ?.length > 0 ? (
                                                            <div
                                                                className="flex gap-4"
                                                                style={{
                                                                    alignItems:
                                                                        "center",
                                                                    justifyContent:
                                                                        "center",
                                                                }}
                                                            >
                                                                {playerData?.socialLinks
                                                                    ?.filter(
                                                                        (u) =>
                                                                            u?.social_type !=
                                                                                "phoneNumber" &&
                                                                            u
                                                                                ?.link
                                                                                ?.length >
                                                                                0
                                                                    )
                                                                    ?.map(
                                                                        (
                                                                            linkItem,
                                                                            index
                                                                        ) => (
                                                                            <div
                                                                                key={`socialLink_${index}`}
                                                                                className="flex items-center  space-x-2"
                                                                            >
                                                                                {linkItem.social_type ===
                                                                                    "instagram" && (
                                                                                    <a
                                                                                        target="_blank"
                                                                                        rel="noopener noreferrer"
                                                                                        href={
                                                                                            linkItem?.link
                                                                                        }
                                                                                        // href="https://www.instagram.com/aminsofttech/"
                                                                                    >
                                                                                        <svg
                                                                                            width="24"
                                                                                            height="24"
                                                                                            viewBox="0 0 24 24"
                                                                                            fill="none"
                                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                                        >
                                                                                            <g clip-path="url(#clip0_132_23)">
                                                                                                <path
                                                                                                    d="M7.99982 12.0074C7.99593 9.79858 9.78366 8.00425 11.992 8.00036C14.2008 7.99605 15.9955 9.78302 15.9998 11.9922C16.0041 14.2014 14.2164 15.9954 12.0072 15.9997C9.7988 16.0039 8.00409 14.2166 7.99982 12.0074ZM5.83851 12.0116C5.84512 15.4149 8.60911 18.1676 12.0115 18.161C15.4142 18.1544 18.1685 15.3912 18.1619 11.9879C18.1553 8.58588 15.3909 5.83159 11.9878 5.8382C8.58534 5.84481 5.8319 8.60922 5.83851 12.0116ZM16.9528 5.5855C16.9543 6.38017 17.6004 7.02367 18.3952 7.02212C19.1903 7.02058 19.8338 6.37473 19.8326 5.58006C19.831 4.78534 19.1849 4.14146 18.3898 4.14301C17.5947 4.14456 16.9512 4.79073 16.9528 5.5855ZM7.17014 21.7761C6.00023 21.7252 5.36493 21.5308 4.94155 21.3679C4.38088 21.1509 3.9808 20.8908 3.55972 20.4729C3.13944 20.0533 2.87853 19.6544 2.65963 19.0949C2.49519 18.6715 2.29728 18.037 2.24244 16.8671C2.18296 15.6023 2.16936 15.2228 2.16355 12.0187C2.15732 8.81528 2.16899 8.43583 2.22421 7.16987C2.27432 6.00072 2.46993 5.36462 2.63244 4.94162C2.84938 4.3802 3.10874 3.98087 3.52747 3.55979C3.94696 3.13876 4.34587 2.8786 4.90574 2.6597C5.32879 2.49446 5.96329 2.2981 7.13282 2.24251C8.39836 2.18265 8.77744 2.1698 11.9808 2.16357C15.1848 2.15738 15.5643 2.16863 16.8303 2.22427C17.9994 2.27518 18.6355 2.46882 19.0581 2.63251C19.6191 2.84945 20.0192 3.10801 20.4399 3.52754C20.8606 3.94707 21.1215 4.34518 21.3404 4.90623C21.5056 5.32811 21.702 5.9634 21.7572 7.13251C21.8174 8.39809 21.8311 8.7776 21.8369 11.9809C21.8431 15.1851 21.8314 15.5646 21.7758 16.8297C21.7249 17.9997 21.5309 18.6354 21.3676 19.0592C21.1506 19.6194 20.8913 20.0195 20.4722 20.4406C20.053 20.8601 19.6541 21.1218 19.0939 21.3407C18.6716 21.5055 18.0363 21.7023 16.8676 21.7579C15.6021 21.8173 15.2229 21.8309 12.0185 21.8368C8.81512 21.843 8.43609 21.8309 7.17014 21.7761ZM7.03017 0.0831132C5.75334 0.143348 4.88127 0.347864 4.11918 0.646458C3.33032 0.954005 2.6616 1.36618 1.99639 2.03415C1.33034 2.70249 0.921313 3.37238 0.616109 4.16204C0.320656 4.92606 0.120406 5.79854 0.0640148 7.07617C0.00804596 8.35614 -0.00479782 8.76438 0.00143657 12.0229C0.00767095 15.2811 0.0220147 15.6902 0.0830461 16.9705C0.144077 18.2469 0.347843 19.1187 0.646438 19.8811C0.95436 20.67 1.36611 21.3383 2.03446 22.004C2.70243 22.6696 3.37274 23.0782 4.16277 23.3839C4.92599 23.6789 5.79881 23.8799 7.07606 23.936C8.35598 23.9924 8.76459 24.0048 12.0224 23.9985C15.2817 23.9924 15.6903 23.978 16.9703 23.9173C18.2471 23.8562 19.1184 23.6518 19.8812 23.3539C20.6701 23.0452 21.3388 22.6342 22.0041 21.9659C22.6693 21.2979 23.0783 20.6276 23.3835 19.8375C23.679 19.0743 23.88 18.2015 23.9356 16.925C23.9916 15.6443 24.0049 15.2352 23.9986 11.9771C23.9923 8.71849 23.9776 8.31025 23.917 7.03065C23.8563 5.75307 23.6518 4.88171 23.3536 4.11887C23.0453 3.33001 22.6339 2.66204 21.966 1.99604C21.298 1.33079 20.6277 0.920958 19.8377 0.616552C19.0741 0.321004 18.2016 0.119629 16.9244 0.0644101C15.6444 0.00769125 15.2358 -0.00477752 11.9768 0.00145687C8.7187 0.00769125 8.31009 0.02166 7.03017 0.0831132Z"
                                                                                                    fill="#E1306C"
                                                                                                />
                                                                                            </g>
                                                                                            <defs>
                                                                                                <clipPath id="clip0_132_23">
                                                                                                    <rect
                                                                                                        width="24"
                                                                                                        height="24"
                                                                                                        fill="white"
                                                                                                    />
                                                                                                </clipPath>
                                                                                            </defs>
                                                                                        </svg>
                                                                                    </a>
                                                                                )}
                                                                                {linkItem.social_type ===
                                                                                    "facebook" && (
                                                                                    <a
                                                                                        target="_blank"
                                                                                        rel="noopener noreferrer"
                                                                                        href={
                                                                                            linkItem?.link
                                                                                        }
                                                                                    >
                                                                                        <svg
                                                                                            width="26"
                                                                                            height="26"
                                                                                            viewBox="0 0 24 24"
                                                                                            fill="none"
                                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                                        >
                                                                                            <g clip-path="url(#clip0_132_25)">
                                                                                                <path
                                                                                                    d="M24 12.0441C24 5.39233 18.6274 0 12 0C5.37258 0 0 5.39233 0 12.0441C0 17.6926 3.87431 22.432 9.10111 23.7335V15.7246H6.62658V12.0441H9.10111V10.4582C9.10111 6.35877 10.9495 4.45867 14.9594 4.45867C15.7196 4.45867 17.0314 4.60828 17.568 4.75789V8.0943C17.2848 8.06442 16.7929 8.04941 16.1817 8.04941C14.214 8.04941 13.4538 8.79751 13.4538 10.7424V12.0441H17.3734L16.7001 15.7246H13.4538V24C19.3955 23.2797 24 18.2019 24 12.0441Z"
                                                                                                    fill="#1877F2"
                                                                                                />
                                                                                            </g>
                                                                                            <defs>
                                                                                                <clipPath id="clip0_132_25">
                                                                                                    <rect
                                                                                                        width="24"
                                                                                                        height="24"
                                                                                                        fill="white"
                                                                                                    />
                                                                                                </clipPath>
                                                                                            </defs>
                                                                                        </svg>
                                                                                    </a>
                                                                                )}
                                                                                {linkItem.social_type ===
                                                                                    "twitter" && (
                                                                                    <a
                                                                                        target="_blank"
                                                                                        rel="noopener noreferrer"
                                                                                        href={
                                                                                            linkItem?.link
                                                                                        }
                                                                                    >
                                                                                        <svg
                                                                                            width="24"
                                                                                            height="24"
                                                                                            viewBox="0 0 24 24"
                                                                                            fill="none"
                                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                                        >
                                                                                            <g clip-path="url(#clip0_132_21)">
                                                                                                <path
                                                                                                    d="M18.9014 0H22.5813L14.5415 10.1663L24 24H16.5938L10.7935 15.6097L4.15636 24H0.473859L9.07331 13.1262L0 0H7.5937L12.837 7.66882L18.9014 0ZM17.6097 21.563H19.649L6.48577 2.3091H4.29764L17.6097 21.563Z"
                                                                                                    fill="#000000"
                                                                                                />
                                                                                            </g>
                                                                                            <defs>
                                                                                                <clipPath id="clip0_132_21">
                                                                                                    <rect
                                                                                                        width="24"
                                                                                                        height="24"
                                                                                                        fill="white"
                                                                                                    />
                                                                                                </clipPath>
                                                                                            </defs>
                                                                                        </svg>
                                                                                    </a>
                                                                                )}
                                                                                {linkItem.social_type ===
                                                                                    "tiktok" && (
                                                                                    <a
                                                                                        target="_blank"
                                                                                        rel="noopener noreferrer"
                                                                                        href={
                                                                                            linkItem?.link
                                                                                        }
                                                                                    >
                                                                                        <svg
                                                                                            width="24"
                                                                                            height="24"
                                                                                            viewBox="0 0 24 24"
                                                                                            fill="none"
                                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                                        >
                                                                                            <g clip-path="url(#clip0_132_27)">
                                                                                                <path
                                                                                                    fill-rule="evenodd"
                                                                                                    clip-rule="evenodd"
                                                                                                    d="M21.75 0H2.25C1.01256 0 0 1.01256 0 2.25V21.7498C0 22.9874 1.01256 23.9998 2.25 23.9998L21.75 24C22.9874 24 24 22.9874 24 21.75V2.25C24 1.01256 22.9874 0 21.75 0ZM16.4165 7.67328C15.6384 7.16616 15.077 6.35424 14.9018 5.40816C14.8642 5.20392 14.843 4.99344 14.843 4.77816H12.36L12.3559 14.7298C12.3142 15.8441 11.3969 16.7386 10.2727 16.7386C9.92304 16.7386 9.59424 16.6514 9.30432 16.4988C8.64 16.1491 8.1852 15.4529 8.1852 14.6515C8.1852 13.5005 9.12168 12.564 10.2725 12.564C10.4873 12.564 10.6934 12.5995 10.8883 12.6602V10.1254C10.6865 10.0978 10.4815 10.0807 10.2725 10.0807C7.75224 10.0807 5.70216 12.131 5.70216 14.6515C5.70216 16.1976 6.47448 17.5661 7.65336 18.3936C8.39568 18.9149 9.29904 19.2218 10.2727 19.2218C12.793 19.2218 14.843 17.1715 14.843 14.6515V9.60504C15.817 10.3039 17.0102 10.7158 18.2978 10.7158V8.23272C17.6045 8.23272 16.9586 8.02656 16.4165 7.67328Z"
                                                                                                    fill="#545454"
                                                                                                />
                                                                                            </g>
                                                                                            <defs>
                                                                                                <clipPath id="clip0_132_27">
                                                                                                    <rect
                                                                                                        width="24"
                                                                                                        height="24"
                                                                                                        fill="white"
                                                                                                    />
                                                                                                </clipPath>
                                                                                            </defs>
                                                                                        </svg>
                                                                                    </a>
                                                                                )}
                                                                            </div>
                                                                        )
                                                                    )}
                                                            </div>
                                                        ) : (
                                                            <p>
                                                                No social links
                                                                available
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                            </Collapse>
                                        </div>
                                    </div>
                                    {/* ACADEMICS */}
                                    <div className={commonSingleItemStyle}>
                                        <div className="title flex items-center justify-between cursor-pointer">
                                            <span className=" text-[#888] leading-normal head_text_of_titile  font-500">
                                                &#9432; ACADEMICS{" "}
                                            </span>
                                            <button
                                                onClick={() =>
                                                    handleButtonClick(2)
                                                }
                                                className={`cursor-pointer ease-in-out duration-300 w-4 h-4 ${
                                                    isCollapsed[2]
                                                        ? "rotate-180"
                                                        : ""
                                                }`}
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="12"
                                                    height="7"
                                                    viewBox="0 0 12 7"
                                                    fill="none"
                                                    className="w-full h-full"
                                                >
                                                    <path
                                                        d="M0.979454 0.813439C1.15697 0.635928 1.43474 0.61979 1.63048 0.765027L1.68656 0.813439L5.99967 5.12633L10.3128 0.813439C10.4903 0.635928 10.7681 0.61979 10.9638 0.765027L11.0199 0.813439C11.1974 0.99095 11.2135 1.26873 11.0683 1.46447L11.0199 1.52055L6.35323 6.18721C6.17572 6.36472 5.89794 6.38086 5.7022 6.23562L5.64612 6.18721L0.979454 1.52055C0.784192 1.32528 0.784192 1.0087 0.979454 0.813439Z"
                                                        fill="black"
                                                    />
                                                </svg>
                                            </button>
                                        </div>
                                        <div
                                            className={`${
                                                isCollapsed[2]
                                                    ? "block"
                                                    : "hidden"
                                            } w-full py-4 bg-transparent`}
                                        >
                                            <Collapse isOpened={isCollapsed[2]}>
                                                <div>
                                                    <div className="content space-y-4">
                                                        {playerData?.academics?.map(
                                                            (item, index) => (
                                                                <div
                                                                    className="space-y-2 "
                                                                    key={index}
                                                                >
                                                                    <div className="contact_info_text">
                                                                        <p className="text-[18px] text-[#888] leading-normal font-500">
                                                                            ACT
                                                                            Score
                                                                        </p>
                                                                        <p className="text-[18px] text-[#000] leading-6">
                                                                            {parseFloat(
                                                                                item?.actScore
                                                                            )}
                                                                        </p>
                                                                    </div>
                                                                    <div className="contact_info_text">
                                                                        <p className="text-[18px] text-[#888] leading-normal font-500">
                                                                            GPA
                                                                        </p>
                                                                        <p className="text-[18px] text-[#000] leading-6">
                                                                            {parseFloat(
                                                                                item?.gpa
                                                                            )}
                                                                        </p>
                                                                    </div>
                                                                    <div className="contact_info_text">
                                                                        <p className="text-[18px] text-[#888] leading-normal font-500">
                                                                            NCAA
                                                                            ID
                                                                        </p>
                                                                        <p className="text-[18px] text-[#000] leading-6">
                                                                            {parseFloat(
                                                                                item?.ncaaId
                                                                            )}
                                                                        </p>
                                                                    </div>
                                                                    <div className="contact_info_text">
                                                                        <p className="text-[18px] text-[#888] leading-normal font-500">
                                                                            SAT
                                                                            Score
                                                                        </p>
                                                                        <p className="text-[18px] text-[#000] leading-6">
                                                                            {
                                                                                item?.satScore
                                                                            }
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            )
                                                        )}
                                                    </div>
                                                </div>
                                            </Collapse>
                                        </div>
                                    </div>
                                    {/* ATHLETIC ACCOMPLISHMENTS */}
                                    <div className={commonSingleItemStyle}>
                                        <div className="title flex items-center justify-between cursor-pointer">
                                            <span className=" text-[#888] leading-normal head_text_of_titile  font-500">
                                                &#9432; ATHLETIC ACCOMPLISHMENTS{" "}
                                            </span>
                                            <button
                                                onClick={() =>
                                                    handleButtonClick(3)
                                                }
                                                className={`cursor-pointer ease-in-out duration-300 w-4 h-4 ${
                                                    isCollapsed[3]
                                                        ? "rotate-180"
                                                        : ""
                                                }`}
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="12"
                                                    height="7"
                                                    viewBox="0 0 12 7"
                                                    fill="none"
                                                    className="w-full h-full"
                                                >
                                                    <path
                                                        d="M0.979454 0.813439C1.15697 0.635928 1.43474 0.61979 1.63048 0.765027L1.68656 0.813439L5.99967 5.12633L10.3128 0.813439C10.4903 0.635928 10.7681 0.61979 10.9638 0.765027L11.0199 0.813439C11.1974 0.99095 11.2135 1.26873 11.0683 1.46447L11.0199 1.52055L6.35323 6.18721C6.17572 6.36472 5.89794 6.38086 5.7022 6.23562L5.64612 6.18721L0.979454 1.52055C0.784192 1.32528 0.784192 1.0087 0.979454 0.813439Z"
                                                        fill="black"
                                                    />
                                                </svg>
                                            </button>
                                        </div>
                                        <div
                                            className={`${
                                                isCollapsed[3]
                                                    ? "block"
                                                    : "hidden"
                                            } w-full py-4 bg-transparent`}
                                        >
                                            <Collapse isOpened={isCollapsed[3]}>
                                                <div>
                                                    <div className="content space-y-4">
                                                        {/* {playerData?.athleticaccomplishments.map(
                              (item, index) => (
                                <p
                                  className="text-base text-[#000] leading-6 relative before:w-1.5 before:h-1.5 before:bg-[#000] before:rounded-full before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 pl-5 "
                                  key={index}>
                                  {" "}
                                  {item}{" "}
                                </p>
                              )
                            )} */}
                                                        <ul>
                                                            <li>
                                                                Main Port High
                                                                School(2021-2022)
                                                                <ul>
                                                                    <li
                                                                        style={{
                                                                            listStyle:
                                                                                "disc",
                                                                        }}
                                                                    >
                                                                        All
                                                                        State
                                                                    </li>
                                                                    <li
                                                                        style={{
                                                                            listStyle:
                                                                                "disc",
                                                                        }}
                                                                    >
                                                                        Rookie
                                                                        of the
                                                                        year
                                                                    </li>
                                                                    <li
                                                                        style={{
                                                                            listStyle:
                                                                                "disc",
                                                                        }}
                                                                    >
                                                                        All-Conference
                                                                    </li>
                                                                    <li
                                                                        style={{
                                                                            listStyle:
                                                                                "disc",
                                                                        }}
                                                                    >
                                                                        Captain
                                                                        of the
                                                                        Year
                                                                    </li>
                                                                </ul>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </Collapse>
                                        </div>
                                    </div>
                                    {/* PREVIOUS COACH */}
                                    <div className={commonSingleItemStyle}>
                                        <div className="title flex items-center justify-between cursor-pointer">
                                            <span className=" text-[#888] leading-normal head_text_of_titile  font-500">
                                                &#9432; PREVIOUS COACH
                                            </span>
                                            <button
                                                onClick={() =>
                                                    handleButtonClick(4)
                                                }
                                                className={`cursor-pointer ease-in-out duration-300 w-4 h-4 ${
                                                    isCollapsed[4]
                                                        ? "rotate-180"
                                                        : ""
                                                }`}
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="12"
                                                    height="7"
                                                    viewBox="0 0 12 7"
                                                    fill="none"
                                                    className="w-full h-full"
                                                >
                                                    <path
                                                        d="M0.979454 0.813439C1.15697 0.635928 1.43474 0.61979 1.63048 0.765027L1.68656 0.813439L5.99967 5.12633L10.3128 0.813439C10.4903 0.635928 10.7681 0.61979 10.9638 0.765027L11.0199 0.813439C11.1974 0.99095 11.2135 1.26873 11.0683 1.46447L11.0199 1.52055L6.35323 6.18721C6.17572 6.36472 5.89794 6.38086 5.7022 6.23562L5.64612 6.18721L0.979454 1.52055C0.784192 1.32528 0.784192 1.0087 0.979454 0.813439Z"
                                                        fill="black"
                                                    />
                                                </svg>
                                            </button>
                                        </div>
                                        <div
                                            className={`${
                                                isCollapsed[4]
                                                    ? "block"
                                                    : "hidden"
                                            } w-full py-4 bg-transparent`}
                                        >
                                            <Collapse isOpened={isCollapsed[4]}>
                                                <div>
                                                    <div className="content space-y-4">
                                                        <div className="flex flex-col gap-4">
                                                            {playerData?.coach ? (
                                                                <>
                                                                    <div className="space-y-2 contact_info_text">
                                                                        <p className="text-[18px] text-[#888] leading-normal font-500">
                                                                            Coach
                                                                            Name
                                                                        </p>

                                                                        <a className="text-[18px] text-[#4C8FE1] leading-6 hover:underline">
                                                                            {
                                                                                playerData
                                                                                    ?.player
                                                                                    ?.previousCoachName
                                                                            }
                                                                        </a>
                                                                    </div>
                                                                    <div className="space-y-2 contact_info_text">
                                                                        <p className="text-[18px] text-[#888] leading-normal font-500">
                                                                            Coach
                                                                            Phone
                                                                        </p>
                                                                        <a
                                                                            className="text-[18px] text-[#4C8FE1] leading-6"
                                                                            href={`tel:${playerData?.coach?.phone}`}
                                                                        >
                                                                            {
                                                                                playerData
                                                                                    ?.coach
                                                                                    ?.phone
                                                                            }
                                                                        </a>
                                                                    </div>
                                                                    <div className="space-y-2 contact_info_text">
                                                                        <p className="text-[18px] text-[#888] leading-normal font-500">
                                                                            Coach
                                                                            Email
                                                                        </p>
                                                                        <a
                                                                            className="text-[18px] text-[#4C8FE1] leading-6"
                                                                            href={`mailto:${playerData?.coach?.email}`}
                                                                        >
                                                                            {
                                                                                playerData
                                                                                    ?.coach
                                                                                    ?.email
                                                                            }
                                                                        </a>
                                                                        <a
                                                                            className="text-[18px] text-[#4C8FE1] leading-6"
                                                                            href={`mailto:${playerData?.coach?.email}`}
                                                                        >
                                                                            {
                                                                                playerData
                                                                                    ?.coach
                                                                                    ?.email
                                                                            }
                                                                        </a>
                                                                    </div>
                                                                    <div className="space-y-2 contact_info_text">
                                                                        <p className="text-[18px] text-[#888] leading-normal font-500">
                                                                            Coach
                                                                            Program
                                                                        </p>
                                                                        <p className="text-[18px] text-[#000] leading-6">
                                                                            {
                                                                                playerData
                                                                                    ?.coach
                                                                                    ?.type
                                                                            }
                                                                        </p>
                                                                    </div>
                                                                </>
                                                            ) : (
                                                                <p className="text-center text-[#000] text-base leading-6 font-normal">
                                                                    No coach
                                                                    information
                                                                    available
                                                                </p>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </Collapse>
                                        </div>
                                    </div>
                                    {/* </div> */}
                                </TabPanel>

                                {/* Video Panel */}
                                <TabPanel>
                                    <PlayerReels
                                        userid={playerData?.auth?._id}
                                        videos={playerData?.videoData}
                                        playersProfile={playersProfile}
                                    />
                                </TabPanel>

                                {/* Photos Panel */}
                                <TabPanel>
                                    <PlayerPhotos photos={playerData?.photos} />
                                </TabPanel>

                                {/* Offers Panel */}
                                <TabPanel>
                                    <PlayerOffers offers={playerData?.offers} />
                                </TabPanel>

                                {/* News Feed Panel */}
                                <TabPanel>
                                    <PlayerNews
                                        newsFeedData={playerData?.newsFeedData}
                                    />
                                </TabPanel>
                            </div>
                        </div>
                    </Tabs>
                </div>
            </div>
            <Toaster />
        </div>
    );
};

export default PlayerProfile;
