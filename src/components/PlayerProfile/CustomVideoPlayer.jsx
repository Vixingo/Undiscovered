import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../../baseurl/baseurl";
import React from "react";
const CustomVideoPlayer = ({ src, alt }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const handleVideoEnded = () => {
      setIsPlaying(false);
    };

    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.addEventListener("ended", handleVideoEnded);
    }

    return () => {
      if (videoElement) {
        videoElement.removeEventListener("ended", handleVideoEnded);
      }
    };
  }, []);

  const handlePlayPause = async () => {
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      // const prevState = state; // Capture previous state

      //     const indexfound = prevState.findIndex((u) => u._id === videoid);
      //     const videofound = prevState.find((u) => u._id === videoid);

      //     if (videofound) {
      //         const viewedFound = videofound.viewedBy?.find((u) => u === userid);
      //         if (!viewedFound) {
      //         const viewedarray = [...(videofound.viewedBy || []), userid];
      //         const newitem = { ...videofound, viewedBy: viewedarray };
      //         console.log(newitem);

      //         // Create a promise for the API call
      //         const updateViewsPromise = new Promise((resolve, reject) => {
      //             axios.get(`${BASE_URL}/updateViews/${videoid}/${userid}`)
      //             .then(response => {
      //                 resolve(response.data); // Resolve with API response
      //             })
      //             .catch(error => {
      //                 reject(error); // Reject with error if API call fails
      //             });
      //         });

      //         try {
      //             // Await the promise for the API call
      //             await updateViewsPromise;

      //             // Update state after successful API call
      //             const newState = prevState.map((item) =>
      //             item._id === newitem._id ? newitem : item
      //             );

      //             setState(newState);

      //             // Start playing the video
      //             videoRef.current.play();
      //         } catch (error) {
      //             console.error("Error updating views:", error);
      //             // Handle error if needed
      //         }
      //         }
      //     }
      videoRef.current.play();
    }

    setIsPlaying(!isPlaying);
  };

  return (
    <div className="relative w-full h-[195px] lg:h-[185px] rounded-lg overflow-hidden">
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        src={src}
        alt={alt}
        onClick={handlePlayPause}
      />
      <div
        className="absolute inset-0 flex items-center justify-center  cursor-pointer"
        onClick={handlePlayPause}>
        <button className="text-white text-4xl">
          {isPlaying ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10"
              viewBox="0 0 20 20"
              fill="currentColor">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5 4.5A1.5 1.5 0 016.5 3h1A1.5 1.5 0 019 4.5v11A1.5 1.5 0 017.5 17h-1A1.5 1.5 0 015 15.5v-11zM12 4.5A1.5 1.5 0 0113.5 3h1A1.5 1.5 0 0116 4.5v11A1.5 1.5 0 0114.5 17h-1A1.5 1.5 0 0112 15.5v-11z"
              />
            </svg>
          ) : (
            <div
              style={{
                padding: "8px",
                borderRadius: "50%",
                background: "rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(7px)",
              }}>
              <svg
                width="29"
                height="29"
                viewBox="0 0 29 29"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M14.335 1C21.6986 1 27.67 6.97008 27.67 14.335C27.67 21.6999 21.6986 27.67 14.335 27.67C6.97008 27.67 1 21.6999 1 14.335C1 6.97008 6.97008 1 14.335 1Z"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M18.5458 14.3292C18.5458 13.1907 12.71 9.54825 12.048 10.2032C11.386 10.8581 11.3223 17.7387 12.048 18.4553C12.7736 19.1745 18.5458 15.4678 18.5458 14.3292Z"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          )}
        </button>
      </div>
    </div>
  );
};

export default React.memo(CustomVideoPlayer);
