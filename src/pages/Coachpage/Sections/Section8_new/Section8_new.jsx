import React from "react";
import "./Section8_new.css";
import img6 from "../../../../assets/infopage_images/Coach_sec8_new.png";
import { useNavigate } from "react-router-dom";

const Section8_new = () => {
  const navigate = useNavigate();
  return (
    <div className="main_section_div">
      <div className="submain_div_of_sections">
        <div className="sec2_seconddiv">
          <div className="text_of_sec2">
            <h2>Real-Time Recruiting Status</h2>
            <p>
              Check the current recruiting status of players to understand where
              they stand in their college decision-making process. This feature
              helps you prioritize your efforts and focus on the prospects most
              likely to commit.
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

export default Section8_new;
