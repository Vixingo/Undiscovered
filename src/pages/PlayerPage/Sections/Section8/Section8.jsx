import React from "react";
import "./Section8.css";
import img8 from "../../../../assets/infopage_images/Player_Sec8.png";
import { useNavigate } from "react-router-dom";

const Section8 = () => {
  const navigate = useNavigate();
  return (
    <div className="main_section_div">
      <div className="submain_div_of_sections8">
        <div className="sec8_seconddiv">
          <div className="text_of_sec8">
            <h2>Let Your Performance Do the Talking</h2>
            <p>
              Your stats and achievements are crucial to your recruitment
              success. Our platform makes it easy for college recruiters to see
              your potential, with detailed insights that highlight your
              strengths and make you a top contender in the recruitment game.
            </p>
            <button className="sec8_btn" onClick={() => navigate("/sign-up")}>
              Sign Up
            </button>
          </div>
          <div className="img_of_sec8">
            <div className="image_box_sec8">
              <img src={img8} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section8;
