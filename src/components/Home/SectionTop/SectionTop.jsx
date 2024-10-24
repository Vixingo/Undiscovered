import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Select from "react-select";

const SectionTop = ({ title, link = "/", isClass, setClass }) => {
    const [selectedOption, setSelectedOption] = useState({
        value: "",
        label: "All",
    });
    const positionOptions = [
        { value: "", label: "All" },

        { value: "2024", label: "2024" },
        { value: "2025", label: "2025" },
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
        <div className="flex items-center justify-between pb-3">
            <p className="text-[18px] font-medium text-black"> {title} </p>

            {isClass ? (
                <>
                    {/* <label class="inline-flex items-center cursor-pointer"> */}
                    {/* <span class="me-3 text-sm font-medium text-gray-900 dark:text-gray-300">
              All players
            </span>
            <input
              type="checkbox"
              class="sr-only peer"
              onChange={(e) => setClass(e.target.checked)}
              defaultChecked={true}
            />
            <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-transparent dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primaryColor"></div>
            <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
              Class 24
            </span> */}
                    {/* </label> */}

                    <div className="inline-flex items-center cursor-pointer   space-x-2 w-[100px] lg:w-full max-w-[300px] ">
                        {/* <div className="flex flex-row items-center"> */}
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
                        <button
                            className="px-4 lg:block hidden py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                            onClick={() => {
                                setClass("");
                                setSelectedOption({ value: "", label: "All" });
                            }}
                        >
                            Reset
                        </button>
                        {/* </div> */}
                    </div>
                </>
            ) : (
                <Link className="text-base text-black leading-5" to={link}>
                    View All{" "}
                </Link>
            )}
        </div>
    );
};

SectionTop.propTypes = {
    title: PropTypes.string,
    link: PropTypes.string,
};

export default SectionTop;
