import React from "react";
import "./Section3.css";
import img3 from "../../../../assets/infopage_images/Player_Sec3.png";
import { useNavigate } from "react-router-dom";

const Section3 = () => {
  const navigate = useNavigate();
  return (
    <div className="main_section_div" style={{ background: "#F9FAFB" }}>
      <div className="submain_div_of_sections">
        <div className="sec2_seconddiv">
          <div className="img_of_sec2">
            <div className="image_box_sec2">
              <img src={img3} alt="" />
            </div>
          </div>
          <div className="text_of_sec2">
            <h2>Take the Reins</h2>
            <p>
              With our intuitive profile management tools, you’re in control of
              your recruitment journey. Customize and update your profile to
              highlight your achievements and engage directly with recruiters.
              Your future is in your hands, and we’re here to support you every
              step of the way.
            </p>
            <button className="sec2_btn" onClick={() => navigate("/sign-up")}>
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section3;
