import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CiLocationOn } from "react-icons/ci";
const PlayerCard = ({ playerInfo, index }) => {
    const [screenSize, setScreenSize] = useState(false);

    useEffect(() => {
        function handleResize() {
            const width = window.innerWidth;
            if (width <= 768) {
                setScreenSize(true);
            } else {
                setScreenSize(false);
            }
        }

        // Initial call to set the initial screen size
        handleResize();

        // Event listener for window resize
        window.addEventListener("resize", handleResize);

        // Clean-up function to remove event listener
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    return (
        <div
            className={`flex items-center justify-between gap-6 w-full py-3 sm:py-6 rounded-xl my-2 px-2 md:px-3 lg:px-8 drop-shadow-lg`}
            style={{ border: " 1px solid #D9D9D9" }}
        >
            {/* image */}
            <div className="flex items-center gap-3">
                <div
                    style={{
                        backgroundImage: `url(${playerInfo?.picture})`,
                    }}
                    className=" w-[70px] h-[70px] lg:w-[90px] lg:h-[90px] bg-center bg-no-repeat bg-cover rounded-full overflow-hidden "
                ></div>

                {/* info */}
                <div className="flex flex-col gap-[2px]">
                    <Link to={`/player-profile/${playerInfo?.auth?._id}`}>
                        <p className="text-[16px] md:text-[20px] cursor-pointer font-medium text-[#000] hover:underline hover:text-[#ED2023] leading-[30px]">
                            {playerInfo?.auth?.name}
                        </p>
                    </Link>

                    <div className="flex items-center text-[14px] md:text-base text-black opacity-60 font-normal gap-2 leading-6">
                        <span className="after:">{playerInfo?.height}</span>l
                        <span>{playerInfo?.position?.toUpperCase()}</span>l
                        <span>{playerInfo?.class}</span>
                    </div>
                    <div className="text-[14px] md:text-base text-black opacity-60 font-normal leading-6 flex items-center gap-1 ">
                        <CiLocationOn />{" "}
                        <p>
                            {" "}
                            {playerInfo?.location
                                ? playerInfo.location
                                      .split(", ")
                                      .slice(0, 2)
                                      .join(", ")
                                : "Location not available"}
                        </p>
                        {/* {player?.location
            ? player.location.split(", ").slice(0, 2).join(", ")
            : "Location not available"} */}
                    </div>
                </div>
            </div>
            <div className=" mt-[10px]">
                <Link
                    to={`/player-profile/${playerInfo?.auth?._id}`}
                    className="p-2 !lg:px-8 text-[13px] lg:text-[16px] bg-[#FF3333] bg-opacity-20 text-[#ED2023] rounded-[30px] border-solid font-normal  "
                >
                    {" "}
                    View Profile{" "}
                </Link>
            </div>
        </div>
    );
};

PlayerCard.propTypes = {
    playerInfo: PropTypes.object,
};

export default PlayerCard;
