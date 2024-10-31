import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import "./VideoCard.css";
import CustomVideoPlayer from "../../PlayerProfile/CustomVideoPlayer";
import axios from "axios";
import { BASE_URL } from "../../../baseurl/baseurl";
import { formatDistanceToNow } from "date-fns";
import { enUS } from "date-fns/locale";
import ReactPlayer from "react-player";

const VideoCard = ({ videoInfo }) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState("");

    useEffect(() => {
        setCurrentUser(JSON.parse(localStorage.getItem("user")));
    }, [localStorage?.getItem("user")]);

    const togglePopup = () => {
        setIsPopupOpen(!isPopupOpen);
    };

    const shareOnTwitter = () => {
        const shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
            videoInfo?.video
        )}`;
        window.open(shareUrl, "_blank");
        setIsPopupOpen(false);
    };

    const shareOnFacebook = () => {
        const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
            videoInfo?.video
        )}`;
        window.open(shareUrl, "_blank");
        setIsPopupOpen(false);
    };

    const copyLink = () => {
        navigator.clipboard.writeText(videoInfo?.video);
        toastr.success("Video link copied successfully");
        setIsPopupOpen(false);
    };

    const flagVideo = async () => {
        if (!currentUser) {
            toastr.error("Login to flag videos");
            return;
        }
        let alreadyFlagged = videoInfo?.flaggedBy?.find(
            (u) => u === currentUser?._id
        );

        const headers = {
            headers: {
                authorization: `Bearer ${
                    JSON.parse(localStorage?.getItem("user"))?.token
                }`,
            },
        };

        try {
            let response = await axios.get(
                `${BASE_URL}/flag-video/${videoInfo?._id}`,
                headers
            );
            if (response.status === 200) {
                toastr.success(response.data.message);
            }
        } catch (error) {
            if (error?.response && error?.response?.data) {
                toastr.error(error?.response?.data?.error);
            } else {
                toastr.error("Server error please try again");
            }
        }
        setIsPopupOpen(!isPopupOpen);
    };

    useEffect(() => {});

    return (
        <div className="video-card relative">
            {/* Video area */}

            <div className="w-full rounded-xl overflow-hidden mb-3 relative">
                {videoInfo.type === "link" ? (
                    <div className="w-full h-[195px] lg:h-[185px] rounded-lg overflow-hidden">
                        {videoInfo.video.includes("hudl.com") ? (
                            <div className="aspect-ratio-16-9 rounded-lg overflow-hidden">
                                <iframe
                                    src={videoInfo.video}
                                    frameBorder="0"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        ) : (
                            <ReactPlayer
                                url={videoInfo.video}
                                width="100%"
                                height="100%"
                            />
                        )}
                    </div>
                ) : videoInfo.type === "embed" ? (
                    <div className="relative w-full h-[185px] lg:h-[220px] rounded-lg overflow-hidden">
                        <div
                            className="h-full"
                            dangerouslySetInnerHTML={{
                                __html: videoInfo.video,
                            }}
                        />
                    </div>
                ) : (
                    <CustomVideoPlayer
                        src={videoInfo.video}
                        alt={videoInfo.description}
                    >
                        {/* Only show SVG button for CustomVideoPlayer */}
                        <div className="w-full flex justify-end absolute top-[10px] right-[20px] z-[999]">
                            <svg
                                onClick={togglePopup}
                                className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-dhaba5 cursor-pointer text-white"
                                focusable="false"
                                aria-hidden="true"
                                viewBox="0 0 24 24"
                                data-testid="ReplyIcon"
                                height="25px"
                                width="25px"
                            >
                                <path
                                    fill="#fff"
                                    d="M10 9V5l-7 7 7 7v-4.1c5 0 8.5 1.6 11 5.1-1-5-4-10-11-11"
                                ></path>
                            </svg>
                        </div>
                    </CustomVideoPlayer>
                )}
            </div>
            {/* Popup Logic */}
            {isPopupOpen && (
                <div className="subpopup">
                    <div className="popup-content">
                        <div
                            className="popup-item flex items-center gap-x-2"
                            onClick={flagVideo}
                        >
                            <span>Flag Video</span>
                        </div>
                        <div
                            className="popup-item flex items-center gap-x-2"
                            onClick={shareOnTwitter}
                        >
                            <span>Share on Twitter</span>
                        </div>
                        <div
                            className="popup-item flex items-center gap-x-2"
                            onClick={shareOnFacebook}
                        >
                            <span>Share on Facebook</span>
                        </div>
                        <div
                            className="popup-item flex items-center gap-x-2"
                            onClick={copyLink}
                        >
                            <span>Copy Link</span>
                        </div>
                    </div>
                </div>
            )}
            {/* Title and description */}
            <a href="">
                <h2 className="text-[16px] font-medium text-[#008CFF] hover:underline">
                    {videoInfo?.title}
                </h2>
            </a>
            <p className="text-[13px] text-[#171717] ">
                {videoInfo?.description}
            </p>
            {/* <p className="text-sm text-[#bbb] font-thin">
                {formatDistanceToNow(new Date(videoInfo?.createdAt), {
                    locale: enUS,
                })}
            </p> */}
            <p className="text-[#ED2023] text-[13px]"> Read More...</p>
        </div>
    );
};

VideoCard.propTypes = {
    videoInfo: PropTypes.object,
};

export default VideoCard;
