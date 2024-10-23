import { useEffect, useState } from "react";
import Slider from "react-slick";
import { Link, useNavigate } from "react-router-dom";
import "../AvailablePlayers/AvailablePlayers";
import axios from "axios";
import banner from "../../assets/images/about-banner.png";
import { BASE_URL } from "../../baseurl/baseurl";
import { IoChevronBackOutline } from "react-icons/io5";
import { IoChevronForward } from "react-icons/io5";
import { formatDistanceToNow } from "date-fns";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} absolute top-[-10%] right-[1%]  bg-[#F8FAFC] text-black hover:text-black rounded-full h-[30px] w-[30px] flex items-center justify-center`}
      onClick={onClick}>
      <IoChevronForward size={20} />
    </div>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} absolute top-[-10%] right-[5%] left-auto bg-[#F8FAFC] text-black hover:text-black rounded-full h-[30px] w-[30px] flex items-center justify-center`}
      onClick={onClick}>
      <IoChevronBackOutline size={20} />
    </div>
  );
}

export default function AvailablePlayers() {
  const navigate = useNavigate();
  const [currentVideo, setCurrentVideo] = useState();
  const [currentVideoTitle, setCurrentVideoTitle] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [videos, setVideos] = useState([]);
  const [news, setNews] = useState([]);
  const [videoDurations, setVideoDurations] = useState({});
  // news feed
  const [topNews, setTopNews] = useState([]);
  console.log("🚀 ~ AvailablePlayers ~ topNews:", topNews);
  const [highlights, setHighlights] = useState([]);
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [firstItem, ...remainingItems] = highlights;

  // getNewFeed
  const getNewFeed = async () => {
    try {
      setLoading(true); // Set loading to true before the request
      let response = await axios.get(`${BASE_URL}/getNewsFeed`);
      const { topNews, highlights, interviews } = response.data;
      setTopNews(topNews);
      setHighlights(highlights);
      setInterviews(interviews);
    } catch (error) {
      if (error?.response && error?.response?.data) {
        toastr.error(error?.response?.data?.error);
      } else {
        toastr.error("Server error please try again");
      }
    } finally {
      setLoading(false); // Set loading to false after the request completes
    }
  };

  useEffect(() => {
    getNewFeed();
  }, []);

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
  // const formatDate = (dateString) => {
  //   const date = new Date(dateString);
  //   return date.toLocaleDateString("en-GB", {
  //     month: "long",
  //     day: "2-digit",
  //     year: "numeric",
  //   });
  // };
  const formatDate = (dateString) => {
    if (!dateString) {
      console.warn("Invalid dateString:", dateString);
      return "Invalid Date";
    }

    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
      console.warn("Invalid Date Object:", date);
      return "Invalid Date";
    }

    return new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "2-digit",
      year: "numeric",
    }).format(date);
  };
  const getAvailabilityPlayer = async () => {
    try {
      let response = await axios.get(`${BASE_URL}/getAvalabilityPlayers`);
      console.log(response.data);
      setVideos(response.data.videos);
      setCurrentVideo(response.data.videos[0]?.video);
      setNews(response?.data?.news);
    } catch (error) {
      if (error?.response && error?.response?.data) {
        toastr.error(error?.response?.data?.error);
      } else {
        toastr.error("Server error please try again");
      }
    }
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="grid grid-cols-1  lg:grid-cols-3 gap-4">
      <div className="lg:col-span-2 flex flex-col">
        <div className="w-[24px] h-[24px]" onClick={() => navigate(-1)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="17"
            height="15"
            viewBox="0 0 17 15"
            fill="none"
            class="w-full h-full">
            <path
              d="M1.25 7.27441L16.25 7.27441"
              stroke="#130F26"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"></path>
            <path
              d="M7.2998 13.299L1.2498 7.275L7.2998 1.25"
              stroke="#130F26"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"></path>
          </svg>
        </div>

        <div className="relative w-full h-[280px] lg:h-[400px] bg-black rounded-[20px] overflow-hidden mt-[30px] mb-5 lg:mb-20 ">
          {loading ? (
            <h3 className="text-white w-full h-full flex items-center justify-center">
              Loading...
            </h3>
          ) : (
            <img
              className="w-full h-full object-cover opacity-40"
              src={topNews?.[0]?.banner}
              alt=""
            />
          )}
          <div className="absolute bottom-[10%] left-10 flex flex-col gap-2 max-w-[400px] z-[50]">
            <button className="text-sm leading-6 text-[#fff] py-1 px-6 bg-primaryColor rounded-[30px] w-fit">
              Follow
            </button>

            <h4
              className="text-[18px] text-white cursor-pointer hover:underline hover:text-[#4c8fe1]"
              onClick={() => navigate(`/news-article/${item?._id}`)}>
              {topNews?.[0]?.title}
            </h4>
          </div>
        </div>
        {/* trending */}
        <div className="trending">
          <h3 className="text-[#000] text-[18px] font-medium leading-normal mb-[10px]">
            Trending
          </h3>
          {/* <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4'> */}
          <Slider {...settings}>
            {topNews.map((item, index) => {
              const timeAgo = formatDistanceToNow(new Date(item.updatedAt), {
                addSuffix: true,
              });
              return (
                <div className="h-full px-2" key={Math.random()}>
                  <div
                    onClick={() => navigate(`/news-article/${item?._id}`)}
                    className={`bg-[#fff] p-2 rounded-xl shadow-[0px_2px_10px_0px_rgba(0,0,0,0.06)] relative h-full w-full mb-4 cursor-pointer`}>
                    {/* img wrapper */}
                    <div className=" w-full h-[150px] rounded-xl overflow-hidden mb-1.5">
                      <img
                        className="w-full h-full object-cover"
                        src={item?.banner}
                        alt=""
                      />
                    </div>
                    <p className="text-[#5f5f5f] text-[12px] leading-6 mt-[15px] mb-[10px]">
                      {/* {formatDate(item?.createdAt)}{" "} */}
                      {timeAgo}
                    </p>
                    <h3 className="text-[#4c8fe1] text-[16px] font-medium leading-normal mb-[10px] hover:underline">
                      {item?.title}
                    </h3>
                  </div>
                </div>
              );
            })}
          </Slider>
          {/* </div> */}
        </div>
        {/* new features */}
        <div className="features mt-10">
          <h3 className="text-[#000] text-[18px] font-medium leading-normal mb-[10px]">
            Feature news
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div
              onClick={() => navigate(`/news-article/${item?._id}`)}
              className={`bg-[#fff] p-2 rounded-xl shadow-[0px_2px_10px_0px_rgba(0,0,0,0.06)] relative h-fit w-full cursor-pointer `}>
              {/* img wrapper */}
              <div className=" w-full h-[150px] rounded-xl overflow-hidden mb-1.5">
                <img
                  className="w-full h-full object-cover"
                  src={firstItem?.banner}
                  alt=""
                />
              </div>
              <p className="text-[#5f5f5f]  leading-6 mt-[15px] mb-[10px]">
                {formatDate(firstItem?.createdAt)}
              </p>
              <h3 className="text-[#4c8fe1] text-[18px] font-medium leading-normal mb-[10px] hover:underline">
                {firstItem?.title}
              </h3>
            </div>
            <div className="flex flex-col gap-4">
              {remainingItems.map((item, index) => {
                const words = item?.description.split(" ");

                const truncatedDescription =
                  words.length > 15
                    ? words.slice(0, 15).join(" ") + "..."
                    : val?.description;
                // Calculate the relative time
                const timeAgo = formatDistanceToNow(new Date(item.updatedAt), {
                  addSuffix: true,
                });
                return (
                  <div
                    className={`bg-[#fff] p-2 rounded-xl shadow-[0px_2px_10px_0px_rgba(0,0,0,0.06)] relative h-fit w-full flex items-center gap-4`}>
                    {/* img wrapper */}
                    <div className=" max-w-[87px] h-full w-full rounded-xl overflow-hidden mb-1.5">
                      <img
                        className="w-full h-full object-cover"
                        src={item?.banner}
                        alt={item?.title}
                      />
                    </div>
                    <div>
                      <a
                        href={`/news-article/${item?._id}`}
                        className="font-[16px] font-sfPro mb-1 text-[#4c8fe1] hover:underline">
                        {item?.title}
                      </a>
                      <p className="text-[12px]">
                        {truncatedDescription}
                        {words.length > 20 && (
                          <span className="text-blue-500 text-[12px] cursor-pointer">
                            Read More
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                );
              })}
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
              className="rounded-[10px] bg-[rgba(255,255,255,0.40)] w-full h-auto"
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
                  onClick={() => handleVideoClick(video)}>
                  <div className="videom_suggested_div relative">
                    <video src={video?.video} className="w-full h-auto"></video>
                    <p className="video-duration text-gray-500 text-[12px] absolute bottom-0 left-0 p-1">
                      {videoDurations[video._id]
                        ? `${Math.floor(
                            videoDurations[video._id] / 60
                          )}:${Math.floor(videoDurations[video._id] % 60)
                            .toString()
                            .padStart(2, "0")}`
                        : "Loading..."}
                    </p>
                  </div>
                  <div className="video-details">
                    <p className="video-title font-semibold text-[16px] hover:text-[#4C8FE1] hover:underline mt-4">
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
              const timeAgo = formatDistanceToNow(new Date(val.updatedAt), {
                addSuffix: true,
              });
              return (
                <div
                  className={`bg-[#fff] p-6 rounded-xl shadow-[0px_2px_10px_0px_rgba(0,0,0,0.06)] relative h-fit w-full`}>
                  <Link to={`/news-article/${val?._id}`}>
                    <div className="news-box-draft">
                      <div className="draft-cont">
                        <h2 className="font-[16px] font-sfPro hover:underline">
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
                          <img src={val?.banner} alt="draft" />
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
