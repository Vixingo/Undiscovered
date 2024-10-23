import React, { useEffect, useState } from "react";
import "./Scouting.css";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import img1 from "../../assets/images/coach-cover.png";
import phone from "../../assets/images/svgs/phone.svg";
import mail from "../../assets/images/svgs/mail.svg";
import FB from "../../assets/images/svgs/facebook.svg";
import insta from "../../assets/images/svgs/insta.svg";
import x from "../../assets/images/svgs/x.svg";
import axios from "axios";
import { BASE_URL } from "../../baseurl/baseurl";
import { useLocation } from "react-router-dom";

const Scouting = () => {
  const loaction = useLocation();
  const playerid = loaction.state;

  const [selectedPosition, setSelectedPosition] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [Playerdata, setPlayerData] = useState();
  console.log("🚀 ~ Scouting ~ Playerdata:", Playerdata);
  const [profiledata, setprofiledata] = useState();
  console.log("🚀 ~ Scouting ~ profiledata:", profiledata);
  const positions = ["ALL", "PG", "SG", "SF", "PF", "C"];

  const handleTabClick = (position) => {
    setSelectedPosition(position === "ALL" ? "" : position);
  };
  const togglePlayPause = () => {
    const videoElement = document.getElementById("videoPlayer");
    if (videoElement.paused) {
      videoElement.play();
      setIsPlaying(true);
    } else {
      videoElement.pause();
      setIsPlaying(false);
    }
  };
  const useData = JSON.parse(localStorage?.getItem("user"));

  const headers = {
    headers: {
      authorization: `Bearer ${
        JSON.parse(localStorage?.getItem("user"))?.token
      }`,
    },
  };
  const getScoutingData = async () => {
    try {
      const response = await axios.post(
        `${BASE_URL}/scouting`,
        {
          user_id: playerid?.auth?._id,
        },
        { headers }
      );
      console.log("🚀 ~ getScoutingData ~ response:", response);
      setPlayerData(response?.data?.result.player_data);
      setprofiledata(response?.data?.result?.profile_data);
    } catch (error) {
      console.log("🚀 ~ getScoutingData ~ error:", error);
    }
  };
  // profile_data

  useEffect(() => {
    getScoutingData();
  }, []);

  return (
    <div className="main_Scouting_div">
      <div className="submain_div_Scouting">
        <div
          className="top-section flex items-center justify-between gap-2 mb-4 "
          style={{ padding: "0px 10px" }}>
          <button
            onClick={() => navigate(-1)}
            type="button"
            class=" hover:bg-gray-100 font-medium rounded-full text-sm p-1.5 text-center inline-flex items-center">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M4.25 12.2734L19.25 12.2734"
                stroke="#130F26"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M10.2998 18.299L4.2498 12.275L10.2998 6.25"
                stroke="#130F26"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
          <h5 className="text-[18px]">Scouting Reports </h5>
          <div className="flex items-center gap-1">
            <button
              type="button"
              class=" hover:bg-gray-100   font-medium rounded-full text-sm p-1.5 text-center inline-flex items-center">
              <svg
                width="33"
                height="33"
                viewBox="0 0 33 33"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <rect
                  x="0.5"
                  y="0.5"
                  width="32"
                  height="32"
                  rx="16"
                  stroke="#898989"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M17.6043 8.67701L19.4317 12.3278C19.6108 12.6862 19.9565 12.9347 20.3573 12.9922L24.4453 13.5806C25.4554 13.7264 25.8573 14.9505 25.1263 15.6519L22.1702 18.4924C21.8797 18.7718 21.7474 19.1733 21.8162 19.5676L22.5138 23.5778C22.6856 24.5698 21.6298 25.3267 20.727 24.8574L17.0732 22.9627C16.715 22.7768 16.286 22.7768 15.9268 22.9627L12.273 24.8574C11.3702 25.3267 10.3144 24.5698 10.4872 23.5778L11.1838 19.5676C11.2526 19.1733 11.1203 18.7718 10.8298 18.4924L7.87368 15.6519C7.14272 14.9505 7.54464 13.7264 8.55466 13.5806L12.6427 12.9922C13.0435 12.9347 13.3903 12.6862 13.5694 12.3278L15.3957 8.67701C15.8477 7.77433 17.1523 7.77433 17.6043 8.67701Z"
                  fill="#FFCC4D"
                  stroke="#212121"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="flex justify-center items-center gap-[10px] lg:gap-[30px] w-full">
            <Tabs
              selectedIndex={positions.indexOf(selectedPosition)}
              onSelect={(index) => handleTabClick(positions[index])}
              className="w-full tabs_heding_main_div">
              <TabList className="flex gap-4 pos-tabs">
                <Tab
                  className={`text-center py-2 px-4 cursor-pointer ${
                    selectedPosition === ""
                      ? "text-red-600 border-b-2 border-red-600"
                      : "text-black"
                  }`}
                  onClick={() => handleTabClick("All")}>
                  ALL
                </Tab>
                <Tab
                  className={`text-center py-2 px-4 cursor-pointer ${
                    selectedPosition === "PG"
                      ? "text-red-600 border-b-2 border-red-600"
                      : "text-black"
                  }`}
                  onClick={() => handleTabClick("PG")}>
                  PG
                </Tab>
                <Tab
                  className={`text-center py-2 px-4 cursor-pointer ${
                    selectedPosition === "SG"
                      ? "text-red-600 border-b-2 border-red-600"
                      : "text-black"
                  }`}
                  onClick={() => handleTabClick("SG")}>
                  SG
                </Tab>
                <Tab
                  className={`text-center py-2 px-4 cursor-pointer ${
                    selectedPosition === "SF"
                      ? "text-red-600 border-b-2 border-red-600"
                      : "text-black"
                  }`}
                  onClick={() => handleTabClick("SF")}>
                  SF
                </Tab>
                <Tab
                  className={`text-center py-2 px-4 cursor-pointer ${
                    selectedPosition === "PF"
                      ? "text-red-600 border-b-2 border-red-600"
                      : "text-black"
                  }`}
                  onClick={() => handleTabClick("PF")}>
                  PF
                </Tab>
                <Tab
                  className={`text-center py-2 px-4 cursor-pointer ${
                    selectedPosition === "C"
                      ? "text-red-600 border-b-2 border-red-600"
                      : "text-black"
                  }`}
                  onClick={() => handleTabClick("C")}>
                  C
                </Tab>
              </TabList>
            </Tabs>
          </div>
        </div>
        <div className="main_player_card_of_Scouting">
          <div className="submain_player_card_of_Scouting">
            <div className="player_prsnl_detais_div">
              <div className="player_prsnl_div">
                <div className="image_div">
                  <img src={Playerdata?.picture} alt="" />
                </div>
                <div className="text_of_player_prsnl_d">
                  <div className="name_div_of_plyaer">
                    <h2>{Playerdata?.auth?.name}</h2>
                  </div>
                  <div className="coching_div">
                    <p>{`${Playerdata?.institute.universityName} | ${Playerdata?.position}`}</p>
                    {/* <p>testing | testing</p> */}
                  </div>
                  <div className="season-stats2 flex   px-0">
                    <div className="holder">
                      <p>Position</p>
                      <p className="value">{Playerdata?.position}</p>
                    </div>
                    <div className="holder">
                      <p>Height</p>
                      <p className="value">{Playerdata?.height}</p>
                    </div>
                    <div className="holder">
                      <p>Weight</p>
                      <p className="value">{Playerdata?.weight}lbs</p>
                    </div>
                    <div className="holder">
                      <p>Year</p>
                      <p className="value">2024</p>
                    </div>
                  </div>
                  <div className="social_icon_div">
                    <a href={`tel:${Playerdata?.auth?.phoneNumber}`}>
                      <img src={phone} alt="" />
                    </a>
                    <a href={`mailto:${Playerdata?.auth?.email}`}>
                      <img src={mail} alt="" />
                    </a>
                    <a href={profiledata?.socialLinks[0].link}>
                      <img src={FB} alt="" />
                    </a>
                    <a href={profiledata?.socialLinks[2].link}>
                      <img src={insta} alt="" />
                    </a>
                    <a href={profiledata?.socialLinks[1].link}>
                      <img src={x} alt="" />
                    </a>
                  </div>
                </div>
              </div>
              <div className="coach_prsnl_div">
                <h2>Coaches Info</h2>
                <div className="coach_info_div">
                  <div className="coach_details">
                    <h2>Tarik Brown</h2>
                    <p>Assistant coach | High school</p>
                  </div>
                  <div className="coach_conact_icon">
                    <a href="mailto:">
                      <img src={mail} alt="" />
                    </a>
                    <a href="tel:+">
                      <img src={phone} alt="" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="overflow-x-auto  rounded-t-xl stats_bar">
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
                  {/* {profiledata?.stats?.map((item, index) => ( */}
                  <tr
                    className="text-sm text-[#0E0E0E] leading-7 p-2.5"
                    // key={index}
                  >
                    <td></td>
                    <td>{profiledata?.stats?.gp}</td>
                    <td>{profiledata?.stats?.fg}</td>
                    <td>{profiledata?.stats?.threep}</td>
                    <td>{profiledata?.stats?.ft}</td>
                    <td>{profiledata?.stats?.reb}</td>
                    <td>{profiledata?.stats?.ast}</td>
                    <td>{profiledata?.stats?.blk}</td>
                    <td>{profiledata?.stats?.stl}</td>
                    <td>{profiledata?.stats?.pf}</td>
                    <td>{profiledata?.stats?.to}</td>
                    <td>{profiledata?.stats?.pts}</td>
                  </tr>
                  {/* // ))} */}
                </tbody>
              </table>
            </div>
            <div className="newdiv_of_weekness">
              <div className="div_of_starenth">
                <div className="heading_div">
                  <h2>Strengths</h2>
                </div>
                <div className="text_div_of_content">
                  <p
                    dangerouslySetInnerHTML={{
                      __html: Playerdata?.strengths,
                    }}></p>
                </div>
              </div>
              <div className="div_of_starenth">
                <div className="heading_div">
                  <h2>Weaknesses</h2>
                </div>
                <div className="text_div_of_content">
                  <p
                    dangerouslySetInnerHTML={{
                      __html: Playerdata?.weaknesses,
                    }}></p>
                </div>
              </div>
            </div>
            <div className="newdiv_of_weekness">
              <div className="div_of_starenth">
                <div className="video-container2 mb-[19px] relative">
                  <video
                    controls
                    id=""
                    src={Playerdata?.video1}
                    className="rounded-[10px] bg-[rgba(255,255,255,0.40)] "
                  />

                  {/* <div
                    className="video-overlay absolute inset-0 flex items-center justify-center"
                    onClick={togglePlayPause}>
                    {isPlaying ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="15"
                        height="18"
                        viewBox="0 0 15 18"
                        fill="none">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M4 2H1C0.447715 2 0 2.44772 0 3V15C0 15.5523 0.447715 16 1 16H4C4.55228 16 5 15.5523 5 15V3C5 2.44772 4.55228 2 4 2ZM14 2H11C10.4477 2 10 2.44772 10 3V15C10 15.5523 10.4477 16 11 16H14C14.5523 16 15 15.5523 15 15V3C15 2.44772 14.5523 2 14 2Z"
                          stroke="white"
                          strokeWidth="1.3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="15"
                        height="18"
                        viewBox="0 0 15 18"
                        fill="none">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M14 8.78738C14 6.67844 3.19057 -0.0682953 1.96437 1.14481C0.73817 2.35792 0.620266 15.1025 1.96437 16.4299C3.30848 17.762 14 10.8963 14 8.78738Z"
                          stroke="white"
                          strokeWidth="1.3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </div> */}
                </div>
              </div>
              <div className="div_of_starenth">
                <div className="heading_div">
                  <h2>Academics</h2>
                </div>
                <div className="text_div_of_content2">
                  <div className="div_of_academics_">
                    <p>GPA:</p>
                    <p>{profiledata?.academics[0]?.gpa}</p>
                  </div>
                  <div className="div_of_academics_">
                    <p>SAT/ACT:</p>
                    <p>{profiledata?.academics[0]?.satScore}</p>
                  </div>
                  <div className="div_of_academics_">
                    <p>NCAA ID:</p>
                    <p>{profiledata?.academics[0]?.ncaaId} </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bottom_text">
              <p>
                The highlights that make Zach Edey an intriguing NBA prospect
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scouting;
