import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Select from "react-select";
import axios from "axios";
import { BASE_URL } from "../../baseurl/baseurl";

const SwitchPlayer = ({ players }) => {
  // console.log("🚀 ~ SwitchPlayer ~ players:", players);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(7);
  const [playerClass, setPlayerClass] = useState("");
  const [position, setPosition] = useState("");
  const [playerState, setPlayerState] = useState("");
  const [locationdata, setLocationData] = useState();
  const getlocationdara = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/all_player_location_list`);
      // console.log("🚀 ~ getlocationdara ~ response:", response);
      setLocationData(response.data.data);
    } catch (error) {
      // console.log("🚀 ~ getlocationdara ~ error:", error);
    }
  };
  useEffect(() => {
    getlocationdara();
  }, []);
  const classOptions = [
    { value: "", label: "All" },
    { value: "2024", label: "2024" },
    { value: "2023", label: "2023" },
    { value: "2022", label: "2022" },
  ];
  // const stateOptions = [
  //   { value: "", label: "All" },
  //   { value: "North Carolina", label: "North Carolina" },
  //   { value: "New Jersey", label: "New Jersey" },
  //   { value: "Los Angeles", label: "Los Angeles" },
  //   { value: "Chicago, IL", label: "Chicago, IL" },
  // ];
  const stateOptions = [
    { label: "State", value: "" },

    ...(locationdata || []).map((item) => ({
      value: item?.state || "",
      label: item?.state || "",
    })),
  ];
  const positionOptions = [
    { value: "", label: "All" },
    { value: "PG", label: "PG" },
    { value: "SG", label: "SG" },
    { value: "SF", label: "SF" },
    { value: "PF", label: "PF" },
    { value: "C", label: "C" },
  ];

  const customSelectStyles = {
    control: (baseStyles, state) => ({
      ...baseStyles,
      borderColor: "#DBDBDB",
      borderRadius: "70px",
      boxShadow: state.isFocused ? "0 0 0 1px #DBDBDB" : "none",
      "&:focus": {
        borderColor: "#DBDBDB",
      },
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

      const classMatches = playerClass
        ? player?.class?.toLowerCase()?.startsWith(playerClassLower)
        : true;
      const positionMatches = position
        ? player?.position?.toLowerCase()?.startsWith(positionLower)
        : true;
      // const stateMatches = playerState
      //   ? player?.location?.toLowerCase()?.startsWith(playerStateLower)
      //   : // ? player?.location?.toLowerCase()?.startsWith(playerStateLower)
      //     true;

      const stateMatches = playerState
        ? player?.location?.split(", ")[1]?.toLowerCase() === playerStateLower
        : true;

      return classMatches && positionMatches && stateMatches;
    });
  };

  const handleReset = () => {
    setPlayerClass("");
    setPosition("");
    setPlayerState("");
  };

  return (
    <div>
      <div className="bg-[#E9E9E9] rounded-t-xl pt-4 pb-2 px-4">
        <h4 className="small--gray--text">SWITCH PLAYER</h4>
      </div>

      {/* Filtering area */}
      <div className="pt-5 pb-4 px-4 space-y-5 ">
        <div className="flex flex-col gap-4">
          <Select
            styles={customSelectStyles}
            options={positionOptions}
            placeholder="Position"
            value={positionOptions.find((option) => option.value === position)}
            onChange={(selectedOption) =>
              setPosition(selectedOption?.value || "")
            }
          />
        </div>
        <div className="flex flex-col gap-4">
          <Select
            styles={customSelectStyles}
            options={stateOptions}
            placeholder="State"
            value={stateOptions.find((option) => option.value === playerState)}
            onChange={(selectedOption) =>
              setPlayerState(selectedOption?.value || "")
            }
          />
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            onClick={handleReset}>
            Reset
          </button>
        </div>
      </div>

      {/* Players area */}
      <div>
        {/* Player list */}
        <div>
          {filteredPlayers()
            ?.slice(startIndex, endIndex)
            .map((player, index) => (
              <div
                // style={{ width: '17rem' }}
                className={`flex items-center gap-4 py-3 px-4  ${
                  index % 2 === 0 ? "bg-[#F8FAFC]" : "bg-white"
                }`}
                key={index}>
                {/* Profile */}
                <div className="min-w-[80px] max-w-[80px] h-[80px] rounded-full overflow-hidden">
                  <img
                    className="w-full h-full object-cover"
                    src={player?.picture}
                    alt=""
                  />
                </div>
                {/* Details */}
                <div className="flex flex-col gap-[1px]">
                  <Link to={`/player-profile/${player?.auth?._id}`}>
                    <p className="text-[18px] font-medium  leading-normal cursor-pointer text-[#000] hover:underline hover:text-[#4C8FE1]">
                      {player?.auth?.name}
                    </p>
                  </Link>
                  <p className="text-[14px] font-normal text-[#000] leading-6">
                    {player?.location
                      ? player.location.split(", ").slice(0, 2).join(", ")
                      : "Location not available"}
                  </p>
                  <div className="flex items-center gap-[4px] text-[14px] font-normal text-[#000] leading-normal">
                    <span className="text-[14px]">
                      {player?.position?.toUpperCase()}
                    </span>
                    l<span className="text-[14px]"> {player?.height} </span>l
                    <span className="text-[14px]"> {player?.class} </span>
                  </div>
                </div>
              </div>
            ))}
        </div>

        {/* Load more button */}
        {players?.length > 7 && (
          <button
            onClick={(e) => {
              e.preventDefault();
              setStartIndex((prev) => endIndex);
              setEndIndex((prev) => prev + 7);
            }}
            className="mt-4 py-3 w-full flex items-center justify-center text-sm text-[#000] border border-solid border-[#DBDBDB] rounded-[70px]">
            More Players
          </button>
        )}
      </div>
    </div>
  );
};

export default SwitchPlayer;
