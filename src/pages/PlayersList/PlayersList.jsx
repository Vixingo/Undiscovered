import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PlayerList.css";
import Select from "react-select";
import PlayerRow from "./PlayerRow";
import axios from "axios";
import { BASE_URL } from "../../baseurl/baseurl";
import { Box, Button, IconButton } from "@mui/material";
import { IoIosArrowDown } from "react-icons/io";
const PlayersList = ({ isHome }) => {
    // console.log("🚀 ~ PlayersList ~ isHome:", isHome);
    const navigate = useNavigate();
    const user = localStorage?.getItem("user");
    const [playerClass, setClass] = useState("");
    const [playerState, setPlayerState] = useState("");
    const [search, setSearch] = useState("");
    const [position, setPosition] = useState("");
    const [players, setPlayers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [locationdata, setLocationData] = useState();
    console.log("🚀 ~ PlayersList ~ locationdata:", locationdata);

    useEffect(() => {
        // fetch("/players.json")
        //   .then((res) => res.json())
        //   .then((data) => setPlayers(data));
        setLoading(true);
        fetchPlayers();
    }, []);

    const fetchPlayers = async () => {
        let response = await axios.get(`${BASE_URL}/getPlayer`);
        // console.log();
        // console.log("FETCH =====>", response);
        setLoading(false);
        setPlayers(response?.data?.players);
    };
    const getlocationdara = async () => {
        try {
            const response = await axios.post(
                `${BASE_URL}/all_player_location_list`
            );
            console.log("🚀 ~ getlocationdara ~ response:", response);
            setLocationData(response.data.data);
        } catch (error) {
            console.log("🚀 ~ getlocationdara ~ error:", error);
        }
    };
    useEffect(() => {
        getlocationdara();
    }, []);

    const classOptions = [
        { label: "All", value: "" },
        { value: "2024", label: "2024" },
        { value: "2023", label: "2023" },
        { value: "2022", label: "2022" },
    ];
    // const stateOptions = [
    //   { label: "All", value: "" },
    //   { value: "North Carolina", label: "North Carolina"  },
    //   { value: "new Jersy", label: "New Jersy" },
    //   { value: "Los Angeles", label: "Los Angeles" },
    // ];
    const stateOptions = [
        { label: "All", value: "" },
        ...(locationdata || []).map((item) => ({
            value: item?.state || "", // Provide a default empty string if 'location' is undefined
            label: item?.state || "", // Ensure label defaults to an empty string if 'location' is undefined
        })),
    ];
    const positionOptions = [
        { label: "All", value: "" },
        { value: "PG", label: "PG" },
        { value: "SG", label: "SG" },
        { value: "SF", label: "SF" },
        { value: "PF", label: "PF" },
        { value: "C", label: "C" },
    ];

    const customSelectStyles = {
        control: (baseStyles, state) => ({
            ...baseStyles,
            borderColor: "#DBDBDB", // Change border color
            borderRadius: "70px", // Make it rounded
            boxShadow: state.isFocused ? "0 0 0 1px #DBDBDB" : "none",
            "&:focus": {
                borderColor: "#DBDBDB", // Change border color on focus
            }, // Optional: shadow on focus
        }),
        menu: (baseStyles) => ({
            ...baseStyles,
            zIndex: 9999,
            color: "#000",
        }),
        option: (baseStyles, state) => ({
            ...baseStyles,
            backgroundColor: state.isSelected ? "#f33" : "white",
        }),
        placeholder: (baseStyles) => ({
            ...baseStyles,
            color: "grey",
        }),
        singleValue: (baseStyles) => ({
            ...baseStyles,
            color: "#000",
        }),
    };
    const filteredPlayers = () => {
        return players?.filter((player) => {
            const playerClassLower = playerClass?.toLowerCase();
            const positionLower = position?.toLowerCase();
            const playerStateLower = playerState?.toLowerCase();
            const searchLower = search?.toLowerCase();

            const classMatches = playerClass
                ? player?.class?.toLowerCase()?.startsWith(playerClassLower)
                : true;
            const positionMatches = position
                ? player?.position?.toLowerCase()?.startsWith(positionLower)
                : true;
            const stateMatches = playerState
                ? player?.location?.split(", ")[1]?.toLowerCase() ===
                  playerStateLower
                : true;
            const searchMatches = search
                ? player?.auth?.name?.toLowerCase()?.includes(searchLower)
                : true;

            return (
                classMatches && positionMatches && stateMatches && searchMatches
            );
        });
    };

    return (
        <div>
            {/* top part */}
            {isHome ? (
                ""
            ) : (
                <div
                    className="relative lg:w-[90%] lg:mx-auto"
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "1rem",
                        paddingTop: "1rem",
                    }}
                >
                    {/* search bar */}
                    <div className="w-full relative ">
                        {/* icon */}
                        <div className="absolute top-1/2 -translate-y-1/2 left-6 ">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="21"
                                height="21"
                                viewBox="0 0 21 21"
                                fill="none"
                            >
                                <circle
                                    cx="9.76688"
                                    cy="9.76688"
                                    r="8.98856"
                                    stroke="#818181"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M16.0186 16.4854L19.5426 20.0002"
                                    stroke="#818181"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </div>
                        <input
                            type="text"
                            name="search"
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value);
                            }}
                            id="search"
                            placeholder="Search"
                            className="w-full py-2.5 lg:py-3.5 px-6 pl-14  bg-[#F8FAFC] border border-solid border-[#E9E9E9] rounded-[30px] focus:outline-none "
                        />
                    </div>

                    {/* select options */}
                    <div className="grid grid-cols-3  items-center justify-between  lg:flex-col gap-3 lg:gap-0">
                        <div className=" w-full lg:w-[230px]">
                            <Select
                                onChange={(e) => {
                                    setClass(e.value);
                                }}
                                styles={customSelectStyles}
                                options={classOptions}
                                placeholder="Class"
                            />
                        </div>
                        <div className=" w-full lg:w-[230px]">
                            <Select
                                onChange={(e) => {
                                    setPosition(e.value);
                                }}
                                styles={customSelectStyles}
                                options={positionOptions}
                                placeholder="Postion"
                            />
                        </div>
                        <div className=" w-full lg:w-[230px]">
                            <Select
                                onChange={(e) => {
                                    setPlayerState(e.value);
                                }}
                                styles={customSelectStyles}
                                options={stateOptions}
                                placeholder="State"
                            />
                        </div>
                    </div>

                    {/* go back */}
                    <div
                        onClick={() => navigate(-1)}
                        className="w-6 h-6 cursor-pointer absolute top-1/2 -translate-y-1/2 -left-9 hidden lg:block "
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
                </div>
            )}

            {/* player table area */}
            <div className=" pt-1  mb-8 lg:mb-[115px] overflow-x-auto min-w-full ">
                {players && (
                    <div>
                        {/* player heading */}
                        <div className=" bg-[#FDE7E8] py-[10px] lg:flex hidden items-center font-sfPro text-base text-[#0E0E0E] leading-6 font-semibold  rounded-br-none rounded-r-2xl rounded-bl-none rounded-l-2xl">
                            <p className=" min-w-[280px] pl-[100px] lg:w-[30%] text-[#ED2023] font-normal">
                                Player Name
                            </p>
                            <p className=" min-w-[120px] pl-2 lg:w-[15%] text-[#ED2023] font-normal">
                                Class
                            </p>
                            <p className=" min-w-[120px] lg:w-[10%] text-[#ED2023] font-normal">
                                Height
                            </p>
                            <p className=" min-w-[140px] lg:w-[10%] text-[#ED2023] font-normal">
                                Position
                            </p>
                            {JSON.parse(user)?.role === "coach" && (
                                <p className=" min-w-[170px] lg:w-[10%] text-[#ED2023] font-normal">
                                    Favorite
                                </p>
                            )}
                            <p className=" min-w-[200px] lg:flex-grow pl-5 text-[#ED2023] font-normal">
                                Star Rating
                            </p>
                        </div>
                        <div className="bg-[#FDE7E8] py-[10px] flex lg:border-r-0  w-full lg:hidden items-center text-base text-[#0E0E0E] font-sfPro leading-6 font-semibold  ">
                            <p className="w-[40%] pl-[10px] text-[#ED2023] font-normal">
                                Player Name
                            </p>
                            <p className="w-[40%] text-[#ED2023] font-normal">
                                Height/Weight
                            </p>
                            <p className="w-[20%] text-[#ED2023] font-normal">
                                Class
                            </p>
                        </div>
                        <div className="filtered-list-player">
                            {loading ? (
                                <div className="flex items-center justify-center min-h-80">
                                    <div role="status">
                                        <svg
                                            aria-hidden="true"
                                            className="w-20 h-20 text-gray-200 animate-spin  fill-[#FF3333]"
                                            viewBox="0 0 100 101"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                                fill="currentColor"
                                            />
                                            <path
                                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                                fill="currentFill"
                                            />
                                        </svg>
                                        <span className="sr-only">
                                            Loading...
                                        </span>
                                    </div>
                                </div>
                            ) : (
                                (isHome
                                    ? filteredPlayers().slice(0, 5)
                                    : filteredPlayers()
                                )?.map((singlePlayer, index) => (
                                    <PlayerRow
                                        player={singlePlayer}
                                        key={index}
                                        user={user}
                                        reloadData={fetchPlayers}
                                    />
                                ))
                            )}
                        </div>
                    </div>
                )}
                <Box
                    sx={{
                        m: 2,
                        textAlign: "center",
                    }}
                >
                    {" "}
                    <IconButton sx={{ backgroundColor: "#fff" }}>
                        <IoIosArrowDown />
                    </IconButton>
                    <br />
                    <br />
                    <Button
                        variant="outlined"
                        sx={{
                            borderRadius: "30px",
                            fontWeight: "400",
                            textTransform: "capitalize",
                            padding: "8px 20px",
                            fontSize: "16px",
                        }}
                    >
                        See Complete List
                    </Button>
                </Box>
            </div>
        </div>
    );
};

export default PlayersList;
