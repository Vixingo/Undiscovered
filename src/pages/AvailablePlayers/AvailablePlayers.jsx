import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./AvailablePlayers.css";
import AvailablePlayersRow from "./AvailablePlayersRow";
import axios from "axios";
import testimg from "../../assets/images/coach-cover.png";
import { BASE_URL } from "../../baseurl/baseurl";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { formatDistanceToNow } from "date-fns";

function getSubscription() {
    return localStorage.getItem("subscription");
}

export default function AvailablePlayers() {
    const isSubscription = JSON.parse(getSubscription())?.name;
    const navigate = useNavigate();
    const [currentVideo, setCurrentVideo] = useState();
    console.log("🚀 ~ currentVideo:", currentVideo);
    const [currentVideoTitle, setCurrentVideoTitle] = useState("");
    const [isPlaying, setIsPlaying] = useState(false);
    const [players, setPlayer] = useState([]);
    const [videos, setVideos] = useState([]);
    const [news, setNews] = useState([]);
    const [currentUser, setCurrentUser] = useState("");
    const [videoDurations, setVideoDurations] = useState({});
    const [selectedTab, setSelectedTab] = useState(0);
    const [loading, setLoading] = useState(true);
    const [selectedPosition, setSelectedPosition] = useState("");
    const positions = ["ALL", "PG", "SG", "SF", "PF", "C"];

    const handleTabClick = (position) => {
        setSelectedPosition(position === "ALL" ? "" : position);
    };

    const handleVideoClick = (video) => {
        setCurrentVideo(video.video);
        setCurrentVideoTitle(video.title);
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

    useEffect(() => {
        setCurrentUser(JSON.parse(localStorage.getItem("user")));
        setLoading(true);
        getAvailabilityPlayer();
    }, []);

    useEffect(() => {
        console.log("videos are ", videos);
    }, [videos]);

    const getVideoDuration = (videoUrl, videoId) => {
        const video = document.createElement("video");
        video.src = videoUrl;
        video.onloadedmetadata = () => {
            setVideoDurations((prevDurations) => ({
                ...prevDurations,
                [videoId]: video.duration,
            }));
        };
    };

    useEffect(() => {
        videos.forEach((video) => {
            getVideoDuration(video.video, video._id);
        });
    }, [videos]);

    const getAvailabilityPlayer = async () => {
        try {
            let response = await axios.get(`${BASE_URL}/getAvalabilityPlayers`);
            console.log(response.data);
            console.log("🚀 ~ getAvailabilityPlayer ~ response:", response);
            setLoading(false);
            setPlayer(response.data.players);
            setVideos(response.data.videos);
            setCurrentVideo(response.data.videos[0]?.video);
            setCurrentVideoTitle(response.data.videos[0]?.title);
            setNews(response?.data?.news);
        } catch (error) {
            if (error?.response && error?.response?.data) {
                toastr.error(error?.response?.data?.error);
            } else {
                toastr.error("Server error please try again");
            }
        }
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2 flex flex-col gap-[10px]">
                <div className="flex justify-between">
                    <div className="flex justify-center items-center gap-[10px] lg:gap-[30px] w-full">
                        <div
                            className="w-[24px] h-[24px]"
                            onClick={() => navigate(-1)}
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
                                ></path>
                                <path
                                    d="M7.2998 13.299L1.2498 7.275L7.2998 1.25"
                                    stroke="#130F26"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                ></path>
                            </svg>
                        </div>
                        <Tabs
                            selectedIndex={positions.indexOf(selectedPosition)}
                            onSelect={(index) =>
                                handleTabClick(positions[index])
                            }
                            className="w-full tabs_heding_main_div"
                        >
                            <TabList className="flex gap-4 pos-tabs">
                                <Tab
                                    className={`text-center py-2 px-4 cursor-pointer ${
                                        selectedPosition === ""
                                            ? "text-red-600 border-b-2 border-red-600"
                                            : "text-black"
                                    }`}
                                    onClick={() => handleTabClick("All")}
                                >
                                    ALL
                                </Tab>
                                <Tab
                                    className={`text-center py-2 px-4 cursor-pointer ${
                                        selectedPosition === "PG"
                                            ? "text-red-600 border-b-2 border-red-600"
                                            : "text-black"
                                    }`}
                                    onClick={() => handleTabClick("PG")}
                                >
                                    PG
                                </Tab>
                                <Tab
                                    className={`text-center py-2 px-4 cursor-pointer ${
                                        selectedPosition === "SG"
                                            ? "text-red-600 border-b-2 border-red-600"
                                            : "text-black"
                                    }`}
                                    onClick={() => handleTabClick("SG")}
                                >
                                    SG
                                </Tab>
                                <Tab
                                    className={`text-center py-2 px-4 cursor-pointer ${
                                        selectedPosition === "SF"
                                            ? "text-red-600 border-b-2 border-red-600"
                                            : "text-black"
                                    }`}
                                    onClick={() => handleTabClick("SF")}
                                >
                                    SF
                                </Tab>
                                <Tab
                                    className={`text-center py-2 px-4 cursor-pointer ${
                                        selectedPosition === "PF"
                                            ? "text-red-600 border-b-2 border-red-600"
                                            : "text-black"
                                    }`}
                                    onClick={() => handleTabClick("PF")}
                                >
                                    PF
                                </Tab>
                                <Tab
                                    className={`text-center py-2 px-4 cursor-pointer ${
                                        selectedPosition === "C"
                                            ? "text-red-600 border-b-2 border-red-600"
                                            : "text-black"
                                    }`}
                                    onClick={() => handleTabClick("C")}
                                >
                                    C
                                </Tab>
                            </TabList>
                        </Tabs>
                    </div>
                </div>
                <div className="pt-12 lg:pt-[60px] mb-8 lg:mb-[115px] w-full">
                    <div className="w-full">
                        <div className="w-full border-b-[#DBDBDB] border-b-[2px] flex lg:hidden items-center text-base text-[#0E0E0E] leading-6 font-semibold pb-3">
                            <p className="w-[30%] lg:w-[35%]">Player </p>
                            <p className="w-[20%] lg:w-[35%]">Class</p>
                            <p className="w-[20%] lg:w-[30%]">Height</p>
                            <p className="w-[20%] lg:w-[30%]">Position</p>
                        </div>
                        <div className="w-full border-b-[#DBDBDB] border-b-[2px] hidden lg:flex items-center text-base text-[#0E0E0E] leading-6 font-semibold pb-3">
                            <p className="w-[40%] lg:w-[35%]">Player </p>
                            <p className="w-[10%] lg:w-[15%]">Class</p>
                            <p className="w-[10%] lg:w-[15%]">Height</p>
                            <p className="w-[10%] lg:w-[12%]">Position</p>
                            <p className="w-[10%] lg:w-[15%]">Location</p>
                            <p className="w-[20%] lg:w-[30%]">School</p>
                        </div>
                        <div className="player-box">
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
                                players
                                    ?.filter(
                                        (player) =>
                                            selectedPosition === "" ||
                                            player?.position
                                                ?.toLowerCase()
                                                .startsWith(
                                                    selectedPosition.toLowerCase()
                                                )
                                    )
                                    .map((player, index) => (
                                        <AvailablePlayersRow
                                            key={index.toString()}
                                            player={player}
                                            currentVideo={currentVideo}
                                            isSubscription={isSubscription}
                                        />
                                    ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div className="videos-section shadow-[0px_2px_10px_0px_rgba(0,0,0,0.06)]">
                    <div className="suggested_video_heading_div">
                        <h1 className="text-[18px]">Suggested Videos</h1>
                    </div>
                    {/* <div className="video-container mb-[19px] relative">
            <video
              controls
              id="videoPlayer"
              src={currentVideo}
              className="rounded-[10px] bg-[rgba(255,255,255,0.40)] "
            />

            <p className="video-title font-semibold text-[16px] hover:text-[#4C8FE1] hover:underline">
              {currentVideoTitle}
            </p>
          </div> */}
                    <div className="video-list">
                        {videos?.slice(0, 5).map((video, index) => {
                            console.log("🚀 ~ {videos?.slice ~ video:", videos);
                            const isActive = video.video === currentVideo;
                            return (
                                <div
                                    key={index}
                                    className={`video-item flex items-center gap-[17px] mb-4 cursor-pointer ${
                                        isActive ? "bg-lightblue" : ""
                                    }`}
                                    onClick={() => handleVideoClick(video)}
                                >
                                    <div className="videom_suggested_div relative">
                                        <video
                                            src={video?.video}
                                            className="w-full h-auto"
                                        ></video>
                                        <p className="video-duration text-gray-500 text-[12px] absolute bottom-0 left-0 p-1">
                                            {videoDurations[video._id]
                                                ? `${Math.floor(
                                                      videoDurations[
                                                          video._id
                                                      ] / 60
                                                  )}:${Math.floor(
                                                      videoDurations[
                                                          video._id
                                                      ] % 60
                                                  )
                                                      .toString()
                                                      .padStart(2, "0")}`
                                                : "Loading..."}
                                        </p>
                                    </div>
                                    <div className="video-details">
                                        <p className="video-titles font-semibold text-[16px] hover:text-[#4C8FE1] hover:underline mt-4">
                                            {video?.title}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className="news-draft mt-[14px] mb-[40px]">
                    <h2 className="text-[18px] font-sfPro mb-[10px] font-[500]">
                        Recruiting News
                    </h2>
                    <div className="news-wrapper-draft">
                        {news?.slice(0, 4).map((val, i) => {
                            const words = val?.description.split(" ");

                            const truncatedDescription =
                                words.length > 15
                                    ? words.slice(0, 15).join(" ") + "..."
                                    : val?.description;
                            // Calculate the relative time
                            const timeAgo = formatDistanceToNow(
                                new Date(val.updatedAt),
                                {
                                    addSuffix: true,
                                }
                            );
                            return (
                                <div
                                    className={`bg-[#fff] p-6 rounded-xl shadow-[0px_2px_10px_0px_rgba(0,0,0,0.06)] relative h-fit w-full`}
                                >
                                    <Link to={`/news-article/${val?._id}`}>
                                        <div className="news-box-draft">
                                            <div className="draft-cont">
                                                <h2 className="font-[16px] font-sfPro">
                                                    {val?.title}
                                                </h2>
                                                <p className="text-[14px] font-normal ">
                                                    {truncatedDescription}{" "}
                                                    {words.length > 20 && (
                                                        <span className="text-blue-500 cursor-pointer">
                                                            Read More
                                                        </span>
                                                    )}
                                                </p>
                                                <p className="text-[14px] font-normal ">
                                                    {timeAgo}
                                                    {/* {val?.updatedAt} */}
                                                </p>
                                            </div>
                                            <span className="draft-image">
                                                <div className="newz_main_img_div">
                                                    <img
                                                        src={val?.banner}
                                                        alt="draft"
                                                    />
                                                </div>
                                            </span>
                                        </div>
                                    </Link>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
