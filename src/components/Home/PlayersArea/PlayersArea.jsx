import { useEffect, useState } from "react";
import SectionTop from "../SectionTop/SectionTop";
import PlayerCard from "./PlayerCard";
import Select from "react-select";
import "./playerarea.css";
const PlayersArea = ({ players, loading }) => {
    const [playerClass, setClass] = useState("");
    const [selectedOption, setSelectedOption] = useState({
        value: "",
        label: "All",
    });

    const positionOptions = [
        { value: "", label: "All" },
        { value: "2024", label: "2024" },
        { value: "2023", label: "2023" },
        { value: "2022", label: "2022" },
        { value: "2021", label: "2021" },
    ];

    const customSelectStyles = {
        control: (baseStyles, state) => ({
            ...baseStyles,
            borderColor: "#000", // Change border color
            borderRadius: "8px", // Make it rounded
            boxShadow: state.isFocused ? "0 0 0 1px #DBDBDB" : "none",
            "&:focus": {
                borderColor: "#DBDBDB", // Change border color on focus
            }, // Optional: shadow on focus
            "&:hover": {
                borderColor: "#000",
            },
            cursor: "pointer",
        }),
        menu: (baseStyles) => ({
            ...baseStyles,
            zIndex: 9999,
            color: "#000",
        }),
        option: (baseStyles, state) => ({
            ...baseStyles,
            backgroundColor: state.isSelected ? "#f33" : "white",
            cursor: "pointer",
        }),
        placeholder: (baseStyles) => ({
            ...baseStyles,
            color: "#000",
            borderColor: "#000",
        }),
        singleValue: (baseStyles) => ({
            ...baseStyles,
            color: "#000",
        }),
        dropdownIndicator: (base) => ({
            ...base,
            color: "inherit",
            "&:hover": {
                color: "inherit",
            },
        }),
    };

    return (
        <div className=" relative bg-white my-8 py-10 rounded-2xl px-8">
            {/* top part */}
            <SectionTop title={"Top Player’s"} />

            {/* year select */}
            <div className="flex flex-row items-center space-x-2 w-[100px] lg:w-full max-w-[100px] absolute right-[100px] top-9">
                <Select
                    value={selectedOption}
                    styles={customSelectStyles}
                    onChange={(e) => {
                        setClass(e.value);
                        setSelectedOption(e);
                    }}
                    options={positionOptions}
                    className="flex-grow"
                />
                {/* <button
          className='px-4 lg:block hidden py-2 bg-blue-500 text-white rounded hover:bg-blue-700'
          onClick={() => {
            setClass('');
            setSelectedOption({ value: '', label: 'All' });
          }}>
          Reset
        </button> */}
            </div>
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
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            ) : (
                <div className="player-box-home">
                    <div className="grid grid-cols-1 lg:grid-cols-1 mt-[20px] justify-center  items-center">
                        {players &&
                            players
                                .filter((u) =>
                                    u?.class?.startsWith(
                                        playerClass?.toString()
                                    )
                                )
                                .map((player, index) => (
                                    <PlayerCard
                                        key={index}
                                        playerInfo={player}
                                        index={index}
                                    />
                                ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default PlayersArea;
