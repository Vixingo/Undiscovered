import CustomVideoPlayer from "./CustomVideoPlayer";
import { useRef, useState } from "react";
import React from "react";
import "./plyer_reels.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import poster from "../../assets/images/logo.svg";
import ReactPlayer from "react-player";

const PlayerReels = ({ videos, userid, playersProfile }) => {
  console.log("🚀 ~ playersProfile:", playersProfile);

  // console.log("🚀 ~ PlayerReels ~ videos:", videos);
  // const filteredVideos = videos?.filter(
  //   (video) => video?.featuredPlayer === userid
  // );
  const filteredVideos = videos?.find(
    (video) => video?.featuredPlayer === userid
  );

  const viewedData = useRef(filteredVideos);
  const [state, setState] = useState(viewedData?.current);

  // const arrayOfObjects = Object?.entries(filteredVideos);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };
  return (
    <div
      style={
        filteredVideos?.length === 0 || !filteredVideos
          ? {
              textAlign: "center",
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
              alignItems: "center",
            }
          : {}
      }>
      {/* <Modal centered show={show} size="lg" onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <h2 className="modal_title_h2">Embed Video</h2>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal_main_body_">
          <div className="modal_main_div_">
            <h2>Embed</h2>
            <form action="" className="form_embed"></form>
          </div>
        </Modal.Body>
      </Modal> */}
      {/* wrapper && filteredVideos.length > 0  */}
      {/* <div className="embed_video_heading_div">
        <div className="inner_div_of_upload_video">
          <div className="icon_div">
            <span>
              <svg
                width="27"
                height="21"
                viewBox="0 0 27 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M8.47656 7.55811C8.47656 4.79668 10.7151 2.55811 13.4766 2.55811C16.2379 2.55811 18.4766 4.79668 18.4766 7.55811V8.80811H19.7266C22.1428 8.80811 24.1016 10.7669 24.1016 13.1831C24.1016 15.5994 22.1428 17.5581 19.7266 17.5581H18.4766C17.7862 17.5581 17.2266 18.1177 17.2266 18.8081C17.2266 19.4985 17.7862 20.0581 18.4766 20.0581H19.7266C23.5236 20.0581 26.6016 16.9801 26.6016 13.1831C26.6016 9.78223 24.1322 6.95807 20.8886 6.40591C20.3343 2.81077 17.2269 0.0581055 13.4766 0.0581055C9.72624 0.0581055 6.61883 2.81077 6.06451 6.40591C2.82095 6.95807 0.351562 9.78223 0.351562 13.1831C0.351562 16.9801 3.4296 20.0581 7.22656 20.0581H8.47656C9.16691 20.0581 9.72656 19.4985 9.72656 18.8081C9.72656 18.1177 9.16691 17.5581 8.47656 17.5581H7.22656C4.81031 17.5581 2.85156 15.5994 2.85156 13.1831C2.85156 10.7669 4.81031 8.80811 7.22656 8.80811H8.47656V7.55811ZM18.1104 11.6742L14.3604 7.92423C13.8723 7.43607 13.0808 7.43607 12.5927 7.92423L8.84267 11.6742C8.35452 12.1624 8.35452 12.9539 8.84267 13.442C9.33084 13.9301 10.1223 13.9301 10.6105 13.442L12.2266 11.8259V18.8081C12.2266 19.4985 12.7862 20.0581 13.4766 20.0581C14.1669 20.0581 14.7266 19.4985 14.7266 18.8081V11.8259L16.3427 13.442C16.8308 13.9301 17.6223 13.9301 18.1104 13.442C18.5986 12.9539 18.5986 12.1624 18.1104 11.6742Z"
                  fill="white"
                />
              </svg>
            </span>
          </div>
          <div className="text_upload_div">
            <h3>Upload Video</h3>
            <p>from a computer or mobile device</p>
          </div>
        </div>
        <div className="inner_div_of_upload_video" onClick={() => handleShow()}>
          <div className="icon_div">
            <span>
              <svg
                width="31"
                height="31"
                viewBox="0 0 31 31"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_491_104)">
                  <path
                    d="M9.40808 8.67871C9.39108 8.67871 9.37403 8.68387 9.35968 8.69383L0.449912 14.776C0.426299 14.7921 0.412354 14.8186 0.412354 14.8474V16.4834C0.412354 16.5118 0.426299 16.5387 0.449912 16.5543L9.35968 22.637C9.37409 22.6469 9.39108 22.6521 9.40808 22.6521C9.42202 22.6521 9.4355 22.6483 9.44827 22.6422C9.47663 22.6271 9.49409 22.5978 9.49409 22.5657V19.9595C9.49409 19.9316 9.48015 19.9047 9.45653 19.8891L3.26991 15.665L9.45653 11.4422C9.48015 11.4257 9.49409 11.3992 9.49409 11.3704V8.7652C9.49409 8.73309 9.47663 8.70373 9.44827 8.68908C9.4355 8.68205 9.42202 8.67871 9.40808 8.67871Z"
                    fill="white"
                  />
                  <path
                    d="M30.3747 14.776L21.465 8.69383C21.4506 8.68393 21.4336 8.67871 21.4165 8.67871C21.4026 8.67871 21.3892 8.68199 21.3764 8.68908C21.348 8.70373 21.3306 8.73309 21.3306 8.7652V11.3713C21.3306 11.3997 21.3445 11.4262 21.3681 11.4422L27.5548 15.665L21.3681 19.8891C21.3445 19.9047 21.3306 19.9316 21.3306 19.9604V22.5656C21.3306 22.5977 21.348 22.6271 21.3764 22.6421C21.3892 22.6483 21.4026 22.652 21.4165 22.652C21.4336 22.652 21.4506 22.6469 21.465 22.6369L30.3747 16.5542C30.3984 16.5386 30.4124 16.5117 30.4124 16.4833V14.8473C30.4124 14.8186 30.3984 14.7921 30.3747 14.776Z"
                    fill="white"
                  />
                  <path
                    d="M19.4849 7.25244H16.9946C16.9577 7.25244 16.9251 7.27559 16.9133 7.3101L11.258 23.7096C11.2491 23.7356 11.2533 23.7649 11.2694 23.7871C11.2857 23.8097 11.3117 23.8235 11.3396 23.8235H13.8302C13.8668 23.8235 13.8994 23.8003 13.9114 23.7653L19.5665 7.36682C19.5755 7.34033 19.5713 7.31104 19.5552 7.28836C19.5388 7.26615 19.5128 7.25244 19.4849 7.25244Z"
                    fill="white"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_491_104">
                    <rect
                      width="30"
                      height="30"
                      fill="white"
                      transform="translate(0.412354 0.538086)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </span>
          </div>
          <div className="text_upload_div">
            <h3>Embed video</h3>
            <p> from YouTube , Hudl and Vimeo</p>
          </div>
        </div>
      </div> */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 lg:gap-7">
        {[filteredVideos]?.map((item, index) => {
          const newsDate = new Date(item?.createdAt);

          const formattedDate = newsDate.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          });
          // const date = new Date(item.createdAt);
          // return date.toLocaleDateString("en-GB", {
          //   day: "2-digit",
          //   month: "long",
          //   year: "numeric",
          // });

          return (
            <div key={index}>
              {/* top part */}
              <div className="relative w-full h-[195px] lg:h-[185px] rounded-lg shadow_video overflow-hidden">
                <video
                  src={item?.video}
                  controls
                  poster={poster}
                  className="w-full h-full object-cover"></video>
              </div>
              {/* <CustomVideoPlayer src={item?.video} alt={item?.description} /> */}

              {/* bottom part */}
              {/* <div className="flex items-center justify-between"> */}
              {/* date */}
              {/* <div className="flex items-center gap-2 pt-2.5">

                  <div className="w-4 h-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      className="w-full h-full">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M14.9375 8C14.9375 11.8318 11.8318 14.9375 8 14.9375C4.16825 14.9375 1.0625 11.8318 1.0625 8C1.0625 4.16825 4.16825 1.0625 8 1.0625C11.8318 1.0625 14.9375 4.16825 14.9375 8Z"
                        stroke="#130F26"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M10.5736 10.2068L7.74609 8.52002V4.88477"
                        stroke="#130F26"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>

                  <p className="text-[#000] text-sm leading-6">
                    {formattedDate}
                  </p>
                </div> */}

              {/* views */}
              {/* <div className="flex items-center gap-2 pt-2.5">
                  <div className="w-4 h-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="14"
                      viewBox="0 0 16 14"
                      fill="none">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M10.3712 7.04045C10.3712 8.34995 9.30916 9.4112 7.99966 9.4112C6.69016 9.4112 5.62891 8.34995 5.62891 7.04045C5.62891 5.7302 6.69016 4.66895 7.99966 4.66895C9.30916 4.66895 10.3712 5.7302 10.3712 7.04045Z"
                        stroke="#130F26"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M7.9985 12.5165C10.8545 12.5165 13.4668 10.463 14.9375 7.03998C13.4668 3.61698 10.8545 1.56348 7.9985 1.56348H8.0015C5.1455 1.56348 2.53325 3.61698 1.0625 7.03998C2.53325 10.463 5.1455 12.5165 8.0015 12.5165H7.9985Z"
                        stroke="#130F26"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>

                  <p className="text-[#000] text-sm leading-6">
                    {state &&
                      state[index]?.viewedBy?.length !== undefined &&
                      `${state[index]?.viewedBy?.length} views`}
                  </p>
                </div> */}
              {/* </div> */}

              {/* desc */}
              <p className="pt-1.5 text-base  leading-6 font-normal hover:underline text-[#4C8FE1]">
                {item?.description}
              </p>
            </div>
          );
        })}
        <div className="w-full h-[195px] lg:h-[185px] rounded-lg shadow_video overflow-hidden">
          {playersProfile?.video1?.includes("https://www.hudl.com") ? (
            <div className="iframe_video">
              <iframe
                src={playersProfile.video1}
                frameBorder="0"
                allowFullScreen></iframe>
            </div>
          ) : (
            <ReactPlayer
              url={playersProfile.video1}
              width="100%"
              height="100%"
            />
          )}
        </div>

        <div className="w-full h-[195px] lg:h-[185px] rounded-lg shadow_video overflow-hidden">
          {playersProfile?.video2?.includes("hudl.com") ? (
            <div className="iframe_video">
              <iframe
                src={playersProfile.video2}
                frameBorder="0"
                allowFullScreen></iframe>
            </div>
          ) : (
            <ReactPlayer
              url={playersProfile.video2}
              width="100%"
              height="100%"
            />
          )}
        </div>

        <div className="w-full h-[195px] lg:h-[185px] rounded-lg shadow_video overflow-hidden">
          {playersProfile?.video3?.includes("hudl.com") ? (
            <div className="iframe_video">
              <iframe
                src={playersProfile.video3}
                frameBorder="0"
                allowFullScreen></iframe>
            </div>
          ) : (
            <ReactPlayer
              url={playersProfile.video3}
              width="100%"
              height="100%"
            />
          )}
        </div>
        <div className="w-full h-[195px] lg:h-[185px] rounded-lg shadow_video overflow-hidden">
          {playersProfile?.video4?.includes("www.hudl.com") ? (
            <div className="iframe_video">
              <iframe
                src={playersProfile.video4}
                frameBorder="0"
                allowFullScreen></iframe>
            </div>
          ) : (
            <ReactPlayer
              url={playersProfile.video4}
              width="100%"
              height="100%"
            />
          )}
        </div>
        {/* ) : (
          <p
            className="text-center text-[#000] text-base leading-6 font-normal
           md:w-50rem w-5rem">
            No videos
          </p>
        )} */}
      </div>
    </div>
  );
};

export default PlayerReels;
