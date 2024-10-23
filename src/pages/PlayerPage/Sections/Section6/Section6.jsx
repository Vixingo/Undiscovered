import React from "react";
import "./Section6.css";
import img6 from "../../../../assets/infopage_images/Player_Sec6.png";
import { useNavigate } from "react-router-dom";

const Section6 = () => {
  const navigate = useNavigate();
  return (
    <div className="main_section_div">
      <div className="submain_div_of_sections">
        <div className="sec2_seconddiv">
          <div className="text_of_sec2">
            <h2>Let Your Performance Do the Talking</h2>
            <p>
              Your stats and achievements are crucial to your recruitment
              success. Our platform makes it easy for college recruiters to see
              your potential, with detailed insights that highlight your
              strengths and make you a top contender in the recruitment game.
            </p>
            <button className="sec2_btn" onClick={() => navigate("/sign-up")}>
              Sign Up
            </button>
          </div>
          <div className="img_of_sec2">
            <div className="image_box_sec2">
              <img src={img6} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section6;
