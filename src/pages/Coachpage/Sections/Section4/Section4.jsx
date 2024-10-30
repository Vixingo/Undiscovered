import React from "react";
import "./Section4.css";
import img4 from "../../../../assets/infopage_images/Coach_sec4.png";
import { useNavigate } from "react-router-dom";

const Section4 = () => {
  const navigate = useNavigate();
  return (
    <div className="main_section_div bg-white mx-auto max-w-[95%] rounded-2xl mb-5 pb-5">
      <div className="submain_div_of_sections">
        <div className="sec2_seconddiv">
          <div className="text_of_sec2">
            <h2>Weekly Player Reports</h2>
            <p>
              Stay ahead of the competition with weekly reports highlighting new
              and standout players. These insights keep you informed about
              emerging talent and give you the edge in the recruiting process.
            </p>
            <button className="sec2_btn" onClick={() => navigate("/sign-up")}>
              Sign Up
            </button>
          </div>
          <div className="img_of_sec2">
            <div className="image_box_sec2">
              <img src="./img/Group 2147226747 1.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section4;
