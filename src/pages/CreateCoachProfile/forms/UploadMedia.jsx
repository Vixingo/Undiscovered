import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { useProfileContext } from "../../../components/context/createProfileContext";
import "./forms.css";

const UploadMediaForm = () => {
  const { state, dispatch } = useProfileContext();
  const { mediaFiles = [], uploadVideos, videoLinks = [] } = state; // Default to an empty array if mediaFiles or videoLinks are undefined
  const [newVideoLink, setNewVideoLink] = useState("");

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
    if (uploadVideos.length + videoLinks.length >= MAX_TOTAL) {
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

  return (
    <div className="uploadMediaForm">
      <h2 style={{ fontSize: "22px" }}>Upload Image</h2>
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <p className="media-guide">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-upload">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M12 3v14M19 8l-7-7-7 7M17 9.5h-4v5h-2v-5H7"></path>
          </svg>
          Upload Media
        </p>
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
      <h2 style={{ fontSize: "22px" }} className="pt-10">
        Upload videos
      </h2>
      <div {...getVideoRootProps({ className: "dropzone" })}>
        <input {...getVideoInputProps()} />
        <p className="media-guide">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-upload">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M12 3v14M19 8l-7-7-7 7M17 9.5h-4v5h-2v-5H7"></path>
          </svg>
          Upload Videos
        </p>
      </div>
      <div className="mediaPreview">
        {uploadVideos.map((media, index) => (
          <div className="mediaContainer" key={index}>
            <p>{media.file.path}</p>
            <div
              className="removeMediaButton"
              onClick={() => handleRemoveVideoFile(index)}>
              &times;
            </div>
          </div>
        ))}
      </div>
      <h2 style={{ fontSize: "22px" }} className="pt-10">
        Add Video Links
      </h2>
      <div className="flex flex-col">
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
      </div>
    </div>
  );
};

export default UploadMediaForm;
