import { useEffect, useState } from "react";
import school from "../../../src/assets/images/newlogo.svg";

const PlayerOffers = ({ offers }) => {
  console.log("🚀 ~ PlayerOffers ~ offers:", offers);
  // Function to format date
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", options).format(date);
  };

  return (
    <div>
      {/* wrapper */}
      <div className="flex flex-col gap-4">
        {offers && offers.length > 0 ? (
          offers.map((item, index) => (
            <div
              className="flex items-center justify-between p-3 bg-[#fff] rounded-xl shadow-[0px_0px_13px_0px_rgba(0,0,0,0.05)]"
              key={index}>
              {/* details area */}
              <div className="flex items-center gap-2.5">
                {/* icon */}

                {item?.logo ? (
                  <div
                    className="w-[50px] h-[50px]   overflow-hidden "
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "50%",
                      // boxShadow: "rgba(0, 0, 0, 0.35) 0px 0px 5px",
                    }}>
                    <img
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                      src={item?.logo}
                      alt=""
                    />
                  </div>
                ) : (
                  <div
                    className="w-[60px] h-[60px]   overflow-hidden "
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "50%",
                      // boxShadow: "rgba(0, 0, 0, 0.35) 0px 0px 5px",
                    }}>
                    <img
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                      src={school}
                      alt=""
                    />
                  </div>
                )}

                <div>
                  <p className="text-base font-medium text-[#4C8FE1] leading-normal hover:underline hover:text-[#4C8FE1]">
                    {item?.university}
                  </p>
                  <p className="text-sm text-[#797979] leading-normal">
                    {item?.date ? formatDate(item?.date) : ""}
                  </p>
                </div>
              </div>

              {/* status area */}
              {/* <div
                className={`py-1 px-2.5 rounded-[40px]  flex items-center gap-1 border ${
                  item?.status === "Committed"
                    ? "border-green-500 "
                    : item?.status === "Offered"
                    ? "border-blue-500 "
                    : item?.status === "Visited"
                    ? "border-yellow-300 "
                    : item?.status === "Visiting"
                    ? "border-purple-500 "
                    : item?.status === "Walk-on"
                    ? "border-orange-500 "
                    : item?.status === "Redshirt"
                    ? "border-black "
                    : item?.status === "Interested"
                    ? "border-yellow-600 "
                    : item?.status === "Transferred"
                    ? "border-red-500 "
                    : item?.status === "Pending"
                    ? "border-white "
                    : item?.status === "Signed"
                    ? "border-cyan-500 "
                    : ""
                }`}>
                <p className="text-sm text-[#000] leading-normal ">
                  <span
                    style={{
                      width: "10px",
                      height: "10px",
                      background: "black",
                    }}></span>
                  {item?.status}
                </p>
              </div> */}

              <div
                className="div_status_profile"
                style={{
                  borderWidth: "2px",
                  borderColor:
                    item?.status === "Committed"
                      ? "#10CA7F"
                      : item?.status === "Offered"
                      ? "#2378D3"
                      : item?.status === "Visited"
                      ? "#C4C806"
                      : item?.status === "Visiting"
                      ? "#A020F0"
                      : item?.status === "Walk-on"
                      ? "#FFB900"
                      : item?.status === "Redshirt"
                      ? "#000000"
                      : item?.status === "Interested"
                      ? "#BF9934"
                      : item?.status === "Transferred"
                      ? "#FF3333"
                      : item?.status === "Pending"
                      ? "#C4C806"
                      : item?.status === "Signed"
                      ? "#00BCD4"
                      : "#000",
                }}>
                <p
                  style={{
                    width: "7px",
                    height: "7px",
                    borderRadius: "50%",

                    backgroundColor:
                      item?.status === "Committed"
                        ? "#10CA7F"
                        : item?.status === "Offered"
                        ? "#2378D3"
                        : item?.status === "Visited"
                        ? "#C4C806"
                        : item?.status === "Visiting"
                        ? "#A020F0"
                        : item?.status === "Walk-on"
                        ? "#FFB900"
                        : item?.status === "Redshirt"
                        ? "#000000"
                        : item?.status === "Interested"
                        ? "#BF9934"
                        : item?.status === "Transferred"
                        ? "#FF3333"
                        : item?.status === "Pending"
                        ? "#C4C806"
                        : item?.status === "Signed"
                        ? "#00BCD4"
                        : "#000",
                  }}></p>

                <p
                  style={{
                    color:
                      item?.status === "Committed"
                        ? "#10CA7F"
                        : item?.status === "Offered"
                        ? "#2378D3"
                        : item?.status === "Visited"
                        ? "#C4C806"
                        : item?.status === "Visiting"
                        ? "#A020F0"
                        : item?.status === "Walk-on"
                        ? "#FFB900"
                        : item?.status === "Redshirt"
                        ? "#000000"
                        : item?.status === "Interested"
                        ? "#BF9934"
                        : item?.status === "Transferred"
                        ? "#FF3333"
                        : item?.status === "Pending"
                        ? "#C4C806"
                        : item?.status === "Signed"
                        ? "#00BCD4"
                        : "",
                  }}>
                  {item?.status}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-[#000] text-base leading-6 font-normal">
            No offers
          </p>
        )}
      </div>
    </div>
  );
};

export default PlayerOffers;
