import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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
      className={`flex items-center justify-center gap-7 w-full py-6 ${
        (screenSize ? index % 2 === 0 : Math.floor(index / 3) % 2 === 0)
          ? "bg-[#e9e9e9]"
          : "bg-white"
      }`}>
      {/* image */}
      <div
        style={{
          backgroundImage: `url(${playerInfo?.picture})`,
        }}
        className=" w-[100px] h-[100px] lg:w-[120px] lg:h-[120px] bg-center bg-no-repeat bg-cover rounded-full overflow-hidden "></div>

      {/* info */}
      <div className="flex flex-col gap-[2px]">
        <Link to={`/player-profile/${playerInfo?.auth?._id}`}>
          <p className="text-[18px] cursor-pointer font-medium text-[#000] hover:underline hover:text-[#4C8FE1]">
            {playerInfo?.auth?.name}
          </p>
        </Link>

        <p className="text-base text-black font-normal leading-6">
          {playerInfo?.location
            ? playerInfo.location.split(", ").slice(0, 2).join(", ")
            : "Location not available"}
          {/* {player?.location
            ? player.location.split(", ").slice(0, 2).join(", ")
            : "Location not available"} */}
        </p>
        <div className="flex items-center text-base text-black font-medium gap-2">
          <span className="after:">{playerInfo?.position?.toUpperCase()}</span>l
          <span>{playerInfo?.height}</span>l<span>{playerInfo?.class}</span>
        </div>

        <div className="w-fit mt-[10px]">
          <Link
            to={`/player-profile/${playerInfo?.auth?._id}`}
            className="py-1 px-5 text-sm  rounded-[30px] border-solid border border-black ">
            {" "}
            View Profile{" "}
          </Link>
        </div>
      </div>
    </div>
  );
};

PlayerCard.propTypes = {
  playerInfo: PropTypes.object,
};

export default PlayerCard;
