import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { useProfileContext } from "../../../components/context/createProfileContext";
import "./forms.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const UploadMediaForm = () => {
  const { state, dispatch, videoFields, setVideoFields } = useProfileContext();
  console.log("🚀 ~ videoFields:", videoFields);
  const { mediaFiles = [], uploadVideos, videoLinks = [] } = state; // Default to an empty array if mediaFiles or videoLinks are undefined

  const [newVideoLink, setNewVideoLink] = useState("");
  console.log("🚀 ~ newVideoLink:", newVideoLink);

  const MAX_TOTAL = 4;

  const onDrop = (acceptedFiles) => {
    const imageFiles = acceptedFiles.filter((file) =>
      file.type.startsWith("image/")
    );

    const newFiles = imageFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    dispatch({ type: "ADD_MEDIA_FILES", payload: newFiles });
  };

  const onDropVideos = (acceptedFiles) => {
    if (
      uploadVideos.length + videoLinks.length + acceptedFiles.length >
      MAX_TOTAL
    ) {
      alert(`You can only upload a total of ${MAX_TOTAL} videos and links.`);
      return;
    }

    const newFiles = acceptedFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    dispatch({ type: "ADD_UPLOAD_VIDEO_FILES", payload: newFiles });
  };

  const handleRemoveFile = (index) => {
    dispatch({ type: "REMOVE_MEDIA_FILE", payload: index });
  };

  const handleRemoveVideoFile = (index) => {
    dispatch({ type: "REMOVE_UPLOAD_VIDEO_FILE", payload: index });
  };

  const handleAddVideoLink = () => {
    if (uploadVideos?.length + videoLinks?.length >= MAX_TOTAL) {
      alert(`You can only add a total of ${MAX_TOTAL} videos and links.`);
      return;
    }

    if (newVideoLink.trim()) {
      dispatch({
        type: "ADD_LINK_VIDEO_FILES",
        payload: [...videoLinks, newVideoLink],
      });
      setNewVideoLink("");
    }
  };

  const handleRemoveVideoLink = (index) => {
    const updatedLinks = videoLinks.filter((_, idx) => idx !== index);
    dispatch({ type: "ADD_LINK_VIDEO_FILES", payload: updatedLinks });
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
    multiple: true,
  });

  const { getRootProps: getVideoRootProps, getInputProps: getVideoInputProps } =
    useDropzone({
      onDrop: onDropVideos,
      accept: "video/*",
      multiple: true,
    });

  useEffect(() => {
    return () => {
      mediaFiles.forEach((mediaFile) => {
        if (mediaFile && mediaFile.preview) {
          URL.revokeObjectURL(mediaFile.preview);
        }
      });
    };
  }, [mediaFiles]);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };

  // const [videoFields, setVideoFields] = useState([
  //   { id: 1, embedLink: "", title: "", description: "", error: "" },
  // ]);

  const handleAddVideoLinks = () => {
    if (videoFields.length < 4) {
      // Allow up to 4 sections
      setVideoFields([
        ...videoFields,
        {
          id: videoFields.length + 1,
          embedLink: "",
          title: "",
          description: "",
          error: "",
        },
      ]);
    }
  };

  const handleRemoveVideoLinks = (id) => {
    setVideoFields(videoFields.filter((video) => video.id !== id));
  };

  const validateUrl = (url) => {
    const youtubeRegex = /(?:youtube\.com|youtu\.be)/;
    const hudlRegex = /hudl\.com/;
    const vimeoRegex = /vimeo\.com/;

    return (
      youtubeRegex.test(url) || hudlRegex.test(url) || vimeoRegex.test(url)
    );
  };

  const handleInputChange = (id, field, value) => {
    const updatedFields = videoFields.map((video) => {
      if (video.id === id) {
        const error =
          field === "embedLink" && !validateUrl(value)
            ? "Invalid URL: Please enter a link from YouTube, Hudl, or Vimeo."
            : "";
        return { ...video, [field]: value, error };
      }
      return video;
    });
    setVideoFields(updatedFields);
  };

  return (
    <div className="uploadMediaForm">
      <div className="embed_video_heading_div">
        <div className="inner_div_of_upload_video" {...getRootProps({})}>
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
            <h3>Upload Image</h3>
            <p>from a computer or mobile device</p>
          </div>
          <input {...getInputProps()} />
        </div>
      </div>

      <div className="mediaPreview">
        {mediaFiles.map((media, index) => {
          const isFileObject = media && media.file && media.preview;
          const url = isFileObject ? media.preview : media;
          const fileExtension = isFileObject
            ? media.file.name.split(".").pop().toLowerCase()
            : url.split(".").pop().toLowerCase();

          if (["jpg", "jpeg", "png", "gif"].includes(fileExtension)) {
            return (
              <div className="mediaContainer" key={index}>
                <img src={url} alt={`media-${index}`} className="mediaFile" />
                <div
                  className="removeMediaButton"
                  onClick={() => handleRemoveFile(index)}>
                  &times;
                </div>
              </div>
            );
          } else {
            return null;
          }
        })}
      </div>

      <div className="embed_video_heading_div">
        <div className="inner_div_of_upload_video" {...getVideoRootProps({})}>
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
          <input {...getVideoInputProps()} />
        </div>
      </div>

      <div className="mediaPreview">
        {uploadVideos.map((media, index) => {
          console.log("🚀 ~ {uploadVideos.map ~ media:", media);
          return (
            <div className="mediaContainer" key={index}>
              <video src={media.preview} controls></video>

              <div
                className="removeMediaButton"
                onClick={() => handleRemoveVideoFile(index)}>
                &times;
              </div>
            </div>
          );
        })}
      </div>

      <div className="embed_video_heading_div">
        <div className="inner_div_of_upload_video">
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
      </div>

      <br />
      <br />
      <div className="main_link_upload_div">
        {videoFields.map((video, index) => (
          <div className="sub_main_div_link_uploading" key={video.id}>
            <div className="main_heading_div">
              <h3 className="heding_h3">Embed video {video.id}</h3>
              {index === 0 ? ( // First section is not removable
                <button
                  type="button"
                  className="button p-2"
                  onClick={handleAddVideoLinks}
                  disabled={videoFields.length >= 4}>
                  Add
                </button>
              ) : (
                <div>
                  <button
                    type="button"
                    className="button p-2"
                    onClick={handleRemoveVideoLinks.bind(null, video.id)}>
                    Remove
                  </button>
                  <button
                    type="button"
                    className="button p-2"
                    onClick={handleAddVideoLinks}
                    disabled={videoFields.length >= 4}>
                    Add
                  </button>
                </div>
              )}
            </div>
            <div className="heading_text_div">
              <h3>Embed from YouTube, Hudl or Vimeo</h3>
              <p>
                Please note, you cannot use embedded video to make highlight
                reels
              </p>
              <div className="input_embed_div">
                <input
                  type="text"
                  name="embedLink"
                  value={video.embedLink}
                  onChange={(e) =>
                    handleInputChange(video.id, "embedLink", e.target.value)
                  }
                />
              </div>
              {video.error && <p className="error_video">{video.error}</p>}
            </div>
            <div className="title_add_main_div">
              <label htmlFor="">Title</label>
              <div className="title_input_div">
                <input
                  type="text"
                  name="title"
                  value={video.title}
                  onChange={(e) =>
                    handleInputChange(video.id, "title", e.target.value)
                  }
                />
              </div>
            </div>
            <div className="description_main_div">
              <label htmlFor="">Description</label>
              <div className="description_main_textariea_div">
                <textarea
                  name="description"
                  value={video.description}
                  onChange={(e) =>
                    handleInputChange(video.id, "description", e.target.value)
                  }></textarea>
              </div>
            </div>
          </div>
        ))}
      </div>
      <br />
      <br />

      {/* <div className="flex flex-col">
        {videoLinks.map((link, index) => (
          <div className="flex items-center mb-2" key={index}>
            <input
              type="text"
              value={link}
              style={{ fontSize: 18 }}
              className="input-link"
              readOnly
            />
            <div
              className="font-md cursor-pointer"
              style={{ fontSize: 24 }}
              onClick={() => handleRemoveVideoLink(index)}>
              &times;
            </div>
          </div>
        ))}
        <div className="flex items-center mb-2">
          <div className="formFields">
            <input
              type="text"
              value={newVideoLink}
              onChange={(e) => setNewVideoLink(e.target.value)}
              className="input-link"
              placeholder="Enter video URL"
            />
          </div>

          <button
            type="button"
            className="button p-2 "
            onClick={handleAddVideoLink}>
            Add
          </button>
        </div>
      </div> */}
    </div>
  );
};

export default UploadMediaForm;
