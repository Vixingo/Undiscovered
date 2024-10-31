import React from "react";
import "./Section11.css";
import img11 from "../../../../assets/infopage_images/Player_sec11.png";
import android from "../../../../assets/infopage_images/Android.png";
import ios from "../../../../assets/infopage_images/Ios.png";
const Section11 = () => {
  return (

    <div className="mt-36 mb-5">
      <div className="flex bg-[#ED2023] justify-center items-end h-[450px] gap-7">



        <div className="pb-20 flex flex-col gap-8">
          <h1 className="text-[26px] text-white font-normal">Download Our App Today</h1>
          <p className="text-white ">Download our app today and become a part of our community</p>
          <div className="flex gap-7">
            <img src={ios} alt="" className="w-[162px]" />
            <img src={android} alt="" className="w-[162px]" />
          </div>
          <div className="flex gap-10 mt-3">
            <div className="input_box">
              <input type="text" placeholder="Enter your email" />
            </div>
            <button className="px-10 py-3 bg-white text-[#ED2023] rounded-full">Subscribe</button>
          </div>
        </div>



        <div className="">
          <img src="./img/Mask group.png" alt="" />
        </div>
      </div>
    </div>

  );
};

export default Section11;
