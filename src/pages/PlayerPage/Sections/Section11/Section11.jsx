import React from "react";
import "./Section11.css";
import img11 from "../../../../assets/infopage_images/Player_sec11.png";
import android from "../../../../assets/infopage_images/Android.png";
import ios from "../../../../assets/infopage_images/Ios.png";
const Section11 = () => {
  return (
    <div className="main_sec11_div">
      <div className="sub_main_sec11">
        <div className="div_of_sec11_content">
          <div className="text_div_of_sec11">
            <h1>Download Our App Today</h1>
            <p>Download our app today and become a part of our community</p>
            <div className="store_icon_div">
              <img src={android} alt="" />
              <img src={ios} alt="" />
            </div>
            <div className="input_div_main">
              <div className="input_box">
                <input type="text" placeholder="Enter your email" />
              </div>
              <button className="sec8_btn">Subscribe</button>
            </div>
          </div>
          <div className="image_div_of_sec11">
            <img src={img11} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section11;
