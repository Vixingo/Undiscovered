import { useEffect, useState } from "react";
import "photoswipe/dist/photoswipe.css";

import { Gallery, Item } from "react-photoswipe-gallery";
import { object } from "prop-types";
const PlayerPhotos = ({ photos }) => {
  console.log("🚀 ~ PlayerPhotos ~ photos:", photos);
  // const [photos, setPhotos] = useState(null);

  // useEffect(() => {
  //   fetch("/photos.json")
  //     .then((res) => res.json())
  //     .then((data) => setPhotos(data));
  // }, []);

  return (
    <div>
      {/* wrapper */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-[40px] lg:gap-7">
        {photos && photos.length > 0 ? (
          photos.map((item, index) => (
            <div className="w-full lg:w-[165px] h-[165px] relative" key={index}>
              {/* image */}
              <Gallery>
                <Item
                  original={item}
                  thumbnail={item}
                  width="940"
                  height="650"
                  // style={{ objectFit: "contain" }}
                  id="main_image_">
                  {({ ref, open }) => (
                    <img
                      className="w-full h-full object- cursor-pointer"
                      src={item}
                      ref={ref}
                      onClick={open}
                      alt={`photo-${index}`}
                    />
                  )}
                </Item>
              </Gallery>
            </div>
          ))
        ) : (
          <p className="col-span-2 lg:col-span-4 text-center text-[#000] text-base leading-6 font-normal">
            No photos
          </p>
        )}
      </div>
    </div>
  );
};

export default PlayerPhotos;
