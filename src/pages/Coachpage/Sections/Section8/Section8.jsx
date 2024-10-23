import React from "react";
import "./Section8.css";
import img8 from "../../../../assets/infopage_images/Coach_sec8.png";
import { useNavigate } from "react-router-dom";

const Section8 = () => {
  const navigate = useNavigate();
  return (
    <div className="main_section_div">
      <div className="submain_div_of_sections8">
        <div className="sec8_seconddiv">
          <div className="text_of_sec8">
            <h2>Stay Ahead in Recruiting with Coaches+ Membership</h2>
            <p>
              Undiscovered Hoops is committed to helping you recruit smarter,
              faster, and more effectively. The Coaches+ Membership is your
              all-access pass to the best tools and resources in basketball
              recruiting, giving you a competitive edge in building a
              championship program.
            </p>
            <button className="sec8_btn" onClick={() => navigate("/sign-up")}>
              Sign Up
            </button>
          </div>
          <div className="img_of_sec8_coach">
            <div className="image_box_sec8_coach">
              <img src={img8} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section8;
